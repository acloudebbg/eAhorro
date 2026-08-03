import type { Config } from '@netlify/functions';
import Anthropic from '@anthropic-ai/sdk';
import { getSystemPrompt } from './_shared/systemPrompt';
import { parseValidationResponse } from './_shared/parseValidationResponse';
import type { DocumentType } from '../../src/components/V2/types';

const ALLOWED_MEDIA_TYPES = ['image/jpeg', 'image/png', 'application/pdf'] as const;
type AllowedMediaType = (typeof ALLOWED_MEDIA_TYPES)[number];

const CLAUDE_MODEL = 'claude-haiku-4-5';

interface RequestBody {
  documentType: DocumentType;
  mediaType: AllowedMediaType;
  base64Data: string;
}

const jsonResponse = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return jsonResponse(405, { error: 'Método no permitido' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('❌ Falta ANTHROPIC_API_KEY en las variables de entorno del servidor');
    return jsonResponse(500, { error: 'El servicio de validación no está configurado' });
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(400, { error: 'Cuerpo de la petición inválido' });
  }

  const { documentType, mediaType, base64Data } = body || ({} as RequestBody);

  if (!documentType || !mediaType || !base64Data) {
    return jsonResponse(400, { error: 'Faltan campos requeridos: documentType, mediaType, base64Data' });
  }

  if (!ALLOWED_MEDIA_TYPES.includes(mediaType)) {
    return jsonResponse(400, { error: `Tipo de archivo no soportado: ${mediaType}` });
  }

  try {
    const client = new Anthropic({ apiKey });

    const contentBlock =
      mediaType === 'application/pdf'
        ? {
            type: 'document' as const,
            source: { type: 'base64' as const, media_type: mediaType, data: base64Data },
          }
        : {
            type: 'image' as const,
            source: { type: 'base64' as const, media_type: mediaType, data: base64Data },
          };

    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 200,
      temperature: 0,
      system: getSystemPrompt(documentType),
      messages: [
        {
          role: 'user',
          content: [
            contentBlock,
            { type: 'text', text: 'Valida este documento según las instrucciones del sistema.' },
          ],
        },
      ],
    });

    if (response.stop_reason === 'refusal') {
      console.error('❌ Claude rechazó procesar el documento (stop_reason: refusal)');
      return jsonResponse(502, { error: 'No se pudo validar el documento' });
    }

    const textBlock = response.content.find((block) => block.type === 'text');
    const rawText = textBlock && 'text' in textBlock ? textBlock.text : '';

    const parsed = parseValidationResponse(rawText);
    return jsonResponse(200, parsed);
  } catch (error) {
    console.error('❌ Error al validar documento con Claude:', error);

    if (error instanceof Anthropic.RateLimitError) {
      return jsonResponse(429, { error: 'Servicio de validación saturado, inténtalo de nuevo en unos segundos' });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      return jsonResponse(500, { error: 'El servicio de validación no está configurado correctamente' });
    }

    return jsonResponse(502, { error: 'Error en la validación automatizada' });
  }
};

export const config: Config = {
  path: '/api/validate-document',
};
