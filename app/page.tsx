import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import styled from "styled-components";
import PostCard from "@/components/PostCard";

const Container = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 0 1.5rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #eff0f1;
  //color: #111827;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 2.5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

export default function HomePage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <Container>
      <PageTitle>DevFanio</PageTitle>
      <Subtitle>
        Artigos sobre tecnologia e desenvolvimento de software.
      </Subtitle>
      <Grid>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </Grid>
    </Container>
  );
}
