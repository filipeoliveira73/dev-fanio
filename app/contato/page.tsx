import type { Metadata } from "next";
import styled from "styled-components";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com o DevFanio. Sugestões de pauta, parcerias ou dúvidas — adoramos ouvir de leitores e desenvolvedores.",
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

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #9ca3af;
  font-size: 1rem;

  a {
    color: #60a5fa;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  strong {
    color: #d1d5db;
    min-width: 90px;
  }
`;

const Note = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 2.5rem;
  line-height: 1.6;
  border-top: 1px solid #1f2937;
  padding-top: 1.5rem;
`;

export default function ContatoPage() {
  return (
    <Container>
      <PageTitle>Contato</PageTitle>
      <Lead>
        Tem uma sugestão de pauta, encontrou um erro em algum artigo ou quer
        propor uma parceria? Fique à vontade para entrar em contato conosco.
      </Lead>

      <ContactList>
        <ContactItem>
          <strong>E-mail</strong>
          <a href="mailto:filipeecommerce4@gmail.com">
            filipeecommerce4@gmail.com
          </a>
        </ContactItem>
        <ContactItem>
          <strong>LinkedIn</strong>
          <a
            href="https://www.linkedin.com/in/filipe-oliveira-4b047811a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/devfanio
          </a>
        </ContactItem>
      </ContactList>

      <Note>
        Respondemos em até 3 dias úteis. Para assuntos urgentes, prefira o
        e-mail diretamente.
      </Note>
    </Container>
  );
}
