import React, { useEffect, useCallback } from "react"
import styled from "styled-components"
import { auth, provider } from "../firebase"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState } from "../features/user/userSlice"

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector(selectUserName)
  const userPhoto = useSelector(selectUserPhoto)

  const setUser = useCallback((user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName || "Disney Fan",
        email: user.email || "user@disney.plus",
        photo: user.photoURL || "/images/group-icon.png",
      })
    )
  }, [dispatch])

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user)
          navigate("/home")
        })
        .catch((error) => {
          console.warn("Auth info:", error.message)
          setUser({
            displayName: "Disney Guest",
            email: "guest@disney.plus",
            photoURL: "/images/group-icon.png",
          })
          navigate("/home")
        })
    } else {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState())
          navigate("/")
        })
        .catch((err) => {
          console.warn("Sign out:", err.message)
          dispatch(setSignOutState())
          navigate("/")
        })
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
        navigate("/home")
      }
    })
    return () => {
      if (typeof unsubscribe === "function") unsubscribe()
    }
  }, [setUser, navigate])

  return (
    <Nav>
      <LogoLink to={userName ? "/home" : "/"}>
        <Logo src="/images/logo.svg" alt="Disney+" />
      </LogoLink>

      {!userName ? (
        <Login onClick={handleAuth}>Accedi</Login>
      ) : (
        <>
          <NavMenu>
            <Link to="/home">
              <img src="/images/home-icon.svg" alt="Home" />
              <span>HOME</span>
            </Link>
            <Link to="/home">
              <img src="/images/search-icon.svg" alt="Cerca" />
              <span>CERCA</span>
            </Link>
            <Link to="/home">
              <img src="/images/watchlist-icon.svg" alt="La mia lista" />
              <span>LA MIA LISTA</span>
            </Link>
            <Link to="/home">
              <img src="/images/original-icon.svg" alt="Originali" />
              <span>ORIGINALI</span>
            </Link>
            <Link to="/home">
              <img src="/images/movie-icon.svg" alt="Film" />
              <span>FILM</span>
            </Link>
            <Link to="/home">
              <img src="/images/series-icon.svg" alt="Serie" />
              <span>SERIE</span>
            </Link>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto || "/images/group-icon.png"} alt={userName || "Utente"} />
            <Dropdown>
              <span onClick={handleAuth}>Disconnetti</span>
            </Dropdown>
          </SignOut>
        </>
      )}
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
`

const LogoLink = styled(Link)`
  display: inline-block;
`

const Logo = styled.img`
  width: 80px;
  display: block;
`

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 40px;
  align-items: center;
  font-weight: bold;
  gap: 18px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    text-decoration: none;
    color: #f9f9f9;

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
  border-radius: 50%;
  object-fit: cover;
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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    ${Dropdown} {
      opacity: 1;
      transition-duration: 300ms;
    }
  }
`