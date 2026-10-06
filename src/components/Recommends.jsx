import styled from "styled-components"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectRecommend } from "../features/movie/movieSlice"

export default function Recommends() {
  const reduxMovies = useSelector(selectRecommend)

  // La prima card è obbligatoriamente BAGAGLIO A MANO con valigia-.jpg
  const baggageCard = {
    id: "bagaglio-a-mano",
    title: "BAGAGLIO A MANO",
    cardImg: "/image/valigia-.jpg",
    fallbackCardImg: "/image/valigia-.jpg.jpg"
  }

  // La seconda card è obbligatoriamente DOCUMENTI con documenti-.jpg
  const documentiCard = {
    id: "documenti",
    title: "DOCUMENTI",
    cardImg: "/image/documenti-.jpg",
    fallbackCardImg: "/image/documenti-.jpg.JPG"
  }

  // La terza card è obbligatoriamente METRO & RER con biglietti-metro-.png
  const metroRerCard = {
    id: "metro-rer",
    title: "METRO & RER",
    cardImg: "/image/biglietti-metro-.png",
    fallbackCardImg: "/image/biglietti-metro-.png.png"
  }

  // La quarta card è obbligatoriamente POWER BANK con power-bank-.png
  const powerBankCard = {
    id: "power-bank",
    title: "POWER BANK",
    cardImg: "/image/power-bank-.png",
    fallbackCardImg: "/image/power-bank-.png.png"
  }

  const displayMovies = [
    baggageCard,
    documentiCard,
    metroRerCard,
    powerBankCard
  ]

  return (
    <div>
      <Container>
        <h3>Consigliati per te</h3>
        <Content>
          {displayMovies.map((movie, key) => {
            const isBaggage = movie.id === "bagaglio-a-mano"
            const isDocumenti = movie.id === "documenti"
            const isMetroRer = movie.id === "metro-rer"
            const isPowerBank = movie.id === "power-bank"
            const hasCustomTitle = isBaggage || isDocumenti || isMetroRer || isPowerBank
            return (
              <Wrap key={key}>
                <Link to={"/detail/" + movie.id} title={movie.title}>
                  <img
                    src={movie.cardImg}
                    alt={movie.title}
                    onError={(e) => {
                      if (isBaggage && e.target.src.indexOf(".jpg.jpg") === -1) {
                        e.target.src = "/image/valigia-.jpg.jpg"
                      } else if (isDocumenti && e.target.src.indexOf(".jpg.JPG") === -1) {
                        e.target.src = "/image/documenti-.jpg.JPG"
                      } else if (isMetroRer && e.target.src.indexOf(".png.png") === -1) {
                        e.target.src = "/image/biglietti-metro-.png.png"
                      } else if (isPowerBank && e.target.src.indexOf(".png.png") === -1) {
                        e.target.src = "/image/power-bank-.png.png"
                      }
                    }}
                  />
                  {hasCustomTitle && (
                    <CardTitleOverlay>
                      <span>{movie.title}</span>
                    </CardTitleOverlay>
                  )}
                </Link>
              </Wrap>
            )
          })}
        </Content>
      </Container>
    </div>
  )
}

const Container = styled.div`
  padding: 0 0 26px;
`

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Wrap = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  aspect-ratio: 16 / 9;

  a {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
  }

  img {
    inset: 0px;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 500ms ease-in-out 0s;
  }

  &:hover {
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  }
`

const CardTitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 8px 8px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(4, 7, 20, 0.7) 40%,
    rgba(4, 7, 20, 0.95) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  span {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 1.5px;
    color: #ffffff;
    text-transform: uppercase;
    text-align: center;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
  }

  @media (max-width: 480px) {
    padding: 16px 6px 6px;
    span {
      font-size: 11px;
      letter-spacing: 1px;
    }
  }
`
