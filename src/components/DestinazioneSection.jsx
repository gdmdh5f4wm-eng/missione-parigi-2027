import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

export default function DestinazioneSection() {
  const cardVideoRef = useRef(null)

  useEffect(() => {
    if (cardVideoRef.current) {
      cardVideoRef.current.defaultMuted = true
      cardVideoRef.current.muted = true
      cardVideoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <Container>
      <h3>Destinazione</h3>
      <Grid>
        <Card to="/destinazione">
          <video
            ref={cardVideoRef}
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
          <CardOverlay>
            <CardBadge>FASE 1</CardBadge>
            <CardTitle>DESTINAZIONE</CardTitle>
            <CardAction>Accedi ➔</CardAction>
          </CardOverlay>
        </Card>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  padding: 10px 0 26px;

  h3 {
    font-size: 20px;
    letter-spacing: 1.5px;
    color: #f9f9f9;
    margin-bottom: 16px;
    text-transform: uppercase;
  }
`

const Grid = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

const Card = styled(Link)`
  position: relative;
  padding-top: 56.25%;
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  background: #090b13;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    transition: transform 300ms ease;
  }

  &:hover {
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;

    video {
      transform: scale(1.04);
    }
  }
`

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.15) 0%,
    rgba(9, 11, 19, 0.25) 50%,
    rgba(9, 11, 19, 0.85) 100%
  );
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  pointer-events: none;
`

const CardBadge = styled.span`
  align-self: flex-start;
  background: rgba(0, 99, 229, 0.6);
  color: #93c5fd;
  border: 1px solid rgba(147, 197, 253, 0.4);
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  margin-bottom: 6px;
  text-transform: uppercase;
`

const CardTitle = styled.h4`
  color: #f9f9f9;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1.5px;
  margin: 0 0 4px 0;
  text-transform: uppercase;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
`

const CardAction = styled.span`
  color: #60a5fa;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
`
