import styled from "styled-components"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectNewDisney } from "../features/movie/movieSlice"

export default function NewDisney() {
  const reduxMovies = useSelector(selectNewDisney)

  // La sezione Novità contiene SOLO ED ESCLUSIVAMENTE la card PREMIER ACCESS
  const premierAccessCard = {
    id: "premier-access",
    title: "PREMIER ACCESS",
    cardImg: "/image/disney-f-2-.jpg",
    fallbackCardImg: "/image/disney-f-2-.jpg.jpg"
  }

  const displayMovies = [premierAccessCard]

  return (
    <div>
      <Container>
        <h3>Novità</h3>
        <Content>
          {displayMovies.map((movie, key) => {
            const isPremier = movie.id === "premier-access"
            return (
              <Wrap key={key}>
                <Link to={"/detail/" + movie.id} title={movie.title}>
                  <img
                    src={movie.cardImg}
                    alt={movie.title}
                    onError={(e) => {
                      if (isPremier && e.target.src.indexOf(".jpg.jpg") === -1) {
                        e.target.src = "/image/disney-f-2-.jpg.jpg"
                      }
                    }}
                  />
                  {isPremier && (
                    <CardTitleOverlay>
                      <span>PREMIER ACCESS</span>
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
