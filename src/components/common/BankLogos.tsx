import React from 'react'
import styled from 'styled-components'

interface BankLogosProps {
  banks?: string[]
  showAll?: boolean
}

const BankLogosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-lg);
  align-items: center;
  justify-items: center;
  margin-top: var(--spacing-xl);
`

const BankLogo = styled.img`
  height: 40px;
  width: auto;
  opacity: 0.7;
  transition: all var(--transition-fast);
  filter: grayscale(100%);
  
  &:hover {
    opacity: 1;
    filter: grayscale(0%);
    transform: scale(1.1);
  }
`

// Lista completa de bancos con sus URLs de logos
const allBanks = [
  { name: 'sabadell', url: 'https://iahorro.imgix.net/_nuxt/sabadell.Bm5A6Tfk.svg' },
  { name: 'bankinter', url: 'https://iahorro.imgix.net/_nuxt/bankinter.CuFAzY1p.svg' },
  { name: 'santander', url: 'https://iahorro.imgix.net/_nuxt/santander.VHA_bKUi.svg' },
  { name: 'bbva', url: 'https://iahorro.imgix.net/_nuxt/bbva.D__tSS5R.svg' },
  { name: 'caixabank', url: 'https://iahorro.imgix.net/_nuxt/caixaBank.Byp88M9I.svg' },
  { name: 'openbank', url: 'https://iahorro.imgix.net/_nuxt/openbank.C3XovD-m.svg' },
  { name: 'unicaja', url: 'https://iahorro.imgix.net/_nuxt/unicaja.BI4PDrdO.svg' },
  { name: 'evo', url: 'https://iahorro.imgix.net/_nuxt/evo.FXi37pGr.svg' },
  { name: 'tomamos-impulso', url: 'https://iahorro.imgix.net/_nuxt/tomamos-impulso.GlK_VraZ.svg' },
  { name: 'abanca', url: 'https://iahorro.imgix.net/_nuxt/abanca.Dw9c03yb.svg' },
  { name: 'cajasur', url: 'https://iahorro.imgix.net/_nuxt/cajasur.KCdfzseC.svg' },
  { name: 'caja-rural', url: 'https://iahorro.imgix.net/_nuxt/caja-rural.BYeH3OEp.svg' },
  { name: 'kutxabank', url: 'https://iahorro.imgix.net/_nuxt/kutxabank.C7qVinT5.svg' },
  { name: 'deutsche', url: 'https://iahorro.imgix.net/_nuxt/deutsche.dSYKRrDP.svg' },
  { name: 'arquiabanca', url: 'https://iahorro.imgix.net/_nuxt/arquiabanca.Cj7ElNo8.svg' },
  { name: 'myinvestor', url: 'https://iahorro.imgix.net/_nuxt/myinvestor.DtCEkKVu.svg' },
  { name: 'ibercaja', url: 'https://iahorro.imgix.net/_nuxt/ibercaja.mweGO203.svg' },
  { name: 'caja-rural-de-navarra', url: 'https://iahorro.imgix.net/_nuxt/caja-rural-de-navarra.B_nuxxu4.svg' },
  { name: 'caixa-popular', url: 'https://iahorro.imgix.net/_nuxt/caixa-popular.DosxhSsA.svg' },
  { name: 'caja-rural-de-granada', url: 'https://iahorro.imgix.net/_nuxt/caja-rural-de-granada.Dw9n5XS6.svg' },
  { name: 'globalcaja', url: 'https://iahorro.imgix.net/_nuxt/globalcaja.Bd0bOLhQ.svg' },
  { name: 'caja-rural-del-sur', url: 'https://iahorro.imgix.net/_nuxt/caja-rural-del-sur.CX0Mc1e9.svg' },
  { name: 'cajasiete', url: 'https://iahorro.imgix.net/_nuxt/cajasiete.DFAJFrOb.svg' },
]

const defaultBanks = [
  'sabadell', 'bankinter', 'santander', 'bbva', 'caixabank', 'openbank',
  'unicaja', 'evo', 'abanca', 'cajasur', 'kutxabank', 'ibercaja',
  'caja-rural', 'myinvestor', 'deutsche', 'arquiabanca'
]

const BankLogos: React.FC<BankLogosProps> = ({ banks = defaultBanks, showAll = false }) => {
  const banksToShow = showAll ? allBanks : allBanks.filter(bank => banks.includes(bank.name))

  return (
    <BankLogosContainer>
      {banksToShow.map((bank, index) => (
        <BankLogo 
          key={index}
          src={bank.url}
          alt={bank.name}
          title={bank.name}
        />
      ))}
    </BankLogosContainer>
  )
}

export default BankLogos
