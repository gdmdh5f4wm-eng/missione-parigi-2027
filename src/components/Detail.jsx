import styled from "styled-components"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import db from "../firebase"



export default function Detail() {
  const { id } = useParams()
  const [detailData, setDetailData] = useState({})

  useEffect(() => {
    db.collection('movies').doc(id).get().then((doc)=> {
      if (doc.exists) {
        setDetailData(doc.data())
      } else {
        console.log("no such document in firebase")
      }
    }).catch((error) => {
      console.log('error getting document:', error)
    })
  }, [id])
  
  return (
    <Container>
      <Background>
        <img src={detailData.backgroundImg} alt={detailData.title} />
      </Background>
      <ImageTitle>
        <img src={detailData.titleImg} alt={detailData.title} />
      </ImageTitle>
      <Controls>
        <PlayButton>
          <img src="/images/play-icon-black.png" />
          <span>PLAY</span>
        </PlayButton>
        <TrailerButton>
          <img src="/images/play-icon-white.png" />
          <span>Trailer</span>
        </TrailerButton>
        <AddButton>
          <span>+</span>
        </AddButton>
        <GroupWatchButton>
          <img src="/images/group-icon.png" />
        </GroupWatchButton>
      </Controls>
      <SubTitle>
        {detailData.subtitle}
      </SubTitle>
      <Description>
        {detailData.description}
      </Description>
    </Container>
  )
}


const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  max-height: 100vh;
  overflow-y: hidden;

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
  margin-top: 130px;
  margin-bottom: 50px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;

  }
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
`
