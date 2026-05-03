import type { Metadata } from "next";
import styled from "styled-components";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça o DevFanio — um blog sobre desenvolvimento de software, carreira em tecnologia e as tendências que moldam a indústria.",
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

const Lead = styled.p`
  color: #9ca3af;
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  line-height: 1.7;
`;

const Section = styled.section`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.25rem;
    color: #d1d5db;
    margin-bottom: 0.75rem;
  }

  p {
    color: #9ca3af;
    line-height: 1.75;
  }
`;

export default function SobrePage() {
  return (
    <Container>
      <PageTitle>Sobre o DevFanio</PageTitle>
      <Lead>
        Um espaço dedicado a engenheiros e entusiastas de tecnologia que querem
        se manter atualizados sobre desenvolvimento de software, ferramentas
        modernas e tendências da indústria.
      </Lead>

      <Section>
        <h2>O que você vai encontrar aqui</h2>
        <p>
          Artigos práticos e diretos sobre front-end, back-end, mobile, carreira
          e o impacto da inteligência artificial no dia a dia do desenvolvedor.
          Sem enrolação — apenas conteúdo relevante para quem escreve código.
        </p>
      </Section>

      <Section>
        <h2>Para quem é este blog</h2>
        <p>
          Para desenvolvedores que buscam aprofundamento técnico, profissionais
          em transição de carreira e curiosos que querem entender as decisões por
          trás das tecnologias que usam.
        </p>
      </Section>

      <Section>
        <h2>Sobre o autor</h2>
        <p>
          Desenvolvedor full-stack apaixonado por boas práticas, performance e
          pela evolução constante do ecossistema JavaScript. Quando não está
          codando, está escrevendo sobre isso.
        </p>
      </Section>
    </Container>
  );
}
