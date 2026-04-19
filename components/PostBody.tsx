import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import styled from "styled-components";
import type { Post } from "contentlayer/generated";

const Wrapper = styled.article`
  max-width: 720px;
  margin: 3rem auto;
  padding: 0 1.5rem;
`;

const Header = styled.header`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  //color: #111827;
  color: #eff0f1;
  line-height: 1.3;
  margin-bottom: 0.5rem;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

const TagList = styled.ul`
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
  color: #8a949e;
`;

const Tag = styled.li`
  color: #8a949e;
  background: #374151;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
`;

const Body = styled.div`
  line-height: 1.8;
  color: #f3f4f6;
  font-size: 1.05rem;

  h2 {
    font-size: 1.5rem;
    margin-top: 2rem;
    color: #eff0f1;
  }
  h3 {
    font-size: 1.25rem;
    margin-top: 1.5rem;
    color: #f9fafb;
  }
  p {
    margin: 1rem 0;
    color: #8a949e;
  }
  a {
    color: #2563eb;
  }
  li {
    color: #8a949e;
  }
  code {
    background: #f3f4f6;
    color: #2563eb;
    padding: 0.1rem 0.35rem;
    border-radius: 0.25rem;
    font-size: 0.9em;
  }
  pre {
    background: #1f2937;
    color: #f9fafb;
    padding: 1.25rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    code {
      background: none;
      color: inherit;
    }
  }
  blockquote {
    border-left: 4px solid #e5e7eb;
    padding-left: 1rem;
    color: #f9fafb;
    margin: 1rem 0;
  }
`;

export default function PostBody({ post }: { post: Post }) {
  const formattedDate = format(new Date(post.date), "d 'de' MMMM, yyyy", {
    locale: ptBR,
  });

  return (
    <Wrapper>
      <Header>
        <Title>{post.title}</Title>
        <Meta>
          <time dateTime={post.date}>{formattedDate}</time>
          {post.tags && post.tags.length > 0 && (
            <TagList>
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagList>
          )}
        </Meta>
      </Header>
      <Body dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </Wrapper>
  );
}
