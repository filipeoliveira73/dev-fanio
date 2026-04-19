"use client";

import Image from "next/image";
import styled from "styled-components";

const BannerWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 280px;
  background-image: url("/images/background.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 180px;
    background-position: center center;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const LogoWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
  }
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Title = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.span`
  font-size: 1rem;
  color: #e5e7eb;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export default function BannerHome() {
  return (
    <BannerWrapper>
      <Content>
        <LogoWrapper>
          <Image
            src="/images/logo-transparente.jpg"
            alt="Logo DevFanio"
            fill
            style={{ objectFit: "cover", borderRadius: "50%" }}
            priority
          />
        </LogoWrapper>
        <TextGroup>
          <Title>DevFanio</Title>
          <Subtitle>Seu blog de tecnologia</Subtitle>
        </TextGroup>
      </Content>
    </BannerWrapper>
  );
}
