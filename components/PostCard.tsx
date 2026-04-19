import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import styled from "styled-components";
import type { Post } from "contentlayer/generated";

const Card = styled.article`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Date_ = styled.time`
  font-size: 0.8rem;
  color: #6b7280;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin: 0.5rem 0;
  //color: #111827;
  color: #eff0f1;

  a {
    text-decoration: none;
    //color: inherit;
    color: #eff0f1;

    &:hover {
      color: #2563eb;
    }
  }
`;

const Description = styled.p`
  //color: #374151;
  color: #eff0f1;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
`;

const TagList = styled.ul`
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
  flex-wrap: wrap;
`;

const Tag = styled.li`
  background: #f3f4f6;
  color: #374151;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
`;

export default function PostCard({ post }: { post: Post }) {
  const formattedDate = format(new Date(post.date), "d 'de' MMMM, yyyy", {
    locale: ptBR,
  });

  return (
    <Card>
      <Date_ dateTime={post.date}>{formattedDate}</Date_>
      <Title>
        <Link href={post.url}>{post.title}</Link>
      </Title>
      <Description>{post.description}</Description>
      {post.tags && post.tags.length > 0 && (
        <TagList>
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagList>
      )}
    </Card>
  );
}
