import styled from "styled-components"
import { auth, provider } from "../firebase"
import { useDispatch, useSelector } from "react-redux"
import { navigate, useNavigate } from "react-router-dom"
import { selectUserName, selectUserPhoto, selectUserLoginDetails, setUserLoginDetails, setSignOutState } from "../features/user/userSlice"
import { useEffect } from "react"


export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector(selectUserName)
  const userPhoto = useSelector(selectUserPhoto)

  const handleAuth = () => {
    if (!userName) {auth
    .signInWithPopup(provider)
    .then((result) => {
      setUser(result.user)
    })
      .catch((error) => {
      alert(error.message)
    })
  } else if (userName) {
    auth.signOut().then(() => {
      dispatch(setSignOutState())
      navigate("/")
    }).catch((err) => alert(err.message))
  }
  }
  
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    )
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if(user) {
        setUser(user)
        navigate("/home")
      }
    })
  }, [userName])

  return (
    <Nav>
      <Logo src="/images/logo.svg"/>

      {
        !userName ? (<Login onClick={handleAuth}>Login</Login>) : (
        <>
      <NavMenu>
        <a>
          <img src="images/home-icon.svg" />
          <span>HOME</span>
        </a>
        <a>
          <img src="images/search-icon.svg" />
          <span>SEARCH</span>
        </a>
        <a>
          <img src="images/watchlist-icon.svg" />
          <span>WATCHLIST</span>
        </a>
        <a>
          <img src="images/original-icon.svg" />
          <span>ORIGINALS</span>
        </a>
        <a>
          <img src="images/movie-icon.svg" />
          <span>MOVIES</span>
        </a>
        <a>
          <img src="images/series-icon.svg" />
          <span>SERIES</span>
        </a>

        
      </NavMenu>
      <SignOut>
        <UserImg src={userPhoto} alt={userName}/>
        <Dropdown>
          <span onClick={handleAuth}>Sign out</span>
        </Dropdown>
      </SignOut>
      </>
        )}
      {/* <LoginBtn onClick={handleAuth}> login </LoginBtn> */}
    </Nav>
  )
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;



  // display: flex;
  // align-items: center;
  // padding: 0 36px;
  // height: 70px;
  // background: #090b13;
  // color: white;
  // overflow-x: hidden;
  // justify-content: space-between;
  // z-index: 3;
`
const Logo = styled.img`
  width: 80px;
`
const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 40px;
  align-items: center;
  font-weight: bold;
  font-smooth: always;
  gap: 18px;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
      margin-right: 10px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;
      
      @media (max-width: 768px) {
  display: none;
}
        &:after {
          content: "";
          height: 2px;
          background: white;
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left center;
          transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        }

        
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
  gap: 5px;
}
  }


`

const UserImg = styled.img`
  height: 100%;
  width: 100%;
  cursor: pointer;
  justify-content: flex-end;
`


const Login = styled.a`
background-color: rgba(0, 0, 0, 0.6);
padding: 8px 16px;
text-transform: uppercase;
letter-spacing: 1.5px;
border: 1px solid #f9f9f9;
border-radius: 4px;
transition: all 200ms ease 0s;
cursor: pointer;
&:hover {
  background-color: #f9f9f9;
  color: #000;
  border-color: transparent;
}
`

const Dropdown = styled.div`
position: absolute;
top: 48px;
right: 0px;
background: rgb(19, 19, 19);
border: 1px solid rgba(151, 151, 151, 0.34);
border-radius: 4px;
box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
padding: 10px;
font-size: 14px;
letter-spacing: 2px;
width: 100px;
opacity: 0;
transition: all 250ms;


`

const SignOut = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  // display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
  ${Dropdown} {
      opacity: 1;
      transition-duration: 1s;
  }
}
`