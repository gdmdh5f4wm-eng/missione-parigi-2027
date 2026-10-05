import React, { useState } from 'react'
import styled, { keyframes, css } from "styled-components"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUserLoginDetails } from "../features/user/userSlice"

const ERROR_MESSAGES = [
  "Nope. 😂",
  "Riprova, agente.",
  "Accesso negato. Hai una seconda possibilità. 😏"
]

export default function Login() {
  const [nome, setNome] = useState("")
  const [cognome, setCognome] = useState("")
  const [data, setData] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [sequenceStep, setSequenceStep] = useState(0)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isValidDate = (value) => {
    const clean = value.trim()
    // Accetta 02/02/2009, 02022009 e formati equivalenti
    if (clean === "02022009") return true
    return /^0?2[/\-.]0?2[/\-.]2009$/.test(clean)
  }

  const handleDateChange = (e) => {
    const inputValue = e.target.value

    // Gestione backspace quando si cancella uno slash
    if (data.endsWith('/') && inputValue.length === data.length - 1) {
      setData(inputValue.slice(0, -1))
      if (errorMessage) setErrorMessage("")
      return
    }

    // Accetta esclusivamente numeri, massimo 8 cifre numeriche
    const digits = inputValue.replace(/\D/g, '').slice(0, 8)

    let formatted = ''
    if (digits.length > 0) {
      if (digits.length < 2) {
        formatted = digits
      } else if (digits.length === 2) {
        formatted = `${digits}/`
      } else if (digits.length < 4) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`
      } else if (digits.length === 4) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2)}/`
      } else {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
      }
    }

    setData(formatted)
    if (errorMessage) setErrorMessage("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isValidDate(data)) {
      const randomMsg = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]
      setErrorMessage(randomMsg)
      setIsShaking(true)
      setTimeout(() => {
        setIsShaking(false)
      }, 500)
      return
    }

    // Accesso valido: avvio sequenza cinematografica
    setErrorMessage("")
    setIsSuccess(true)
    setSequenceStep(1)

    setTimeout(() => {
      setSequenceStep(2)
    }, 1200)

    setTimeout(() => {
      setSequenceStep(3)
    }, 2400)

    setTimeout(() => {
      // Accesso in memoria tramite Redux
      const displayName = nome.trim() ? nome.trim() : "Sabrina"
      dispatch(
        setUserLoginDetails({
          name: displayName,
          email: "agente@riservato.auth",
          photo: "/images/group-icon.png",
        })
      )
      navigate("/home")
    }, 4000)
  }

  return (
    <Container>
      <CTA>
        <CTALogoOne src="/images/cta-logo-one.svg" alt="Disney+ Bundle" />

        {isSuccess ? (
          <CinematicCard>
            <StatusBadge>PROTOCOLLO ATTIVO</StatusBadge>

            {sequenceStep >= 1 && (
              <CinematicMessage delay="0s">
                ACCESSO CONCESSO.
              </CinematicMessage>
            )}

            {sequenceStep >= 2 && (
              <CinematicMessage delay="0s" accent>
                MISSIONE SBLOCCATA.
              </CinematicMessage>
            )}

            {sequenceStep >= 3 && (
              <CinematicMessage delay="0s" highlight>
                Sabrina, sei ufficialmente autorizzata.
              </CinematicMessage>
            )}

            <ProgressTrack>
              <ProgressBar />
            </ProgressTrack>
          </CinematicCard>
        ) : (
          <FormWrapper isShaking={isShaking} onSubmit={handleSubmit} noValidate>
            <TitleBadge>ACCESSO RISERVATO</TitleBadge>
            <Subtitle>Inserisci le credenziali operative per proseguire</Subtitle>

            <FieldGroup>
              <Label htmlFor="field-nome">NOME</Label>
              <Input
                id="field-nome"
                type="text"
                placeholder="Inserisci il nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="off"
              />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="field-cognome">COGNOME</Label>
              <Input
                id="field-cognome"
                type="text"
                placeholder="Inserisci il cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                autoComplete="off"
              />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="field-data">DATA DI NASCITA</Label>
              <Input
                id="field-data"
                type="text"
                inputMode="numeric"
                maxLength={10}
                placeholder="GG/MM/AAAA"
                value={data}
                onChange={handleDateChange}
                autoComplete="off"
              />
            </FieldGroup>

            {errorMessage && (
              <ErrorBox>
                <span>{errorMessage}</span>
              </ErrorBox>
            )}

            <SubmitButton type="submit">
              CONFERMA ACCESSO
            </SubmitButton>

            <SecurityNote>
              Autenticazione richiesta per la consultazione del fascicolo riservato.
            </SecurityNote>
          </FormWrapper>
        )}

        <CTALogoTwo src="/images/cta-logo-two.png" alt="Dispositivi disponibili" />
      </CTA>
    </Container>
  )
}

