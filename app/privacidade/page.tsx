import type { Metadata } from "next";
import styled from "styled-components";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade do DevFanio. Saiba como coletamos, usamos e protegemos suas informações ao navegar pelo blog.",
};

const Container = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 0 1.5rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #eff0f1;
  margin-bottom: 0.5rem;
`;

const Updated = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 2.5rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.2rem;
    color: #d1d5db;
    margin-bottom: 0.75rem;
  }

  p {
    color: #9ca3af;
    line-height: 1.75;
    margin-bottom: 0.75rem;
  }

  ul {
    color: #9ca3af;
    line-height: 1.75;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.4rem;
    }
  }
`;

export default function PrivacidadePage() {
  return (
    <Container>
      <PageTitle>Política de Privacidade</PageTitle>
      <Updated>Última atualização: maio de 2026</Updated>

      <Section>
        <h2>1. Informações que coletamos</h2>
        <p>
          O DevFanio é um blog estático de leitura pública. Não coletamos dados
          pessoais diretamente. Podemos utilizar ferramentas de análise de
          tráfego anônimas (como Google Analytics) para entender o volume e
          origem das visitas.
        </p>
      </Section>

      <Section>
        <h2>2. Uso de cookies</h2>
        <p>
          Este site pode utilizar cookies técnicos essenciais para seu
          funcionamento e cookies de análise anônima. Você pode desativá-los nas
          configurações do seu navegador sem prejuízo à navegação.
        </p>
      </Section>

      <Section>
        <h2>3. Links externos</h2>
        <p>
          Nossos artigos podem conter links para sites de terceiros. Não somos
          responsáveis pelas práticas de privacidade desses sites e recomendamos
          a leitura das respectivas políticas.
        </p>
      </Section>

      <Section>
        <h2>4. Seus direitos (LGPD)</h2>
        <p>
          Em conformidade com a Lei Geral de Proteção de Dados (Lei nº
          13.709/2018), você tem direito a:
        </p>
        <ul>
          <li>Saber quais dados pessoais eventualmente armazenamos</li>
          <li>
            Solicitar a exclusão de qualquer dado fornecido voluntariamente
          </li>
          <li>Revogar consentimentos dados anteriormente</li>
        </ul>
        <p>
          Para exercer esses direitos, entre em contato via{" "}
          <a
            href="mailto:filipeecommerce4@gmail.com"
            style={{ color: "#60a5fa" }}
          >
            filipeecommerce4@gmail.com
          </a>
          .
        </p>
      </Section>

      <Section>
        <h2>5. Alterações nesta política</h2>
        <p>
          Podemos atualizar esta política periodicamente. A data de última
          atualização sempre estará indicada no topo desta página.
        </p>
      </Section>
    </Container>
  );
}
