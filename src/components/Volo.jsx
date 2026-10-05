import React, { useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { Link } from "react-router-dom"

export default function Volo() {
  useEffect(() => {
    // Scroll observation for soft entrance animations
    const elements = document.querySelectorAll("[data-animate]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <PageContainer>
      {/* Background Image with Cinematic Overlay */}
      <BackgroundContainer>
        <img
          src="/image/aereo-linea.jpg"
          alt="Aereo in volo"
          onError={(e) => {
            if (e.target.src.indexOf(".jpg.jpg") === -1) {
              e.target.src = "/image/aereo-linea.jpg.jpg"
            }
          }}
        />
        <BackgroundOverlay />
      </BackgroundContainer>

      {/* Floating Back Navigation */}
      <NavWrapper>
        <BackBtn to="/home">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Home</span>
        </BackBtn>
      </NavWrapper>

      {/* 1. APERTURA CINEMATOGRAFICA (Hero) */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>VOLO</HeroTitle>
          <HeroDate>01 LUGLIO 2027</HeroDate>
        </HeroContent>

        <ScrollHint>
          <span>SCORRI PER I DETTAGLI</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </ScrollHint>
      </HeroSection>

      {/* 2. CONTENUTO SOTTO LA FOTO: ANDATA */}
      <FlightBlock data-animate>
        <SectionBadge>PIANO DI VOLO</SectionBadge>
        <SectionHeading>ANDATA</SectionHeading>
        <SectionDate>01 LUGLIO 2027</SectionDate>

        <TimelineContainer>
          {/* Volo 1 */}
          <FlightCard data-animate>
            <FlightTopRow>
              <FlightCode>AZ1278</FlightCode>
              <FlightIcon>✈</FlightIcon>
            </FlightTopRow>
            <RouteTitle>NAPOLI → MILANO LINATE</RouteTitle>
            <TimeRow>
              <TimeValue>06:20</TimeValue>
              <TimeArrow>→</TimeArrow>
              <TimeValue>07:40</TimeValue>
            </TimeRow>
          </FlightCard>

          {/* Scalo Connection */}
          <LayoverBadge data-animate>
            <LayoverDot />
            <span>Scalo a Milano Linate</span>
          </LayoverBadge>

          {/* Volo 2 */}
          <FlightCard data-animate>
            <FlightTopRow>
              <FlightCode>AZ350</FlightCode>
              <FlightIcon>✈</FlightIcon>
            </FlightTopRow>
            <RouteTitle>MILANO LINATE → PARIGI ORLY</RouteTitle>
            <TimeRow>
              <TimeValue>08:30</TimeValue>
              <TimeArrow>→</TimeArrow>
              <TimeValue>09:55</TimeValue>
            </TimeRow>
          </FlightCard>
        </TimelineContainer>

        <NarrativeQuote data-animate>
          Da Napoli a Parigi, con uno scalo a Milano.
        </NarrativeQuote>
      </FlightBlock>

      {/* 3. RITORNO */}
      <FlightBlock data-animate>
        <SectionBadge>PIANO DI VOLO</SectionBadge>
        <SectionHeading>RITORNO</SectionHeading>
        <SectionDate>05 LUGLIO 2027</SectionDate>

        <TimelineContainer>
          {/* Volo 1 Ritorno */}
          <FlightCard data-animate>
            <FlightTopRow>
              <FlightCode>AZ325</FlightCode>
              <FlightIcon>✈</FlightIcon>
            </FlightTopRow>
            <RouteTitle>PARIGI CHARLES DE GAULLE → ROMA FIUMICINO</RouteTitle>
            <TimeRow>
              <TimeValue>18:15</TimeValue>
              <TimeArrow>→</TimeArrow>
              <TimeValue>20:25</TimeValue>
            </TimeRow>
          </FlightCard>

          {/* Scalo Connection */}
          <LayoverBadge data-animate>
            <LayoverDot />
            <span>Scalo a Roma Fiumicino</span>
          </LayoverBadge>

          {/* Volo 2 Ritorno */}
          <FlightCard data-animate>
            <FlightTopRow>
              <FlightCode>AZ1267</FlightCode>
              <FlightIcon>✈</FlightIcon>
            </FlightTopRow>
            <RouteTitle>ROMA FIUMICINO → NAPOLI</RouteTitle>
            <TimeRow>
              <TimeValue>21:45</TimeValue>
              <TimeArrow>→</TimeArrow>
              <TimeValue>22:40</TimeValue>
            </TimeRow>
          </FlightCard>
        </TimelineContainer>

        <NarrativeQuote data-animate>
          E poi si torna a casa.
        </NarrativeQuote>
      </FlightBlock>

      {/* 4. CHIUSURA */}
      <ClosingSection data-animate>
        <ClosingTitle>PARIGI, STIAMO ARRIVANDO. ✈️</ClosingTitle>

        <NextStageButton to="/home">
          <span>PROSSIMA TAPPA</span>
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
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </NextStageButton>

        <NextStageHint>Fase 3 • Alloggio (In preparazione)</NextStageHint>
      </ClosingSection>
    </PageContainer>
  )
}

// Keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 0.6;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(5px);
  }
`

// Layout Styles
const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  color: #f9f9f9;
  background-color: #040714;

  [data-animate] {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1),
      transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
`

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(4, 7, 20, 0.45) 0%,
    rgba(4, 7, 20, 0.32) 35%,
    rgba(4, 7, 20, 0.68) 70%,
    rgba(4, 7, 20, 0.92) 100%
  );
  backdrop-filter: blur(1px);
`

const NavWrapper = styled.div`
  position: fixed;
  top: calc(18px + env(safe-area-inset-top, 0px));
  left: calc(20px + env(safe-area-inset-left, 0px));
  z-index: 50;
`

const BackBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(14, 18, 30, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 30px;
  padding: 8px 16px;
  color: #f9f9f9;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  transition: all 250ms ease;

  &:hover {
    background: #0063e5;
    border-color: #0483ee;
    transform: translateX(-2px);
    box-shadow: 0 0 16px rgba(0, 99, 229, 0.5);
  }
`

// 1. APERTURA CINEMATOGRAFICA
const HeroSection = styled.section`
  position: relative;
  z-index: 2;
  height: 100vh;
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  box-sizing: border-box;
`

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1000ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
`

const HeroTitle = styled.h1`
  font-size: clamp(48px, 12vw, 110px);
  font-weight: 800;
  letter-spacing: clamp(6px, 2.5vw, 18px);
  color: #ffffff;
  margin: 0;
  text-transform: uppercase;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.8);
  line-height: 1.1;
`

const HeroDate = styled.div`
  font-size: clamp(13px, 3vw, 18px);
  font-weight: 600;
  letter-spacing: clamp(2px, 1vw, 5px);
  color: rgba(249, 249, 249, 0.9);
  margin-top: 18px;
  text-transform: uppercase;
  padding: 8px 18px;
  border-radius: 20px;
  background: rgba(14, 18, 30, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
`

const ScrollHint = styled.div`
  position: absolute;
  bottom: calc(28px + env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: rgba(249, 249, 249, 0.7);
  font-size: 11px;
  letter-spacing: 2px;
  font-weight: 600;
  animation: ${pulse} 2.5s ease-in-out infinite;

  svg {
    stroke: rgba(249, 249, 249, 0.8);
  }
`

// 2 & 3. FLIGHT BLOCKS (ANDATA & RITORNO)
const FlightBlock = styled.section`
  position: relative;
  z-index: 2;
  padding: 80px 24px 60px;
  max-width: 780px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
`

const SectionBadge = styled.div`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #60a5fa;
  margin-bottom: 12px;
  text-transform: uppercase;
`

const SectionHeading = styled.h2`
  font-size: clamp(32px, 7vw, 52px);
  font-weight: 800;
  letter-spacing: clamp(3px, 1.2vw, 6px);
  color: #ffffff;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.9);
`

const SectionDate = styled.div`
  font-size: clamp(14px, 3vw, 17px);
  font-weight: 600;
  letter-spacing: 2px;
  color: rgba(249, 249, 249, 0.75);
  text-transform: uppercase;
  margin-bottom: 32px;
`

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 auto 30px;
  max-width: 680px;
`

const FlightCard = styled.div`
  background: rgba(14, 18, 30, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 18px;
  padding: 24px 26px;
  text-align: left;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.55);
  transition: transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 580px) {
    padding: 20px 18px;
  }
`

const FlightTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

const FlightCode = styled.span`
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.15);
  border: 1px solid rgba(96, 165, 250, 0.35);
  padding: 4px 12px;
  border-radius: 20px;
  text-transform: uppercase;
`

const FlightIcon = styled.span`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.4);
`

const RouteTitle = styled.h3`
  font-size: clamp(16px, 4vw, 21px);
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #ffffff;
  margin: 0 0 14px 0;
  text-transform: uppercase;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  word-break: break-word;
`

const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

const TimeValue = styled.span`
  font-size: clamp(17px, 4vw, 22px);
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #ffffff;
`

const TimeArrow = styled.span`
  color: #60a5fa;
  font-size: 18px;
  font-weight: bold;
`

const LayoverBadge = styled.div`
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(14, 18, 30, 0.5);
  border: 1px dashed rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 6px 14px;
  color: rgba(249, 249, 249, 0.7);
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`

const LayoverDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 8px #60a5fa;
`

const NarrativeQuote = styled.p`
  font-size: clamp(16px, 3.5vw, 20px);
  font-weight: 500;
  font-style: italic;
  color: rgba(249, 249, 249, 0.88);
  margin: 20px auto 0;
  max-width: 600px;
  line-height: 1.5;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
`

// 4. CHIUSURA
const ClosingSection = styled.section`
  position: relative;
  z-index: 2;
  padding: 50px 24px calc(70px + env(safe-area-inset-bottom, 0px));
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`

const ClosingTitle = styled.h2`
  font-size: clamp(24px, 5.5vw, 38px);
  font-weight: 800;
  letter-spacing: 2px;
  color: #ffffff;
  margin: 0 0 28px 0;
  text-transform: uppercase;
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.9);
`

const NextStageButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #0063e5;
  color: #ffffff;
  border: 1px solid #0483ee;
  border-radius: 32px;
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  box-shadow: 0 8px 24px rgba(0, 99, 229, 0.45);
  transition: all 250ms ease;

  &:hover {
    background: #0483ee;
    transform: scale(1.03);
    box-shadow: 0 12px 30px rgba(0, 99, 229, 0.6);
  }

  &:active {
    transform: scale(0.98);
  }
`

const NextStageHint = styled.span`
  margin-top: 14px;
  font-size: 12px;
  color: rgba(249, 249, 249, 0.6);
  letter-spacing: 1px;
`