const shakeKeyframes = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  15%, 45%, 75% { transform: translate3d(-10px, 0, 0); }
  30%, 60%, 90% { transform: translate3d(10px, 0, 0); }
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const progressFill = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`

const Container = styled.div`
  position: relative;
  min-height: calc(100vh + 70px);
  display: flex;
  align-items: top;
  justify-content: center;

  &:before {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-image: url("/images/login-background.jpg");
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.7;
  }
`

const CTA = styled.div`
  max-width: 650px;
  padding: 80px 40px;
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
`

const CTALogoOne = styled.img`
  width: 100%;
  margin-bottom: 24px;
`

const FormWrapper = styled.form`
  width: 100%;
  background: rgba(14, 18, 30, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 32px 28px;
  margin-bottom: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  transition: border-color 200ms;

  ${({ isShaking }) =>
    isShaking &&
    css`
      animation: ${shakeKeyframes} 0.5s ease-in-out;
      border-color: rgba(239, 68, 68, 0.6);
    `}
`

const TitleBadge = styled.h2`
  color: #f9f9f9;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 3px;
  text-align: center;
  margin: 0 0 6px 0;
  text-transform: uppercase;
`

const Subtitle = styled.p`
  color: #a0aec0;
  font-size: 13px;
  letter-spacing: 1.2px;
  text-align: center;
  margin: 0 0 24px 0;
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
`

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.8px;
  color: #cbd5e0;
  margin-bottom: 6px;
  text-transform: uppercase;
`

const Input = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 13px 16px;
  color: #ffffff;
  font-size: 15px;
  letter-spacing: 1px;
  outline: none;
  transition: all 250ms ease;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.35);
    font-size: 13px;
  }

  &:focus {
    border-color: #0063e5;
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 10px rgba(0, 99, 229, 0.5);
  }
`

const ErrorBox = styled.div`
  background: rgba(220, 38, 38, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.6);
  border-radius: 4px;
  padding: 12px 14px;
  margin-bottom: 16px;
  text-align: center;
  color: #fca5a5;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  animation: ${fadeIn} 250ms ease-out;
`

const SubmitButton = styled.button`
  width: 100%;
  background-color: #0063e5;
  font-weight: bold;
  padding: 17px 0;
  color: #f9f9f9;
  border-radius: 4px;
  text-align: center;
  font-size: 17px;
  cursor: pointer;
  transition: all 250ms;
  letter-spacing: 1.5px;
  margin-top: 8px;
  margin-bottom: 12px;
  border: none;
  text-transform: uppercase;

  &:hover {
    background-color: #0483ee;
    box-shadow: 0 0 18px rgba(4, 131, 238, 0.5);
  }

  &:active {
    transform: scale(0.99);
  }
`

const SecurityNote = styled.p`
  font-size: 11px;
  letter-spacing: 1.2px;
  text-align: center;
  color: #718096;
  line-height: 1.5;
  margin: 0;
`

const CinematicCard = styled.div`
  width: 100%;
  background: rgba(9, 12, 22, 0.9);
  border: 1px solid rgba(34, 197, 94, 0.4);
  border-radius: 8px;
  padding: 42px 28px;
  margin-bottom: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(34, 197, 94, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const StatusBadge = styled.div`
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.4);
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 24px;
  text-transform: uppercase;
`

const CinematicMessage = styled.div`
  font-size: ${({ highlight }) => (highlight ? "22px" : "20px")};
  font-weight: 700;
  letter-spacing: 2.5px;
  margin-bottom: 16px;
  line-height: 1.4;
  animation: ${fadeIn} 400ms ease-out forwards;
  animation-delay: ${({ delay }) => delay || "0s"};
  color: ${({ accent, highlight }) =>
    highlight ? "#60a5fa" : accent ? "#a78bfa" : "#4ade80"};
  text-shadow: 0 0 16px
    ${({ accent, highlight }) =>
      highlight
        ? "rgba(96, 165, 250, 0.6)"
        : accent
        ? "rgba(167, 139, 250, 0.6)"
        : "rgba(74, 222, 128, 0.6)"};
`

const ProgressTrack = styled.div`
  width: 80%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 24px;
`

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #3b82f6);
  border-radius: 2px;
  animation: ${progressFill} 3.8s linear forwards;
`

const CTALogoTwo = styled.img`
  width: 90%;
`