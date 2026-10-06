import React, { useEffect, useRef, useState } from "react"
import styled, { keyframes } from "styled-components"
import { Link } from "react-router-dom"

const PARIS_PHOTOS = [
  {
    src: "/image/arco-con-vista-torre-eiffel.JPG.jpg",
    fallbackSrc: "/images/arco-con-vista-torre-eiffel.JPG.jpg",
    title: "TORRE EIFFEL"
  },
  {
    src: "/image/montmartre-base-cinematic.jpg",
    fallbackSrc: "/image/montmartre-base-cinematic.jpg.jpg",
    title: "MONTMARTRE"
  },
  {
    src: "/image/paris-louvre.jpg",
    fallbackSrc: "/image/paris-louvre.jpg.jpg",
    title: "LOUVRE"
  },
  {
    src: "/image/paris-tuileries.jpg",
    fallbackSrc: "/image/paris-tuileries.jpg.jpg",
    title: "TUILERIES"
  },
  {
    src: "/image/paris-notredame.jpg",
    fallbackSrc: "/image/paris-notredame.jpg.jpg",
    title: "NOTRE-DAME"
  },
  {
    src: "/image/paris-seine.jpg",
    fallbackSrc: "/image/paris-seine.jpg.jpg",
    title: "SENNA"
  },
  {
    src: "/image/paris-quartier-latin.jpg",
    fallbackSrc: "/image/paris-quartier-latin.jpg.jpg",
    title: "QUARTIERE LATINO"
  }
]

const WHAT_WE_WILL_SEE = [
  {
    title: "TORRE EIFFEL",
    desc: "Uno dei simboli di Parigi, il primo luogo che ci farà capire davvero di essere arrivati."
  },
  {
    title: "MONTMARTRE",
    desc: "Passeggeremo tra le strade di uno dei quartieri più caratteristici di Parigi."
  },
  {
    title: "LOUVRE",
    desc: "Visiteremo il Louvre e ci perderemo tra le sue sale."
  },
  {
    title: "TUILERIES",
    desc: "Una passeggiata attraverso i Giardini delle Tuileries."
  },
  {
    title: "NOTRE-DAME",
    desc: "Andremo a vedere Notre-Dame e la zona circostante."
  },
  {
    title: "SENNA",
    desc: "Passeggeremo lungo la Senna, godendoci alcuni degli scorci più belli della città."
  },
  {
    title: "QUARTIERE LATINO",
    desc: "Esploreremo il Quartiere Latino tra strade, piazze e atmosfera parigina."
  }
]

