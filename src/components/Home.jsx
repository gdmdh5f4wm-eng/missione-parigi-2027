import styled from "styled-components"
import ImgSlider from "./ImgSlider"
import Viewers from "./Viewers"
import DestinazioneSection from "./DestinazioneSection"
import { useEffect, useRef } from "react"
import db from "../firebase"
import Recommends from "./Recommends"
import NewDisney from "./NewDisney"
import Originals from "./Originals"
import Trending from "./Trending"
import { useDispatch, useSelector } from "react-redux"
import { setMovies } from "../features/movie/movieSlice"
import { selectUserName } from "../features/user/userSlice"
import { getCategorizedMovies } from "../disneyMoviesData"

export default function Home() {
  const dispatch = useDispatch()
  const userName = useSelector(selectUserName)
  const isLoadedRef = useRef(false)

  useEffect(() => {
    let unsubscribe = null

    try {
      unsubscribe = db.collection('movies').onSnapshot(
        (snapshot) => {
          let recommends = []
          let newDisneys = []
          let originals = []
          let trending = []

          snapshot.docs.forEach((doc) => {
            const data = doc.data()
            switch (data.type) {
              case 'recommend':
                recommends.push({ id: doc.id, ...data })
                break
              case 'new':
                newDisneys.push({ id: doc.id, ...data })
                break
              case 'original':
                originals.push({ id: doc.id, ...data })
                break
              case 'trending':
                trending.push({ id: doc.id, ...data })
                break
              default:
                break
            }
          })

          if (recommends.length || newDisneys.length || originals.length || trending.length) {
            isLoadedRef.current = true
            dispatch(
              setMovies({
                recommend: recommends,
                newDisney: newDisneys,
                original: originals,
                trending: trending
              })
            )
          } else if (!isLoadedRef.current) {
            const localData = getCategorizedMovies()
            dispatch(setMovies(localData))
          }
        },
        (error) => {
          console.warn("Firestore error reading movies:", error.message)
          if (!isLoadedRef.current) {
            const localData = getCategorizedMovies()
            dispatch(setMovies(localData))
          }
        }
      )
    } catch (err) {
      console.warn("Firestore initialization error:", err)
      const localData = getCategorizedMovies()
      dispatch(setMovies(localData))
    }

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe()
      }
    }
  }, [userName, dispatch])

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <DestinazioneSection />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  )
}

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;
  top: 72px;

  &:before {
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`