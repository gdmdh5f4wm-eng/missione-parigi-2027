import React, { useEffect, useState, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { Link } from "react-router-dom"

const DISNEY_PHOTOS = [
  {
    src: "/image/entrata-parco.jpg",
    fallbackSrc: "/image/entrata%20parco.jpg",
    alt: "Entrata Parco Disneyland"
  },
  {
    src: "/image/castello-al-buoio.jpg",
    fallbackSrc: "/image/castello%20al%20buoio.jpg",
    alt: "Castello Disneyland al buio"
  },
  {
    src: "/image/castello-2.jpg",
    fallbackSrc: "/image/castello%202.jpg",
    alt: "Castello Disneyland 2"
  },
  {
    src: "/image/castello-3.jpg",
    fallbackSrc: "/image/castello%203.jpg",
    alt: "Castello Disneyland 3"
  },
  {
    src: "/image/imm-fatina.jpg",
    fallbackSrc: "/image/imm.%20fatina.jpg",
    alt: "Magia Disneyland"
  }
]

export default function Disneyland() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const resumeTimerRef = useRef(null)
  const touchStartXRef = useRef(0)
  const touchStartYRef = useRef(0)
  const touchCurrentXRef = useRef(0)
  const isDraggingRef = useRef(false)

  // Pause autoplay on manual interaction and re-activate 6 seconds after last interaction
  const pauseAndScheduleResume = () => {
    setIsPaused(true)
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 6000)
  }

  const goToNext = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % DISNEY_PHOTOS.length)
    pauseAndScheduleResume()
  }

  const goToPrev = () => {
    setCurrentPhotoIndex(
      (prev) => (prev - 1 + DISNEY_PHOTOS.length) % DISNEY_PHOTOS.length
    )
    pauseAndScheduleResume()
  }

  const goToIndex = (idx) => {
    setCurrentPhotoIndex(idx)
    pauseAndScheduleResume()
  }

  // Automatic slow crossfade slideshow (4.5s) when not paused
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % DISNEY_PHOTOS.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [isPaused])

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current)
      }
    }
  }, [])

  // Touch gesture handlers for iPhone 15
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
    touchStartYRef.current = e.touches[0].clientY
    touchCurrentXRef.current = e.touches[0].clientX
    isDraggingRef.current = true
  }

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return
    touchCurrentXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    const deltaX = touchCurrentXRef.current - touchStartXRef.current
    const deltaY =
      (e.changedTouches ? e.changedTouches[0].clientY : touchStartYRef.current) -
      touchStartYRef.current

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToNext()
      } else {
        goToPrev()
      }
    }
  }

  // Mouse drag handlers for desktop
  const handleMouseDown = (e) => {
    touchStartXRef.current = e.clientX
    touchStartYRef.current = e.clientY
    touchCurrentXRef.current = e.clientX
    isDraggingRef.current = true
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return
    touchCurrentXRef.current = e.clientX
  }

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    const deltaX = touchCurrentXRef.current - touchStartXRef.current
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        goToNext()
      } else {
        goToPrev()
      }
    }
  }

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      handleMouseUp()
    }
  }

  // Scroll entrance transitions
  useEffect(() => {
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
      {/* Background Image: Strictly entrata parco */}
      <BackgroundContainer>
        <img
          src="/image/entrata-parco.jpg"
          alt="Entrata Parco Disneyland"
          onError={(e) => {
            if (e.target.src.indexOf("entrata%20parco.jpg") === -1) {
              e.target.src = "/image/entrata%20parco.jpg"
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

      {/* 1. HERO CINEMATOGRAFICA (Hero) */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>DISNEYLAND</HeroTitle>
          <HeroDate>02 LUGLIO 2027</HeroDate>
          <HeroSubtitle>
            Un giorno nel posto dove la magia prende vita.
          </HeroSubtitle>
        </HeroContent>

        <ScrollHint>
          <span>SCORRI PER IL NOSTRO GIORNO</span>
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

      {/* 2. IL NOSTRO GIORNO */}
      <DaySection data-animate>
        <SectionBadge>IL NOSTRO GIORNO</SectionBadge>
        <DayHeading>VENERDÌ 02 LUGLIO 2027</DayHeading>
        <FormulaBadge>1 GIORNO · 2 PARCHI</FormulaBadge>

        <ParksPillsGrid>
          <ParkPill data-animate>
            <PillSparkle>✨</PillSparkle>
            <PillText>DISNEYLAND PARK</PillText>
          </ParkPill>

          <ParkPill data-animate>
            <PillSparkle>🎬</PillSparkle>
            <PillText>WALT DISNEY STUDIOS</PillText>
          </ParkPill>
        </ParksPillsGrid>
      </DaySection>

      {/* 3. GALLERIA FOTOGRAFICA: QUEL GIORNO */}
      <GallerySection data-animate>
        <SectionBadge>FOTOGRAFIE</SectionBadge>
        <SectionHeading>QUEL GIORNO</SectionHeading>

        <SlideshowCard
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {DISNEY_PHOTOS.map((photo, idx) => {
            const isCurrent = idx === currentPhotoIndex
            return (
              <PhotoLayer key={idx} $active={isCurrent}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  onError={(e) => {
                    if (photo.fallbackSrc && e.target.src !== photo.fallbackSrc) {
                      e.target.src = photo.fallbackSrc
                    }
                  }}
                />
              </PhotoLayer>
            )
          })}

          <GalleryNavBtn
            $direction="prev"
            onClick={(e) => {
              e.stopPropagation()
              goToPrev()
            }}
            aria-label="Foto precedente"
          >
            ‹
          </GalleryNavBtn>
          <GalleryNavBtn
            $direction="next"
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            aria-label="Foto successiva"
          >
            ›
          </GalleryNavBtn>
        </SlideshowCard>

        {/* Minimal dot indicators */}
        <IndicatorsContainer>
          {DISNEY_PHOTOS.map((_, idx) => (
            <IndicatorDot
              key={idx}
              $active={idx === currentPhotoIndex}
              onClick={() => goToIndex(idx)}
              aria-label={`Foto ${idx + 1}`}
            />
          ))}
        </IndicatorsContainer>
      </GallerySection>

      {/* 4. I DUE PARCHI */}
      <ParksSection data-animate>
        <SectionBadge>I PARCHI</SectionBadge>
        <SectionHeading>I DUE PARCHI</SectionHeading>

        <ParksCardsGrid>
          <ParkCard data-animate>
            <ParkCardTitle>DISNEYLAND PARK</ParkCardTitle>
            <ParkCardDesc>
              Il castello, le attrazioni e tutto quello che rende Disneyland quello che è.
            </ParkCardDesc>
          </ParkCard>

          <ParkCard data-animate>
            <ParkCardTitle>WALT DISNEY STUDIOS</ParkCardTitle>
            <ParkCardDesc>
              Il secondo parco, per vivere un'altra parte dell'esperienza Disney.
            </ParkCardDesc>
          </ParkCard>
        </ParksCardsGrid>
      </ParksSection>

      {/* 5. UN GIORNO TUTTO PER NOI */}
      <SpecialSection data-animate>
        <SpecialCard data-animate>
          <SectionBadge>ESPERIENZA</SectionBadge>
          <SpecialHeading>UN GIORNO TUTTO PER NOI</SpecialHeading>
          <SpecialText>
            Il 2 luglio sarà dedicato a Disneyland.
            <br />
            Un giorno per girare, vedere, ridere, fare foto e semplicemente goderci il momento.
          </SpecialText>
        </SpecialCard>
      </SpecialSection>

      {/* 6. CHIUSURA */}
      <ClosingSection data-animate>
        <ClosingDateBadge>02 LUGLIO 2027</ClosingDateBadge>
        <ClosingQuote>
          IL GIORNO PIÙ MAGICO DEL VIAGGIO. ✨
        </ClosingQuote>
        <ClosingSub>E QUESTO È SOLO L'INIZIO.</ClosingSub>

        <HomeButton to="/home">
          <span>TORNA ALLA HOME</span>
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
        </HomeButton>
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
    rgba(4, 7, 20, 0.5) 0%,
    rgba(4, 7, 20, 0.35) 35%,
    rgba(4, 7, 20, 0.72) 70%,
    rgba(4, 7, 20, 0.95) 100%
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

// 1. HERO
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
  font-size: clamp(40px, 11vw, 100px);
  font-weight: 800;
  letter-spacing: clamp(6px, 2.5vw, 18px);
  color: #ffffff;
  margin: 0;
  text-transform: uppercase;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.95), 0 2px 10px rgba(0, 0, 0, 0.85);
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

const HeroSubtitle = styled.p`
  font-size: clamp(16px, 3.5vw, 22px);
  font-weight: 500;
  color: rgba(249, 249, 249, 0.9);
  margin: 20px 0 0 0;
  max-width: 600px;
  line-height: 1.5;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.85);
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

// Common Section Styles
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
  font-size: clamp(30px, 6.5vw, 48px);
  font-weight: 800;
  letter-spacing: clamp(3px, 1.2vw, 6px);
  color: #ffffff;
  margin: 0 0 28px 0;
  text-transform: uppercase;
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.9);
`

// 2. IL NOSTRO GIORNO
const DaySection = styled.section`
  position: relative;
  z-index: 2;
  padding: 80px 24px 50px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
`

const DayHeading = styled.h2`
  font-size: clamp(26px, 6vw, 44px);
  font-weight: 800;
  letter-spacing: clamp(2.5px, 1vw, 5px);
  color: #ffffff;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.9);
`

const FormulaBadge = styled.div`
  display: inline-block;
  font-size: clamp(14px, 3.2vw, 17px);
  font-weight: 800;
  letter-spacing: 2.5px;
  color: #ffffff;
  background: rgba(96, 165, 250, 0.2);
  border: 1px solid rgba(96, 165, 250, 0.45);
  padding: 8px 22px;
  border-radius: 25px;
  margin-bottom: 28px;
  text-transform: uppercase;
  box-shadow: 0 0 20px rgba(96, 165, 250, 0.35);
`

const ParksPillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 640px;
  margin: 0 auto;

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`

const ParkPill = styled.div`
  background: rgba(14, 18, 30, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  transition: transform 250ms ease, border-color 250ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(96, 165, 250, 0.5);
  }
`

const PillSparkle = styled.span`
  font-size: 20px;
`

const PillText = styled.span`
  font-size: clamp(14px, 3.2vw, 17px);
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #ffffff;
  text-transform: uppercase;
`

// 3. GALLERIA
const GallerySection = styled.section`
  position: relative;
  z-index: 2;
  padding: 50px 24px 60px;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
`

const SlideshowCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  max-height: 520px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(14, 18, 30, 0.7);
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.88),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    aspect-ratio: 4 / 3;
    max-height: 380px;
    border-radius: 12px;
  }
`

const PhotoLayer = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.$active ? 1 : 0)};
  transform: ${(props) => (props.$active ? "scale(1)" : "scale(1.03)")};
  transition: opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 1200ms cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: ${(props) => (props.$active ? "auto" : "none")};
  z-index: ${(props) => (props.$active ? 2 : 1)};
  will-change: opacity, transform;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
    pointer-events: none;
  }
`

const GalleryNavBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$direction === "prev" ? "left: 14px;" : "right: 14px;")}
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(14, 18, 30, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-size: 26px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0.7;
  transition: all 250ms ease;

  &:hover {
    opacity: 1;
    background: #0063e5;
    border-color: #0483ee;
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const IndicatorsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`

const IndicatorDot = styled.button`
  width: ${(props) => (props.$active ? "24px" : "8px")};
  height: 8px;
  border-radius: 4px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${(props) =>
    props.$active ? "#60a5fa" : "rgba(255, 255, 255, 0.3)"};
  box-shadow: ${(props) =>
    props.$active ? "0 0 10px rgba(96, 165, 250, 0.6)" : "none"};
  transition: all 300ms ease;

  &:hover {
    background: ${(props) =>
      props.$active ? "#60a5fa" : "rgba(255, 255, 255, 0.6)"};
  }
`

// 4. I DUE PARCHI
const ParksSection = styled.section`
  position: relative;
  z-index: 2;
  padding: 50px 24px 60px;
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
`

const ParksCardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  text-align: left;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const ParkCard = styled.div`
  background: rgba(14, 18, 30, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 18px;
  padding: 26px 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.55);
  transition: transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.7);
  }
`

const ParkCardTitle = styled.h3`
  font-size: clamp(18px, 4vw, 22px);
  font-weight: 800;
  letter-spacing: 2px;
  color: #60a5fa;
  margin: 0 0 12px 0;
  text-transform: uppercase;
`

const ParkCardDesc = styled.p`
  font-size: clamp(14px, 3.2vw, 16px);
  line-height: 1.6;
  color: rgba(249, 249, 249, 0.88);
  margin: 0;
`

// 5. UN GIORNO TUTTO PER NOI
const SpecialSection = styled.section`
  position: relative;
  z-index: 2;
  padding: 40px 24px 60px;
  max-width: 780px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
`

const SpecialCard = styled.div`
  background: rgba(16, 22, 40, 0.72);
  border: 1px solid rgba(96, 165, 250, 0.35);
  border-radius: 20px;
  padding: 36px 30px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.65), 0 0 30px rgba(96, 165, 250, 0.15);
`

const SpecialHeading = styled.h3`
  font-size: clamp(22px, 5vw, 32px);
  font-weight: 800;
  letter-spacing: clamp(2px, 1vw, 4px);
  color: #ffffff;
  margin: 0 0 18px 0;
  text-transform: uppercase;
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.9);
`

const SpecialText = styled.p`
  font-size: clamp(15px, 3.5vw, 18px);
  line-height: 1.7;
  color: rgba(249, 249, 249, 0.9);
  margin: 0;
  font-weight: 400;
`

// 6. CHIUSURA
const ClosingSection = styled.section`
  position: relative;
  z-index: 2;
  padding: 50px 24px calc(70px + env(safe-area-inset-bottom, 0px));
  max-width: 650px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`

const ClosingDateBadge = styled.div`
  display: inline-block;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: #60a5fa;
  margin-bottom: 14px;
  text-transform: uppercase;
`

const ClosingQuote = styled.h2`
  font-size: clamp(22px, 5vw, 36px);
  font-weight: 800;
  letter-spacing: 2px;
  color: #ffffff;
  margin: 0 0 14px 0;
  text-transform: uppercase;
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.9);
`

const ClosingSub = styled.p`
  font-size: clamp(15px, 3.5vw, 19px);
  font-weight: 700;
  letter-spacing: 2.5px;
  color: #93c5fd;
  margin: 0 0 32px 0;
  text-transform: uppercase;
`

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #0063e5;
  color: #ffffff;
  border: 1px solid #0483ee;
  border-radius: 32px;
  padding: 14px 34px;
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