export default function Destinazione() {
  const videoRef = useRef(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const resumeTimerRef = useRef(null)
  const touchStartXRef = useRef(0)
  const touchStartYRef = useRef(0)
  const touchCurrentXRef = useRef(0)
  const isDraggingRef = useRef(false)

  useEffect(() => {
    // Autoplay kick for iOS Safari and mobile browsers
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [])

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
    setCurrentPhotoIndex((prev) => (prev + 1) % PARIS_PHOTOS.length)
    pauseAndScheduleResume()
  }

  const goToPrev = () => {
    setCurrentPhotoIndex(
      (prev) => (prev - 1 + PARIS_PHOTOS.length) % PARIS_PHOTOS.length
    )
    pauseAndScheduleResume()
  }

  const goToIndex = (idx) => {
    setCurrentPhotoIndex(idx)
    pauseAndScheduleResume()
  }

  // Automatic slideshow: changes slowly every 4.5 seconds with soft crossfade when not paused
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % PARIS_PHOTOS.length)
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

  // Scroll animations for standard content sections
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
      {/* Background Video */}
      <VideoContainer>
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
        <VideoOverlay />
      </VideoContainer>

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

      {/* 1. APERTURA (Hero Section) */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>PARIGI</HeroTitle>
          <HeroDate>01 — 05 LUGLIO 2027</HeroDate>
        </HeroContent>

        <ScrollHint>
          <span>SCORRI PER ESPLORARE</span>
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

      {/* 2. DESTINAZIONE */}
      <DestinationSection data-animate>
        <SectionBadge>DESTINAZIONE</SectionBadge>
        <MainTitle>PARIGI, FRANCIA</MainTitle>
        <Subtitle>Una città da vivere insieme.</Subtitle>
      </DestinationSection>

      {/* 3. FOTOGRAFIE DI PARIGI (Scorrimento Automatico) */}
      {/* 3. FOTOGRAFIE DI PARIGI (Scorrimento Automatico + Manuale) */}
      <SlideshowSection data-animate>
        <SlideshowCard
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {PARIS_PHOTOS.map((photo, idx) => {
            const isCurrent = idx === currentPhotoIndex
            return (
              <PhotoLayer key={idx} $active={isCurrent}>
                <img
                  src={photo.src}
                  alt={photo.title}
                  onError={(e) => {
                    if (photo.fallbackSrc && e.target.src !== photo.fallbackSrc) {
                      e.target.src = photo.fallbackSrc
                    }
                  }}
                />
                <CardCaption>
                  <PlaceLabel>{photo.title}</PlaceLabel>
                </CardCaption>
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

        {/* Minimal dot indicators (clickable) */}
        <IndicatorsContainer>
          {PARIS_PHOTOS.map((_, idx) => (
            <IndicatorDot
              key={idx}
              $active={idx === currentPhotoIndex}
              onClick={() => goToIndex(idx)}
              aria-label={`Foto ${idx + 1}`}
            />
          ))}
        </IndicatorsContainer>
      </SlideshowSection>

      {/* 4. COSA VEDREMO */}
      <ItinerarySection data-animate>
        <SectionBadge>ITINERARIO</SectionBadge>
        <SectionHeading>COSA VEDREMO</SectionHeading>

        <PlacesGrid>
          {WHAT_WE_WILL_SEE.map((item, idx) => (
            <PlaceCard key={idx} data-animate>
              <PlaceHeader>
                <PlaceNumber>{String(idx + 1).padStart(2, "0")}</PlaceNumber>
                <PlaceName>{item.title}</PlaceName>
              </PlaceHeader>
              <PlaceDesc>{item.desc}</PlaceDesc>
            </PlaceCard>
          ))}
        </PlacesGrid>

        {/* Frase finale */}
        <HumorBanner data-animate>
          <HumorQuote>
            "Se non abbiamo sbatti possiamo anche solo mangiare invece di visitare."
          </HumorQuote>
        </HumorBanner>
      </ItinerarySection>

      {/* 5. DATE */}
      <DatesSection data-animate>
        <DatesGrid>
          <DateCard>
            <DateDay>01 LUGLIO 2027</DateDay>
            <DateLabel>PARTENZA</DateLabel>
          </DateCard>

          <DateCard>
            <DateDay>05 LUGLIO 2027</DateDay>
            <DateLabel>RITORNO</DateLabel>
          </DateCard>
        </DatesGrid>
      </DatesSection>

      {/* 6. CHIUSURA */}
      <ClosingSection data-animate>
        <ClosingTitle>PARIGI CI ASPETTA. 🇫🇷</ClosingTitle>

        <NextStageButton to="/volo">
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

        <NextStageHint>Fase 2 • Volo</NextStageHint>
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

const VideoContainer = styled.div`
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

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(4, 7, 20, 0.42) 0%,
    rgba(4, 7, 20, 0.28) 35%,
    rgba(4, 7, 20, 0.62) 70%,
    rgba(4, 7, 20, 0.9) 100%
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

// 1. APERTURA
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

// 2. DESTINAZIONE
const DestinationSection = styled.section`
  position: relative;
  z-index: 2;
  padding: 90px 24px 45px;
  max-width: 800px;
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

const MainTitle = styled.h2`
  font-size: clamp(32px, 7vw, 54px);
  font-weight: 800;
  letter-spacing: clamp(3px, 1.2vw, 6px);
  color: #ffffff;
  margin: 0 0 14px 0;
  text-transform: uppercase;
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.9);
`

const Subtitle = styled.p`
  font-size: clamp(16px, 3.5vw, 22px);
  font-weight: 400;
  color: rgba(249, 249, 249, 0.85);
  margin: 0;
  line-height: 1.5;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
`

// 3. FOTOGRAFIE DI PARIGI (Automatic Slideshow)
const SlideshowSection = styled.section`
  position: relative;
  z-index: 2;
  padding: 20px 24px 70px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const CardCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(4, 7, 20, 0.85) 100%
  );
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
`

const PlaceLabel = styled.span`
  font-size: clamp(12px, 2.5vw, 15px);
  font-weight: 700;
  letter-spacing: 2px;
  color: #ffffff;
  text-transform: uppercase;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
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

// 4. COSA VEDREMO
const ItinerarySection = styled.section`
  position: relative;
  z-index: 2;
  padding: 40px 24px 70px;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
`

const SectionHeading = styled.h2`
  font-size: clamp(28px, 6vw, 44px);
  font-weight: 800;
  letter-spacing: clamp(3px, 1.2vw, 6px);
  color: #ffffff;
  margin: 0 0 40px 0;
  text-transform: uppercase;
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.9);
`

const PlacesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  text-align: left;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const PlaceCard = styled.div`
  background: rgba(14, 18, 30, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  transition: transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7);
  }
`

const PlaceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`

const PlaceNumber = styled.span`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.15);
  border: 1px solid rgba(96, 165, 250, 0.3);
  padding: 3px 8px;
  border-radius: 8px;
`

const PlaceName = styled.h3`
  font-size: clamp(16px, 3.5vw, 19px);
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #ffffff;
  margin: 0;
  text-transform: uppercase;
`

const PlaceDesc = styled.p`
  font-size: clamp(14px, 3vw, 15px);
  line-height: 1.6;
  color: rgba(249, 249, 249, 0.82);
  margin: 0;
`

const HumorBanner = styled.div`
  margin-top: 45px;
  padding: 24px 28px;
  border-radius: 20px;
  background: rgba(20, 24, 40, 0.75);
  border: 1px dashed rgba(96, 165, 250, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.01);
  }
`

const HumorQuote = styled.p`
  font-size: clamp(15px, 3.5vw, 19px);
  font-weight: 600;
  font-style: italic;
  line-height: 1.5;
  color: #93c5fd;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
`

// 5. DATE
const DatesSection = styled.section`
  position: relative;
  z-index: 2;
  padding: 40px 24px 60px;
  max-width: 720px;
  margin: 0 auto;
  box-sizing: border-box;
`

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const DateCard = styled.div`
  background: rgba(14, 18, 30, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 26px 20px;
  text-align: center;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  transition: transform 250ms ease, border-color 250ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(96, 165, 250, 0.5);
  }
`

const DateDay = styled.div`
  font-size: clamp(17px, 3.5vw, 22px);
  font-weight: 800;
  letter-spacing: 2px;
  color: #ffffff;
  margin-bottom: 8px;
  text-transform: uppercase;
`

const DateLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: #60a5fa;
  text-transform: uppercase;
`

// 6. CHIUSURA
const ClosingSection = styled.section`
  position: relative;
  z-index: 2;
  padding: 40px 24px calc(60px + env(safe-area-inset-bottom, 0px));
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`

const ClosingTitle = styled.h2`
  font-size: clamp(26px, 5.5vw, 40px);
  font-weight: 800;
  letter-spacing: 3px;
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
