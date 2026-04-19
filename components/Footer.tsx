import styled from 'styled-components'

const FooterWrapper = styled.footer`
  border-top: 1px solid #e5e7eb;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 4rem;
`

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <FooterWrapper>
      <p>© {year} Meu Blog. Todos os direitos reservados.</p>
    </FooterWrapper>
  )
}
