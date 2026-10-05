import React, { useEffect, useState, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { Link } from "react-router-dom"

const ACCOMMODATION_PHOTOS = [
  {
    src: "/image/casa-1.jpeg",
    fallbackSrc: "/image/casa-1.jpg",
    alt: "La nostra base a Parigi - Vista 1"
  },
  {
    src: "/image/casa-2.jpeg",
    fallbackSrc: "/image/casa-2.jpg",
    alt: "La nostra base a Parigi - Vista 2"
  },
  {
    src: "/image/casa-3.jpeg",
    fallbackSrc: "/image/casa-3.jpg",
    alt: "La nostra base a Parigi - Vista 3"
  },
  {
    src: "/image/casa-4.jpeg",
    fallbackSrc: "/image/casa-4.jpg",
    alt: "La nostra base a Parigi - Vista 4"
  }
]

const IMPORTANT_INFOS = [
  "Non è disponibile il deposito bagagli prima del check-in.",
  "Non è disponibile il deposito bagagli dopo il check-out.",
  "Non è disponibile il parcheggio.",
  "Struttura non fumatori."
]

const STAY_DETAILS = [
  { label: "INDIRIZZO", value: "84 Rue du Mont-Cenis, 75018 Paris" },
  { label: "SOGGIORNO", value: "01 → 05 LUGLIO 2027" },
  { label: "DURATA", value: "4 notti" },
  { label: "CHECK-IN", value: "16:00" },
  { label: "CHECK-OUT", value: "11:00" }
]

export default function Alloggio() {
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
    setCurrentPhotoIndex((prev) => (prev + 1) % ACCOMMODATION_PHOTOS.length)
    pauseAndScheduleResume()
  }

  const goToPrev = () => {
    setCurrentPhotoIndex(
      (prev) =>
        (prev - 1 + ACCOMMODATION_PHOTOS.length) % ACCOMMODATION_PHOTOS.length
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
      setCurrentPhotoIndex((prev) => (prev + 1) % ACCOMMODATION_PHOTOS.length)
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
      {/* Background Image: casa-1 */}
      <BackgroundContainer>
        <img
          src="/image/casa-1.jpeg"
          alt="Alloggio a Parigi"
          onError={(e) => {
            if (e.target.src.indexOf(".jpg") === -1) {
              e.target.src = "/image/casa-1.jpg"
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
          <HeroTitle>ALLOGGIO</HeroTitle>
          <HeroDate>01 — 05 LUGLIO 2027</HeroDate>
          <HeroSubtitle>La nostra base a Parigi.</HeroSubtitle>
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

      {/* 2. GALLERIA FOTOGRAFICA (casa-1 -> casa-2 -> casa-3 -> casa-4) */}
      <GallerySection data-animate>
        <SectionBadge>GALLERIA</SectionBadge>
        <SectionHeading>DOVE DORMIREMO</SectionHeading>

        <SlideshowCard
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {ACCOMMODATION_PHOTOS.map((photo, idx) => {
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
          {ACCOMMODATION_PHOTOS.map((_, idx) => (
            <IndicatorDot
              key={idx}
              $active={idx === currentPhotoIndex}
              onClick={() => goToIndex(idx)}
              aria-label={`Foto ${idx + 1}`}
            />
          ))}
        </IndicatorsContainer>
      </GallerySection>

      {/* 3. INFORMAZIONI PRINCIPALI */}
      <InfoSection data-animate>
        <SectionBadge>ALLOGGIO</SectionBadge>
        <SectionHeading>LA NOSTRA BASE</SectionHeading>

        <AddressCard data-animate>
          <AddressStreet>84 Rue du Mont-Cenis</AddressStreet>
          <AddressCity>75018 Paris, Francia</AddressCity>
        </AddressCard>

        <NightsBadge data-animate>
          <span>4 NOTTI</span>
        </NightsBadge>

        <CheckGrid>
          <CheckCard data-animate>
            <CheckLabel>CHECK-IN</CheckLabel>
            <CheckValue>01 LUGLIO 2027 — 16:00</CheckValue>
          </CheckCard>

          <CheckCard data-animate>
            <CheckLabel>CHECK-OUT</CheckLabel>
            <CheckValue>05 LUGLIO 2027 — 11:00</CheckValue>
          </CheckCard>
        </CheckGrid>
      </InfoSection>

      {/* 4. DETTAGLI DEL SOGGIORNO */}
      <DetailsSection data-animate>
        <SectionBadge>RIEPILOGO</SectionBadge>
        <SectionHeading>DETTAGLI</SectionHeading>

        <DetailsGrid>
          {STAY_DETAILS.map((item, idx) => (
            <DetailItem key={idx} data-animate>
              <DetailLabel>{item.label}</DetailLabel>
              <DetailValue>{item.value}</DetailValue>
            </DetailItem>
          ))}
        </DetailsGrid>
      </DetailsSection>

      {/* 5. INFORMAZIONI IMPORTANTI */}
      <ImportantSection data-animate>
        <SectionBadge>DA SAPERE</SectionBadge>
        <SectionHeading>INFORMAZIONI IMPORTANTI</SectionHeading>

        <ImportantList>
          {IMPORTANT_INFOS.map((info, idx) => (
            <ImportantItem key={idx} data-animate>
              <InfoIcon>•</InfoIcon>
              <InfoText>{info}</InfoText>
            </ImportantItem>
          ))}
        </ImportantList>
      </ImportantSection>

      {/* 6. CHIUSURA */}
      <ClosingSection data-animate>
        <ClosingQuote>
          PER QUALCHE GIORNO, QUESTA SARÀ CASA NOSTRA. ❤️
        </ClosingQuote>
        <ClosingSub>PARIGI CI ASPETTA.</ClosingSub>

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

        <NextStageHint>Fase 4 • Disneyland (In preparazione)</NextStageHint>
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
    rgba(4, 7, 20, 0.48) 0%,
    rgba(4, 7, 20, 0.35) 35%,
    rgba(4, 7, 20, 0.72) 70%,
    rgba(4, 7, 20, 0.94) 100%
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
  font-size: clamp(44px, 11vw, 105px);
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

const HeroSubtitle = styled.p`
  font-size: clamp(16px, 3.5vw, 22px);
  font-weight: 500;
  color: rgba(249, 249, 249, 0.88);
  margin: 20px 0 0 0;
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

// 2. GALLERIA
const GallerySection = styled.section`
  position: relative;
  z-index: 2;
  padding: 80px 24px 60px;
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

// 3. INFORMAZIONI PRINCIPALI
const InfoSection = styled.section`
  position: relative;
  z-index: 2;
  padding: 50px 24px 60px;
  max-width: 780px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
`

const AddressCard = styled.div`
  background: rgba(14, 18, 30, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  padding: 24px 28px;
  margin-bottom: 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.55);
`

const AddressStreet = styled.h3`
  font-size: clamp(20px, 5vw, 28px);
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #ffffff;
  margin: 0 0 6px 0;
`

const AddressCity = styled.p`
  font-size: clamp(15px, 3.5vw, 19px);
  color: #60a5fa;
  font-weight: 600;
  letter-spacing: 1.5px;
  margin: 0;
  text-transform: uppercase;
`

const NightsBadge = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #ffffff;
  background: rgba(96, 165, 250, 0.18);
  border: 1px solid rgba(96, 165, 250, 0.4);
  padding: 6px 18px;
  border-radius: 20px;
  margin-bottom: 24px;
  text-transform: uppercase;
`

const CheckGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`

const CheckCard = styled.div`
  background: rgba(14, 18, 30, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 16px;
  padding: 22px 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  transition: transform 250ms ease, border-color 250ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(96, 165, 250, 0.5);
  }
`

const CheckLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: #60a5fa;
  margin-bottom: 8px;
  text-transform: uppercase;
`

const CheckValue = styled.div`
  font-size: clamp(15px, 3.5vw, 18px);
  font-weight: 700;
  letter-spacing: 1px;
  color: #ffffff;
`

// 4. DETTAGLI DEL SOGGIORNO
const DetailsSection = styled.section`
  position: relative;
  z-index: 2;
  padding: 40px 24px 60px;
  max-width: 780px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
`

const DetailsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const DetailItem = styled.div`
  background: rgba(14, 18, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  padding: 16px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: transform 200ms ease;

  &:hover {
    transform: translateX(4px);
    border-color: rgba(96, 165, 250, 0.4);
  }

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    padding: 14px 18px;
  }
`

const DetailLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #60a5fa;
  text-transform: uppercase;
`

const DetailValue = styled.span`
  font-size: clamp(14px, 3.2vw, 16px);
  font-weight: 600;
  color: #ffffff;
`

// 5. INFORMAZIONI IMPORTANTI
const ImportantSection = styled.section`
  position: relative;
  z-index: 2;
  padding: 40px 24px 60px;
  max-width: 780px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
`

const ImportantList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
`

const ImportantItem = styled.div`
  background: rgba(14, 18, 30, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`

const InfoIcon = styled.span`
  color: #60a5fa;
  font-size: 20px;
  line-height: 1;
`

const InfoText = styled.span`
  font-size: clamp(14px, 3.2vw, 16px);
  color: rgba(249, 249, 249, 0.88);
  line-height: 1.5;
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

const ClosingQuote = styled.h2`
  font-size: clamp(22px, 5vw, 34px);
  font-weight: 800;
  letter-spacing: 2px;
  color: #ffffff;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.9);
`

const ClosingSub = styled.p`
  font-size: clamp(16px, 3.5vw, 20px);
  font-weight: 600;
  letter-spacing: 2px;
  color: #60a5fa;
  margin: 0 0 28px 0;
  text-transform: uppercase;
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
