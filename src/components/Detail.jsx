import styled from "styled-components"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import db from "../firebase"
import { fallbackMovies } from "../disneyMoviesData"

export default function Detail() {
  const { id } = useParams()
  const [detailData, setDetailData] = useState({})

  useEffect(() => {
    try {
      db.collection('movies')
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setDetailData(doc.data())
          } else {
            const fallback = fallbackMovies.find((m) => m.id === id)
            if (fallback) setDetailData(fallback)
          }
        })
        .catch((error) => {
          console.warn("Firestore detail error:", error)
          const fallback = fallbackMovies.find((m) => m.id === id)
          if (fallback) setDetailData(fallback)
        })
    } catch (err) {
      console.warn("Firebase access error:", err)
      const fallback = fallbackMovies.find((m) => m.id === id)
      if (fallback) setDetailData(fallback)
    }
  }, [id])

  return (
    <Container>
      <Background>
        <img
          src={detailData.backgroundImg || "/images/home-background.png"}
          alt={detailData.title || "Movie background"}
        />
      </Background>
      <ImageTitle>
        {detailData.titleImg ? (
          <img src={detailData.titleImg} alt={detailData.title || "Movie title"} />
        ) : (
          <TextTitle>{detailData.title}</TextTitle>
        )}
      </ImageTitle>
      <Controls>
        <PlayButton>
          <img src="/images/play-icon-black.png" alt="Riproduci" />
          <span>RIPRODUCI</span>
        </PlayButton>
        <TrailerButton>
          <img src="/images/play-icon-white.png" alt="Trailer" />
          <span>Trailer</span>
        </TrailerButton>
        <AddButton aria-label="Aggiungi alla mia lista" title="Aggiungi alla mia lista">
          <span>+</span>
        </AddButton>
        <GroupWatchButton aria-label="GroupWatch" title="GroupWatch">
          <img src="/images/group-icon.png" alt="GroupWatch" />
        </GroupWatchButton>
      </Controls>
      <SubTitle>{detailData.subtitle}</SubTitle>
      <Description>{detailData.description}</Description>
    </Container>
  )
}

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  max-height: 100vh;
  overflow-y: hidden;
  top: 72px;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ImageTitle = styled.div`
  min-height: 120px;
  height: 150px;
  width: 35vw;
  min-width: 200px;
  margin-top: 60px;
  margin-bottom: 30px;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`

const TextTitle = styled.h1`
  font-size: 40px;
  color: #f9f9f9;
  letter-spacing: 2px;
  margin: 0;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
`

const PlayButton = styled.button`
  border-radius: 4px;
  font-size: 15px;
  padding: 0px 24px;
  margin-right: 22px;
  display: flex;
  align-items: center;
  height: 56px;
  background: rgb(249, 249, 249);
  border: none;
  letter-spacing: 1.8px;
  cursor: pointer;
  transition: all 250ms;

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }
`

const TrailerButton = styled(PlayButton)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
  text-transform: uppercase;
`

const AddButton = styled.button`
  margin-right: 16px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid white;
  background-color: rgb(0, 0, 0, 0.6);
  cursor: pointer;

  span {
    font-size: 30px;
    color: white;
  }
`

const GroupWatchButton = styled(AddButton)`
  background-color: rgb(0, 0, 0);

  img {
    width: 20px;
  }
`

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  margin-top: 26px;
`

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  margin-top: 12px;
  color: rgb(249, 249, 249);
  max-width: 40vw;

  @media (max-width: 768px) {
    max-width: 80vw;
    font-size: 16px;
  }
`
