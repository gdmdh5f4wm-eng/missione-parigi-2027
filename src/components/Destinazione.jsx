import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

export default function Destinazione() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <Container>
      <VideoBackground>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/destinazione-poster.jpg"
        >
          <source src="/video/video-destinazione.MP4" type="video/mp4" />
          <source src="/videos/video-destinazione.mp4" type="video/mp4" />
        </video>
        <Overlay />
      </VideoBackground>

      <ContentWrapper>
        <TopBar>
          <BackLink to="/home">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Torna alla Home</span>
          </BackLink>
        </TopBar>

        <MainCard>
          <Badge>SEZIONE 01 • MISSIONE</Badge>
          <Title>DESTINAZIONE</Title>
          <Subtitle>
            Area riservata sbloccata. Sfondo video attivo a piena area.
          </Subtitle>
        </MainCard>
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 72px);
  min-height: calc(100dvh - 72px);
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  top: 72px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

const VideoBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(14, 18, 30, 0.35) 0%,
    rgba(14, 18, 30, 0.15) 45%,
    rgba(14, 18, 30, 0.75) 100%
  );
  z-index: 1;
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  padding: 28px calc(3.5vw + 5px) 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 140px);
  min-height: calc(100dvh - 140px);
  box-sizing: border-box;
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(14, 18, 30, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 10px 18px;
  color: #f9f9f9;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  backdrop-filter: blur(8px);
  transition: all 250ms ease;

  &:hover {
    background: #0063e5;
    border-color: #0483ee;
    transform: translateX(-2px);
    box-shadow: 0 0 15px rgba(0, 99, 229, 0.5);
  }
`

const MainCard = styled.div`
  max-width: 650px;
  margin-top: auto;
  padding-bottom: 20px;
`

const Badge = styled.div`
  display: inline-block;
  background: rgba(0, 99, 229, 0.4);
  color: #60a5fa;
  border: 1px solid rgba(96, 165, 250, 0.4);
  border-radius: 14px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 12px;
  text-transform: uppercase;
`

const Title = styled.h1`
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 800;
  letter-spacing: 3px;
  color: #f9f9f9;
  margin: 0 0 12px 0;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
`

const Subtitle = styled.p`
  font-size: clamp(14px, 2vw, 18px);
  line-height: 1.5;
  color: rgba(249, 249, 249, 0.85);
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  max-width: 520px;
`
