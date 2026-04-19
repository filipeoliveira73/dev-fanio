import Link from "next/link";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  object-fit: cover;
`;

const Logo = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;

  a {
    color: #374151;
    text-decoration: none;
    font-size: 0.95rem;

    &:hover {
      color: #111827;
    }
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Link href="/" id="header">
        <LogoWrapper>
          <LogoImage src="/images/logo-preview.png" alt="DevFanio logo" />
          <Logo>DevFanio</Logo>
        </LogoWrapper>
      </Link>
      <Nav>
        <Link href="/">Posts</Link>
      </Nav>
    </HeaderWrapper>
  );
}
