import styled from "styled-components"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fallbackMovies } from "../disneyMoviesData"

export default function Detail() {
  const { id } = useParams()
  const [detailData, setDetailData] = useState({})

  useEffect(() => {
    if (id === "bagaglio-a-mano") {
      setDetailData({
        id: "bagaglio-a-mano",
        title: "BAGAGLIO A MANO",
        subtitle: "TUTTO QUELLO CHE DOBBIAMO SAPERE PRIMA DI PARTIRE"
      })
      return
    }

    if (id === "premier-access") {
      setDetailData({
        id: "premier-access",
        title: "PREMIER ACCESS ULTIMATE",
        subtitle: "MASSIMA LIBERTÀ"
      })
      return
    }

    if (id === "documenti") {
      setDetailData({
        id: "documenti",
        title: "DOCUMENTI",
        subtitle: "TUTTO QUELLO CHE DOBBIAMO AVERE PRIMA DI PARTIRE"
      })
      return
    }

    if (id === "metro-rer") {
      setDetailData({
        id: "metro-rer",
        title: "COME CI MUOVEREMO A PARIGI",
        subtitle: "METRO, RER E IL NOSTRO VIAGGIO VERSO DISNEYLAND"
      })
      return
    }

    if (id === "power-bank") {
      setDetailData({
        id: "power-bank",
        title: "POWER BANK",
        subtitle: "QUELLO CHE DOBBIAMO SAPERE PRIMA DI SALIRE A BORDO"
      })
      return
    }

    const fallback = fallbackMovies.find((m) => m.id === id)
    if (fallback) {
      setDetailData(fallback)
    }
  }, [id])

  // Layout dedicato informativo per BAGAGLIO A MANO
  if (id === "bagaglio-a-mano") {
    return (
      <BaggageContainer>
        <BaggageBackground />

        <BaggageContent>
          <BaggageNavRow>
            <BackLink to="/home">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>TORNA ALLA HOME</span>
            </BackLink>
          </BaggageNavRow>

          <BaggageHero>
            <CategoryBadge>GUIDA AL VIAGGIO • VOLO</CategoryBadge>
            <BaggageTitle>BAGAGLIO A MANO</BaggageTitle>
            <BaggageSubtitle>
              TUTTO QUELLO CHE DOBBIAMO SAPERE PRIMA DI PARTIRE
            </BaggageSubtitle>
          </BaggageHero>

          {/* SEZIONE 1: ITA AIRWAYS */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>COMPAGNIA AEREA</SectionBadge>
              <SectionTitle>ITA AIRWAYS</SectionTitle>
              <SectionLead>
                Dimensioni, pesi e regole ufficiali previste da ITA Airways per i passeggeri in cabina.
              </SectionLead>
            </SectionHeader>

            <CardsGrid>
              {/* Card 1: Bagaglio a mano principale */}
              <RuleCard>
                <CardTopTag>BAGAGLIO PRINCIPALE</CardTopTag>
                <CardMainValue>55 × 35 × 25 cm</CardMainValue>
                <RuleList>
                  <RuleItem>
                    <RuleLabel>Dimensioni massime</RuleLabel>
                    <RuleValue>
                      <strong>55 cm</strong> (altezza) × <strong>35 cm</strong> (larghezza) × <strong>25 cm</strong> (spessore), incluse maniglie, tasche laterali e ruote.
                    </RuleValue>
                  </RuleItem>
                  <RuleItem>
                    <RuleLabel>Peso massimo consentito</RuleLabel>
                    <RuleValue>
                      <strong>8 kg</strong> massimi per il trolley/borsone principale.
                    </RuleValue>
                  </RuleItem>
                  <RuleItem>
                    <RuleLabel>Dove riporlo a bordo</RuleLabel>
                    <RuleValue>
                      Esclusivamente nella <strong>cappelliera</strong> (vano portabagagli sopra i sedili).
                    </RuleValue>
                  </RuleItem>
                </RuleList>
              </RuleCard>

              {/* Card 2: Articolo personale */}
              <RuleCard>
                <CardTopTag>ARTICOLO PERSONALE</CardTopTag>
                <CardMainValue>45 × 36 × 20 cm</CardMainValue>
                <RuleList>
                  <RuleItem>
                    <RuleLabel>Accessorio consentito</RuleLabel>
                    <RuleValue>
                      <strong>1 articolo personale aggiuntivo</strong> a scelta tra zainetto, borsa da donna o borsa per computer portatile.
                    </RuleValue>
                  </RuleItem>
                  <RuleItem>
                    <RuleLabel>Dimensioni massime</RuleLabel>
                    <RuleValue>
                      <strong>45 cm</strong> (altezza) × <strong>36 cm</strong> (larghezza) × <strong>20 cm</strong> (spessore).
                    </RuleValue>
                  </RuleItem>
                  <RuleItem>
                    <RuleLabel>Dove riporlo a bordo</RuleLabel>
                    <RuleValue>
                      Obbligatoriamente <strong>sotto il sedile di fronte</strong> al proprio posto (ad eccezione delle file uscite di emergenza).
                    </RuleValue>
                  </RuleItem>
                </RuleList>
              </RuleCard>
            </CardsGrid>

            {/* Regole importanti per il volo */}
            <HighlightCard>
              <HighlightTitle>REGOLE IMPORTANTI PER IL NOSTRO VOLO</HighlightTitle>
              <HighlightGrid>
                <HighlightItem>
                  <HighlightIcon>🧴</HighlightIcon>
                  <HighlightBody>
                    <strong>Liquidi e cosmetici in cabina:</strong> flaconi con capienza massima di <strong>100 ml</strong> ciascuno, inseriti in un sacchetto di plastica trasparente richiudibile di capienza non superiore a <strong>1 litro</strong> (circa 18 × 20 cm), da presentare separatamente ai controlli.
                  </HighlightBody>
                </HighlightItem>

                <HighlightItem>
                  <HighlightIcon>🔋</HighlightIcon>
                  <HighlightBody>
                    <strong>Dispositivi elettronici e Powerbank:</strong> batterie di ricambio al litio e powerbank devono viaggiare <strong>esclusivamente nel bagaglio a mano / personale</strong>, mai imbarcati in stiva per norme di sicurezza aerea.
                  </HighlightBody>
                </HighlightItem>

                <HighlightItem>
                  <HighlightIcon>✂️</HighlightIcon>
                  <HighlightBody>
                    <strong>Oggetti vietati:</strong> forbici con lame superiori a 6 cm, taglierini, oggetti appuntiti o sostanze infiammabili sono rigorosamente proibiti a bordo.
                  </HighlightBody>
                </HighlightItem>

                <HighlightItem>
                  <HighlightIcon>🏷️</HighlightIcon>
                  <HighlightBody>
                    <strong>Etichettatura:</strong> applicare sempre un'etichetta bagaglio esterna con nome, cognome e recapito telefonico su ogni collo.
                  </HighlightBody>
                </HighlightItem>
              </HighlightGrid>
            </HighlightCard>
          </BaggageSection>

          {/* SEZIONE 2: PER IL NOSTRO VIAGGIO */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>CONSIGLI PRATICI</SectionBadge>
              <SectionTitle>PER IL NOSTRO VIAGGIO</SectionTitle>
            </SectionHeader>

            <ExperienceCard>
              <p>
                Per il nostro volo verso Parigi con ITA Airways, dobbiamo rispettare con attenzione i limiti di peso (<strong>8 kg</strong>) e dimensioni del trolley, così da salire a bordo con assoluta tranquillità e senza intoppi ai controlli.
              </p>
              <p>
                Nel preparare i bagagli, consideriamo attentamente anche lo <strong>zaino / accessorio personale</strong>:
                il trolley sarà dedicato ai vestiti e a tutto ciò che ci servirà una volta arrivati a Parigi, mentre nello zainetto terremo tutto ciò che vogliamo avere sempre a portata di mano durante il volo (documenti, smartphone, cuffie, caricabatterie e una felpa leggera per l'aria condizionata dell'aereo).
              </p>
            </ExperienceCard>
          </BaggageSection>

          {/* SEZIONE 3: DA RICORDARE */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>CHECKLIST</SectionBadge>
              <SectionTitle>DA RICORDARE</SectionTitle>
            </SectionHeader>

            <ChecklistGrid>
              <ChecklistCard>
                <ChecklistHeader>
                  <ChecklistDot />
                  <span>Documenti a portata di mano</span>
                </ChecklistHeader>
                <ChecklistText>
                  Carta d'identità valida per l'espatrio e carte d'imbarco sempre pronte nello zaino o nella borsa personale, facili da mostrare al gate e ai varchi.
                </ChecklistText>
              </ChecklistCard>

              <ChecklistCard>
                <ChecklistHeader>
                  <ChecklistDot />
                  <span>Bustina liquidi già pronta</span>
                </ChecklistHeader>
                <ChecklistText>
                  Flaconi entro i 100 ml raggruppati nel sacchetto trasparente da 1L, posizionati in una tasca comoda per essere estratti rapidamente al nastro di sicurezza.
                </ChecklistText>
              </ChecklistCard>

              <ChecklistCard>
                <ChecklistHeader>
                  <ChecklistDot />
                  <span>Elettronica facile da estrarre</span>
                </ChecklistHeader>
                <ChecklistText>
                  Laptop, tablet e powerbank pronti da tirare fuori durante il passaggio dei controlli aeroportuali.
                </ChecklistText>
              </ChecklistCard>

              <ChecklistCard>
                <ChecklistHeader>
                  <ChecklistDot />
                  <span>Controllo del peso a casa</span>
                </ChecklistHeader>
                <ChecklistText>
                  Pesare la valigia prima di partire per verificare di essere comodamente sotto gli 8 kg massimi previsti da ITA Airways.
                </ChecklistText>
              </ChecklistCard>
            </ChecklistGrid>
          </BaggageSection>

          {/* Ritorno alla Home */}
          <BottomNavRow>
            <BottomHomeBtn to="/home">
              <span>TORNA ALLA HOME</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </BottomHomeBtn>
          </BottomNavRow>
        </BaggageContent>
      </BaggageContainer>
    )
  }

  // Layout dedicato per DISNEY PREMIER ACCESS ULTIMATE
  if (id === "premier-access") {
    return (
      <BaggageContainer>
        <BaggageBackground />

        <BaggageContent>
          <BaggageNavRow>
            <BackLink to="/home">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>TORNA ALLA HOME</span>
            </BackLink>
          </BaggageNavRow>

          <BaggageHero>
            <CategoryBadge>DISNEYLAND PARIS</CategoryBadge>
            <BaggageTitle>PREMIER ACCESS ULTIMATE</BaggageTitle>
            <BaggageSubtitle>MASSIMA LIBERTÀ</BaggageSubtitle>
          </BaggageHero>

          {/* I TRE BLOCCHI INFORMATIVI DISTINTI */}
          <UltimateGrid>
            {/* Blocco 1: Cosa permette */}
            <UltimateCard>
              <UltimateCardTitle>Cosa permette</UltimateCardTitle>
              <UltimateCardText>
                1 utilizzo della corsia rapida per ciascuna delle attrazioni idonee e disponibili in entrambi i Parchi.
              </UltimateCardText>
            </UltimateCard>

            {/* Blocco 2: Flessibilità oraria */}
            <UltimateCard>
              <UltimateCardTitle>Flessibilità oraria</UltimateCardTitle>
              <UltimateCardText>
                Nessuna fascia oraria prefissata: puoi presentarti alle attrazioni quando preferisci nel corso della giornata.
              </UltimateCardText>
            </UltimateCard>

            {/* Blocco 3: Esperienza */}
            <UltimateCard>
              <UltimateCardTitle>Esperienza</UltimateCardTitle>
              <UltimateCardText>
                Ideale per vivere la giornata con la massima serenità, senza guardare continuamente l'orologio.
              </UltimateCardText>
            </UltimateCard>
          </UltimateGrid>

          {/* Piccola nota discreta */}
          <DiscreetNotice>
            La corsia Premier Access riduce l'attesa, ma non garantisce l'accesso immediato all'attrazione.
          </DiscreetNotice>

          {/* SEZIONE: COLLEGAMENTO AL NOSTRO VIAGGIO */}
          <EmotionalSection>
            <EmotionalDate>02 LUGLIO 2027</EmotionalDate>
            <EmotionalQuote>
              OGGI LA FILA LA SALTIAMO.
              <br />
              LA GIORNATA NO. ✨
            </EmotionalQuote>
          </EmotionalSection>

          {/* CHIUSURA */}
          <ClosingBox>
            <ClosingTitleSmall>PREMIER ACCESS ULTIMATE</ClosingTitleSmall>
            <ClosingText>IL 2 LUGLIO CE LO GODIAMO TUTTO. ❤️</ClosingText>
          </ClosingBox>

          {/* Ritorno alla Home */}
          <BottomNavRow>
            <BottomHomeBtn to="/home">
              <span>TORNA ALLA HOME</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </BottomHomeBtn>
          </BottomNavRow>
        </BaggageContent>
      </BaggageContainer>
    )
  }

  // Layout dedicato per DOCUMENTI
  if (id === "documenti") {
    return (
      <BaggageContainer>
        <BaggageBackground />

        <BaggageContent>
          <BaggageNavRow>
            <BackLink to="/home">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>TORNA ALLA HOME</span>
            </BackLink>
          </BaggageNavRow>

          <BaggageHero>
            <CategoryBadge>VIAGGIO A PARIGI • 01 — 05 LUGLIO 2027</CategoryBadge>
            <BaggageTitle>DOCUMENTI</BaggageTitle>
            <BaggageSubtitle>
              TUTTO QUELLO CHE DOBBIAMO AVERE PRIMA DI PARTIRE
            </BaggageSubtitle>
          </BaggageHero>

          {/* 1. DOCUMENTO DI IDENTITÀ */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>REQUISITI DI VIAGGIO</SectionBadge>
              <SectionTitle>DOCUMENTO DI IDENTITÀ</SectionTitle>
              <SectionLead>
                Regole ufficiali per l'ingresso in Francia da cittadini italiani (Unione Europea / Area Schengen).
              </SectionLead>
            </SectionHeader>

            <DocCard>
              <DocCardTop>DOCUMENTO RICHIESTO</DocCardTop>
              <DocCardTitle>CARTA D'IDENTITÀ VALIDA PER L'ESPATRIO</DocCardTitle>
              <DocCardText>
                Per il nostro viaggio in Francia è obbligatorio viaggiare con la <strong>carta d'identità valida per l'espatrio</strong> in corso di validità.
              </DocCardText>
              <DocCardText>
                Il documento deve essere valido per tutta la durata del soggiorno (dal <strong>1° al 5 luglio 2027</strong>).
              </DocCardText>
              <DocCardText>
                È fondamentale <strong>controllare la data di scadenza</strong> con largo anticipo rispetto alla partenza e verificare che il documento sia integro e perfettamente leggibile.
              </DocCardText>
              <DocCardText>
                <em>Nota:</em> per i cittadini italiani che viaggiano in Francia il passaporto <strong>non è obbligatorio</strong>, ma chi ne possiede uno valido può utilizzarlo come documento alternativo.
              </DocCardText>
            </DocCard>
          </BaggageSection>

          {/* 2. BIGLIETTI AEREI */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>VOLI ITA AIRWAYS</SectionBadge>
              <SectionTitle>BIGLIETTI AEREI</SectionTitle>
              <SectionLead>
                I dettagli ufficiali dei nostri voli confermati per il viaggio. È consigliabile avere le conferme disponibili sul telefono e una copia accessibile offline.
              </SectionLead>
            </SectionHeader>

            <DocCardsGrid>
              <FlightDocBlock>
                <FlightDateHeader>ANDATA — 01 LUGLIO 2027</FlightDateHeader>
                <FlightLegItem>
                  <FlightCode>AZ1278</FlightCode>
                  <FlightRouteText>Napoli ➔ Milano Linate</FlightRouteText>
                </FlightLegItem>
                <FlightLegItem>
                  <FlightCode>AZ350</FlightCode>
                  <FlightRouteText>Milano Linate ➔ Parigi Orly</FlightRouteText>
                </FlightLegItem>
              </FlightDocBlock>

              <FlightDocBlock>
                <FlightDateHeader>RITORNO — 05 LUGLIO 2027</FlightDateHeader>
                <FlightLegItem>
                  <FlightCode>AZ325</FlightCode>
                  <FlightRouteText>Parigi Charles de Gaulle ➔ Roma Fiumicino</FlightRouteText>
                </FlightLegItem>
                <FlightLegItem>
                  <FlightCode>AZ1267</FlightCode>
                  <FlightRouteText>Roma Fiumicino ➔ Napoli</FlightRouteText>
                </FlightLegItem>
              </FlightDocBlock>
            </DocCardsGrid>
          </BaggageSection>

          {/* 3. CARTA D'IMBARCO */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>CHECK-IN & IMBARCO</SectionBadge>
              <SectionTitle>CARTA D'IMBARCO</SectionTitle>
            </SectionHeader>

            <DocCard>
              <DocCardTop>DIFFERENZA IMPORTANTE</DocCardTop>
              <DocCardTitle>PRENOTAZIONE VS CARTA D'IMBARCO</DocCardTitle>
              <DocCardText>
                <strong>Prenotazione del volo:</strong> è la conferma dell'acquisto dei biglietti, ma da sola non permette di superare i controlli o salire a bordo.
              </DocCardText>
              <DocCardText>
                <strong>Carta d'imbarco (Boarding Pass):</strong> è il documento effettivo con QR code/codice a barre rilasciato dopo aver effettuato il check-in online (aperto generalmente nelle 24–48 ore prima della partenza sul sito o app ITA Airways).
              </DocCardText>
              <DocCardText>
                Ricorda di avere sempre la carta d'imbarco digitale o stampata pronta e disponibile prima di raggiungere il gate.
              </DocCardText>
            </DocCard>
          </BaggageSection>

          {/* 4. DOCUMENTI DELL'ALLOGGIO */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>LA NOSTRA BASE A PARIGI</SectionBadge>
              <SectionTitle>DOCUMENTI DELL'ALLOGGIO</SectionTitle>
            </SectionHeader>

            <DocCard>
              <DocCardTop>MONTMARTRE</DocCardTop>
              <DocCardTitle>84 Rue du Mont-Cenis, 75018 Paris, Francia</DocCardTitle>
              <DocCardText>
                <strong>CHECK-IN:</strong> 01 LUGLIO 2027 — dalle ore 16:00
              </DocCardText>
              <DocCardText>
                <strong>CHECK-OUT:</strong> 05 LUGLIO 2027 — entro le ore 11:00
              </DocCardText>
              <DocCardText>
                È utile conservare sul telefono la conferma della prenotazione con il riepilogo dell'indirizzo e le istruzioni dell'host per l'accesso e la consegna delle chiavi.
              </DocCardText>
            </DocCard>
          </BaggageSection>

          {/* 5. DISNEYLAND */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>GIORNATA MAGICA</SectionBadge>
              <SectionTitle>DISNEYLAND</SectionTitle>
            </SectionHeader>

            <DocCard>
              <DocCardTop>VENERDÌ 02 LUGLIO 2027</DocCardTop>
              <DocCardTitle>BIGLIETTI DEI PARCHI & PREMIER ACCESS</DocCardTitle>
              <DocCardText>
                Per la giornata del <strong>02 luglio 2027</strong> dobbiamo avere a portata di mano i biglietti d'ingresso per entrambi i Parchi (Disneyland Park e Walt Disney Studios).
              </DocCardText>
              <DocCardText>
                Inoltre, assicuriamoci di avere le informazioni e i QR code relativi al <strong>Premier Access Ultimate</strong> sincronizzati sull'app ufficiale Disneyland Paris per accedere comodamente alle corsie rapide delle attrazioni.
              </DocCardText>
            </DocCard>
          </BaggageSection>

          {/* 6. TUTTO SUL TELEFONO */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>PRATICO & DIGITALE</SectionBadge>
              <SectionTitle>TUTTO SUL TELEFONO</SectionTitle>
              <SectionLead>
                Cosa è utile avere salvato e facilmente accessibile sul proprio smartphone:
              </SectionLead>
            </SectionHeader>

            <ChecklistGrid>
              <ChecklistCard>
                <ChecklistHeader>
                  <ChecklistDot />
                  <span>Carte d'imbarco</span>
                </ChecklistHeader>
                <ChecklistText>
                  Salvate in Apple Wallet o scaricate in PDF per i voli di andata e ritorno.
                </ChecklistText>
              </ChecklistCard>

              <ChecklistCard>
                <ChecklistHeader>
                  <ChecklistDot />
                  <span>Prenotazione dell'alloggio</span>
                </ChecklistHeader>
                <ChecklistText>
                  Indirizzo esatto (84 Rue du Mont-Cenis) e istruzioni per il check-in.
                </ChecklistText>
              </ChecklistCard>

              <ChecklistCard>
                <ChecklistHeader>
                  <ChecklistDot />
                  <span>Biglietti Disneyland & Pass</span>
                </ChecklistHeader>
                <ChecklistText>
                  QR code d'ingresso e pass Premier Access collegati all'app ufficiale.
                </ChecklistText>
              </ChecklistCard>

              <ChecklistCard>
                <ChecklistHeader>
                  <ChecklistDot />
                  <span>Informazioni e orari dei voli</span>
                </ChecklistHeader>
                <ChecklistText>
                  Orari aggiornati e notifiche di stato dei voli ITA Airways.
                </ChecklistText>
              </ChecklistCard>
            </ChecklistGrid>

            <NoticeWarning>
              <strong>Attenzione:</strong> i documenti ufficiali necessari (carta d'identità valida per l'espatrio) devono essere <strong>obbligatoriamente portati con sé in originale fisico</strong>. Una foto o una scansione digitale sul telefono non sostituisce in nessun caso il documento originale valido ai controlli aeroportuali e di frontiera.
            </NoticeWarning>
          </BaggageSection>

          {/* 7. CHECKLIST FINALE: PRIMA DI PARTIRE */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>RIASSUNTO PRATICO</SectionBadge>
              <SectionTitle>PRIMA DI PARTIRE</SectionTitle>
            </SectionHeader>

            <VisualChecklist>
              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Carta d'identità valida per l'espatrio</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Biglietti/prenotazioni dei voli</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Carte d'imbarco</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Conferma dell'alloggio</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Biglietti Disneyland</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Premier Access</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Telefono carico</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Copie/accesso offline delle informazioni importanti</CheckText>
              </ChecklistItem>
            </VisualChecklist>
          </BaggageSection>

          {/* 8. CHIUSURA */}
          <ClosingBox>
            <ClosingText>
              DOCUMENTI PRONTI.
              <br />
              ORA MANCA SOLO PARTIRE. 🇫🇷
            </ClosingText>
          </ClosingBox>

          {/* Ritorno alla Home */}
          <BottomNavRow>
            <BottomHomeBtn to="/home">
              <span>TORNA ALLA HOME</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </BottomHomeBtn>
          </BottomNavRow>
        </BaggageContent>
      </BaggageContainer>
    )
  }

  // Layout dedicato per METRO & RER
  if (id === "metro-rer") {
    return (
      <BaggageContainer>
        <BaggageBackground />

        <BaggageContent>
          <BaggageNavRow>
            <BackLink to="/home">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>TORNA ALLA HOME</span>
            </BackLink>
          </BaggageNavRow>

          <BaggageHero>
            <CategoryBadge>TRASPORTI A PARIGI • GUIDA AGLI SPOSTAMENTI</CategoryBadge>
            <BaggageTitle>COME CI MUOVEREMO A PARIGI</BaggageTitle>
            <BaggageSubtitle>
              METRO, RER E IL NOSTRO VIAGGIO VERSO DISNEYLAND
            </BaggageSubtitle>
          </BaggageHero>

          {/* 1. I NOSTRI DATI DI PARTENZA */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>PUNTO DI PARTENZA</SectionBadge>
              <SectionTitle>I NOSTRI DATI DI PARTENZA</SectionTitle>
              <SectionLead>
                La base del nostro soggiorno parigino e le stazioni della metropolitana a servizio del quartiere.
              </SectionLead>
            </SectionHeader>

            <DocCard>
              <DocCardTop>IL NOSTRO ALLOGGIO</DocCardTop>
              <DocCardTitle>84 Rue du Mont-Cenis, 75018 Paris, Francia</DocCardTitle>
              <DocCardText>
                Le stazioni Metro utili nelle vicinanze sono:
              </DocCardText>
              <DocCardText>
                • <strong>Simplon</strong> — Metro Linea 4
                <br />
                • <strong>Jules Joffrin</strong> — Metro Linea 12
                <br />
                • <strong>Porte de Clignancourt</strong> — Metro Linea 4
              </DocCardText>
              <DocCardText>
                La nostra zona è servita principalmente dalle <strong>linee 4 e 12</strong>, che ci collegano in modo rapido e diretto a tutte le principali direttrici e monumenti della città.
              </DocCardText>
            </DocCard>
          </BaggageSection>

          {/* 2. BIGLIETTI E PREZZI */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>TARIFFE ÎLE-DE-FRANCE MOBILITÉS</SectionBadge>
              <SectionTitle>BIGLIETTI E PREZZI</SectionTitle>
              <SectionLead>
                Informazioni ufficiali attualmente pubblicate da Île-de-France Mobilités per la rete di trasporto pubblico.
              </SectionLead>
            </SectionHeader>

            <MetroTable>
              <MetroTableItem>
                <MetroTableItemName>BIGLIETTO SINGOLO (Metro-Treno-RER)</MetroTableItemName>
                <MetroTableItemPrice>€2,55 attualmente</MetroTableItemPrice>
              </MetroTableItem>

              <MetroTableItem>
                <MetroTableItemName>NAVIGO GIORNALIERO (Zone 1-5)</MetroTableItemName>
                <MetroTableItemPrice>€12,30 attualmente</MetroTableItemPrice>
              </MetroTableItem>

              <MetroTableItem>
                <MetroTableItemName>PARIS VISITE (5 Giorni, Tutte le zone)</MetroTableItemName>
                <MetroTableItemPrice>€78,00 attualmente</MetroTableItemPrice>
              </MetroTableItem>
            </MetroTable>

            <DocCardsGrid>
              {/* Biglietto Metro-Treno-RER */}
              <DocCard>
                <DocCardTop>CORSA SINGOLA</DocCardTop>
                <DocCardTitle>BIGLIETTO METRO-TRENO-RER</DocCardTitle>
                <DocCardText>
                  Tariffa ufficiale 2026 attualmente pubblicata: <strong>€2,55 a viaggio</strong>.
                </DocCardText>
                <DocCardText>
                  • Valido per Metro, Treno e RER in tutta l'Île-de-France.
                  <br />
                  • <strong>Sono esclusi gli aeroporti.</strong>
                  <br />
                  • Permette i collegamenti previsti tra Metro, RER e treno entro il periodo di validità.
                  <br />
                  • Può essere utilizzato comodamente tramite smartphone o caricato su tessera Navigo Easy.
                  <br />
                  • <em>Nota:</em> il biglietto Metro-Treno-RER non vale per autobus e tram.
                </DocCardText>
                <TariffDisclaimer>TARIFFA 2026 — DA RICONFERMARE PER LUGLIO 2027</TariffDisclaimer>
              </DocCard>

              {/* Navigo Giornaliero */}
              <DocCard>
                <DocCardTop>PASS GIORNALIERO</DocCardTop>
                <DocCardTitle>NAVIGO GIORNALIERO</DocCardTitle>
                <DocCardText>
                  Tariffa ufficiale 2026 attualmente pubblicata: <strong>€12,30 — tutte le zone</strong>.
                </DocCardText>
                <DocCardText>
                  Consente viaggi illimitati per l'intera giornata nelle zone 1-5 su tutta la rete, ma gli aeroporti sono esclusi.
                </DocCardText>
                <TariffDisclaimer>TARIFFA 2026 — DA RICONFERMARE PER LUGLIO 2027</TariffDisclaimer>
              </DocCard>

              {/* Paris Visite */}
              <DocCard>
                <DocCardTop>PASS TURISTICO 5 GIORNI</DocCardTop>
                <DocCardTitle>PARIS VISITE (5 GIORNI)</DocCardTitle>
                <DocCardText>
                  Tariffa ufficiale 2026 per 5 giorni — tutte le zone: <strong>€78,00</strong>.
                </DocCardText>
                <DocCardText>
                  Comprende viaggi illimitati per 5 giorni consecutivi in tutta l'Île-de-France e include anche i collegamenti con gli aeroporti.
                </DocCardText>
                <TariffDisclaimer>TARIFFA 2026 — DA RICONFERMARE PER LUGLIO 2027</TariffDisclaimer>
              </DocCard>

              {/* Valutazione prudente */}
              <DocCard>
                <DocCardTop>VALUTAZIONE PRUDENTE</DocCardTop>
                <DocCardTitle>QUALE OPZIONE CONVIENE?</DocCardTitle>
                <DocCardText>
                  <strong>Per il nostro viaggio conviene valutare il numero effettivo di spostamenti giornalieri prima di scegliere tra biglietti singoli e pass.</strong>
                </DocCardText>
                <DocCardText>
                  Poiché molte delle nostre visite saranno concentrate a piedi all'interno dei singoli quartieri, definiremo la scelta più conveniente a ridosso della partenza con le tariffe confermate del 2027.
                </DocCardText>
              </DocCard>
            </DocCardsGrid>
          </BaggageSection>

          {/* 3. COME VISITEREMO PARIGI */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>ITINERARI DELLA CITTÀ</SectionBadge>
              <SectionTitle>COME VISITEREMO PARIGI</SectionTitle>
              <SectionLead>
                Le schede pratiche per muoversi dal nostro alloggio a Montmartre verso tutti i luoghi in programma.
              </SectionLead>
            </SectionHeader>

            <CityRoutesGrid>
              {/* Montmartre */}
              <CityRouteCard>
                <CityRouteHeader>1. MONTMARTRE</CityRouteHeader>
                <RouteDetailsList>
                  <DetailRow>
                    <DetailKey>DA CASA</DetailKey>
                    <DetailVal>84 Rue du Mont-Cenis ➔ raggiungere <strong>Jules Joffrin</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>LINEA</DetailKey>
                    <DetailVal><strong>METRO LINEA 12</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>DIREZIONE</DetailKey>
                    <DetailVal>Mairie d'Issy</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>FERMATA</DetailKey>
                    <DetailVal><strong>ABBESSES</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>CAMBI</DetailKey>
                    <DetailVal>Nessun cambio (linea diretta)</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>ULTIMO TRATTO A PIEDI</DetailKey>
                    <DetailVal>Proseguire a piedi verso Place du Tertre e la Basilica del Sacro Cuore (la RATP indica Abbesses come una delle stazioni più vicine a Montmartre).</DetailVal>
                  </DetailRow>
                </RouteDetailsList>
              </CityRouteCard>

              {/* Louvre */}
              <CityRouteCard>
                <CityRouteHeader>2. LOUVRE</CityRouteHeader>
                <RouteDetailsList>
                  <DetailRow>
                    <DetailKey>DA CASA</DetailKey>
                    <DetailVal>84 Rue du Mont-Cenis ➔ raggiungere <strong>Simplon</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>LINEA</DetailKey>
                    <DetailVal><strong>METRO LINEA 4</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>DIREZIONE</DetailKey>
                    <DetailVal>Bagneux-Lucie Aubrac</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>FERMATA</DetailKey>
                    <DetailVal>Châtelet</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>CAMBI</DetailKey>
                    <DetailVal>Cambio con <strong>METRO LINEA 1</strong> (direzione La Défense) fino a <strong>Palais Royal — Musée du Louvre</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>ULTIMO TRATTO A PIEDI</DetailKey>
                    <DetailVal>Accesso diretto alla piramide e al Museo del Louvre (la RATP indica la linea 1 e la stazione Palais Royal come collegamenti direttamente utili per il museo).</DetailVal>
                  </DetailRow>
                </RouteDetailsList>
              </CityRouteCard>

              {/* Giardini delle Tuileries */}
              <CityRouteCard>
                <CityRouteHeader>3. GIARDINI DELLE TUILERIES</CityRouteHeader>
                <RouteDetailsList>
                  <DetailRow>
                    <DetailKey>DA CASA</DetailKey>
                    <DetailVal>84 Rue du Mont-Cenis ➔ <strong>Simplon</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>LINEA</DetailKey>
                    <DetailVal><strong>LINEA 4</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>DIREZIONE</DetailKey>
                    <DetailVal>Bagneux-Lucie Aubrac</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>FERMATA</DetailKey>
                    <DetailVal>Châtelet</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>CAMBI</DetailKey>
                    <DetailVal>Cambio con <strong>LINEA 1</strong> (direzione La Défense) fino a <strong>Tuileries</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>ULTIMO TRATTO A PIEDI</DetailKey>
                    <DetailVal>Ingresso diretto ai viali e alle fontane dei Giardini delle Tuileries.</DetailVal>
                  </DetailRow>
                </RouteDetailsList>
              </CityRouteCard>

              {/* Notre-Dame */}
              <CityRouteCard>
                <CityRouteHeader>4. NOTRE-DAME</CityRouteHeader>
                <RouteDetailsList>
                  <DetailRow>
                    <DetailKey>DA CASA</DetailKey>
                    <DetailVal>84 Rue du Mont-Cenis ➔ <strong>Simplon</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>LINEA</DetailKey>
                    <DetailVal><strong>LINEA 4</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>DIREZIONE</DetailKey>
                    <DetailVal>Bagneux-Lucie Aubrac</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>FERMATA</DetailKey>
                    <DetailVal><strong>Cité</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>CAMBI</DetailKey>
                    <DetailVal>Nessun cambio (linea diretta)</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>ULTIMO TRATTO A PIEDI</DetailKey>
                    <DetailVal>Proseguire a piedi sull'Île de la Cité verso la Cattedrale di Notre-Dame. <em>(Importante: prima del viaggio verificare eventuali lavori o chiusure della linea 4).</em></DetailVal>
                  </DetailRow>
                </RouteDetailsList>
              </CityRouteCard>

              {/* Quartiere Latino */}
              <CityRouteCard>
                <CityRouteHeader>5. QUARTIERE LATINO</CityRouteHeader>
                <RouteDetailsList>
                  <DetailRow>
                    <DetailKey>DA CASA</DetailKey>
                    <DetailVal>84 Rue du Mont-Cenis ➔ <strong>Simplon</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>LINEA</DetailKey>
                    <DetailVal><strong>LINEA 4</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>DIREZIONE</DetailKey>
                    <DetailVal>Bagneux-Lucie Aubrac</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>FERMATA</DetailKey>
                    <DetailVal><strong>Saint-Michel</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>CAMBI</DetailKey>
                    <DetailVal>Nessun cambio (linea diretta)</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>ULTIMO TRATTO A PIEDI</DetailKey>
                    <DetailVal>Accesso immediato ai vicoli storici del Quartiere Latino. <em>(Se Saint-Michel fosse interessata da lavori nel periodo del viaggio, la fermata alternativa comoda è Odéon).</em></DetailVal>
                  </DetailRow>
                </RouteDetailsList>
              </CityRouteCard>

              {/* Senna */}
              <CityRouteCard>
                <CityRouteHeader>6. SENNA</CityRouteHeader>
                <RouteDetailsList>
                  <DetailRow>
                    <DetailKey>MODALITÀ</DetailKey>
                    <DetailVal>Passeggiate a piedi lungo i lungosenna (Quais)</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>COME LA VISITEREMO</DetailKey>
                    <DetailVal>La Senna non è una singola fermata: la visiteremo principalmente <strong>a piedi durante gli spostamenti tra le varie zone centrali di Parigi</strong>, in particolare nella suggestiva area tra Notre-Dame, il Quartiere Latino, il Louvre e le Tuileries.</DetailVal>
                  </DetailRow>
                </RouteDetailsList>
              </CityRouteCard>

              {/* Torre Eiffel */}
              <CityRouteCard style={{ gridColumn: '1 / -1' }}>
                <CityRouteHeader>7. TORRE EIFFEL</CityRouteHeader>
                <RouteDetailsList>
                  <DetailRow>
                    <DetailKey>DA CASA</DetailKey>
                    <DetailVal>84 Rue du Mont-Cenis ➔ <strong>Simplon</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>LINEA</DetailKey>
                    <DetailVal><strong>LINEA 4</strong> ➔ Châtelet ➔ cambio <strong>LINEA 1</strong> (dir. La Défense) fino a <strong>Charles de Gaulle — Étoile</strong> ➔ cambio <strong>LINEA 6</strong> (dir. Nation) fino a <strong>Bir-Hakeim</strong></DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>FERMATA</DetailKey>
                    <DetailVal><strong>Bir-Hakeim</strong> (servita dalla linea 6)</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>CAMBI</DetailKey>
                    <DetailVal>2 cambi rapidi (a Châtelet e ad Charles de Gaulle — Étoile)</DetailVal>
                  </DetailRow>
                  <DetailRow>
                    <DetailKey>ULTIMO TRATTO A PIEDI</DetailKey>
                    <DetailVal>Camminata panoramica attraversando il Pont de Bir-Hakeim o il Campo di Marte fino alla base della Torre Eiffel (la RATP indica Bir-Hakeim sulla linea 6 e Trocadéro sulle linee 6 e 9 come stazioni utili).</DetailVal>
                  </DetailRow>
                </RouteDetailsList>
              </CityRouteCard>
            </CityRoutesGrid>
          </BaggageSection>

          {/* 4. DISNEYLAND PARIS — PARTE PRINCIPALE */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>LA GIORNATA SPECIALE</SectionBadge>
              <SectionTitle>DISNEYLAND PARIS</SectionTitle>
              <SectionLead>
                Tutti i dettagli per il nostro viaggio del 02 Luglio 2027 (1 Giorno · 2 Parchi: Disneyland Park + Walt Disney Studios).
              </SectionLead>
            </SectionHeader>

            <DisneylandFeatureBox>
              <DocCardTop>DESTINAZIONE FINALE</DocCardTop>
              <DocCardTitle>MARNE-LA-VALLÉE — CHESSY</DocCardTitle>
              <DocCardText>
                Disneyland Paris indica ufficialmente <strong>Marne-la-Vallée / Chessy</strong> come la fermata del treno più vicina ai Parchi, situata a circa <strong>2 minuti a piedi</strong> dai tornelli d'ingresso.
              </DocCardText>
              <DocCardText>
                <em>Attenzione:</em> non scendere a Val d'Europe! La fermata corretta e capolinea dei Parchi è esclusivamente <strong>MARNE-LA-VALLÉE — CHESSY</strong>.
              </DocCardText>

              {/* PERCORSO DETTAGLIATO */}
              <div style={{ marginTop: '24px' }}>
                <DetailKey>IL NOSTRO PERCORSO PRINCIPALE</DetailKey>
                <DocCardText style={{ marginTop: '8px' }}>
                  <strong>84 Rue du Mont-Cenis</strong>
                  <br />↓ raggiungere <strong>Simplon</strong>
                  <br />↓ <strong>METRO LINEA 4</strong> (direzione Bagneux-Lucie Aubrac)
                  <br />↓ scendere a <strong>Châtelet</strong>
                  <br />↓ seguire le indicazioni interne della stazione per il <strong>RER A</strong>
                  <br />↓ prendere il <strong>RER A verso Marne-la-Vallée — Chessy</strong>
                  <br />↓ scendere al capolinea: <strong>MARNE-LA-VALLÉE — CHESSY</strong>
                  <br />↓ seguire le uscite verso <strong>Parcs Disneyland</strong>
                  <br />↓ circa <strong>2 minuti a piedi</strong>
                  <br />↓ <strong>DISNEYLAND PARIS ✨</strong>
                </DocCardText>
              </div>

              {/* CAMBI PER DISNEYLAND */}
              <div style={{ marginTop: '24px' }}>
                <DetailKey>I CAMBI DEL PERCORSO</DetailKey>
                <DocCardText style={{ marginTop: '8px' }}>
                  <strong>CAMBIO 1:</strong> Dalla Metro Linea 4 si scende a <strong>Châtelet</strong> e si segue il raccordo pedonale per il <strong>RER A</strong>.
                  <br />
                  <strong>CAMBIO 2:</strong> <em>Nessun ulteriore cambio ferroviario.</em> Da Châtelet si sale direttamente a bordo del <strong>RER A diretto a Marne-la-Vallée — Chessy</strong>.
                </DocCardText>
              </div>

              {/* MAPPA VISIVA */}
              <PathDiagramBox>
                <PathStep>🏠 84 RUE DU MONT-CENIS</PathStep>
                <PathArrow>↓ 🚶 a piedi</PathArrow>
                <PathStep>🚇 SIMPLON (LINEA 4)</PathStep>
                <PathArrow>↓ Metro 4</PathArrow>
                <PathStep>🔄 CHÂTELET (CAMBIO)</PathStep>
                <PathArrow>↓ RER A</PathArrow>
                <PathStep className="highlight">🚆 MARNE-LA-VALLÉE — CHESSY</PathStep>
                <PathArrow>↓ 🚶 ≈ 2 min</PathArrow>
                <PathStep className="highlight">🏰 DISNEYLAND PARIS</PathStep>
              </PathDiagramBox>

              {/* ATTENZIONE ALLA DIREZIONE DELLA RER A */}
              <NoticeWarning>
                <strong>Attenzione alla direzione della RER A:</strong> non basta prendere "la prima RER A" che passa. La linea A verso est si divide in due rami: bisogna sempre verificare sul display del treno e sui monitor di banchina che la destinazione finale sia <strong>MARNE-LA-VALLÉE — CHESSY</strong> (e non Boissy-Saint-Léger). Controllare sempre l'app ufficiale prima di salire.
              </NoticeWarning>

              {/* TEMPI DEL VIAGGIO */}
              <div style={{ marginTop: '24px' }}>
                <DetailKey>TEMPI DEL VIAGGIO</DetailKey>
                <DocCardText style={{ marginTop: '8px' }}>
                  Disneyland Paris indica come riferimento circa <strong>35 minuti di RER A da Parigi</strong>.
                  <br />
                  La durata complessiva del viaggio da casa sarà data da: <strong>Metro + cambio a Châtelet + RER A + camminata finale</strong> (valore indicativo, variabile a seconda dei tempi di attesa e della coincidenza).
                </DocCardText>
              </div>

              {/* ORARI DELLA RER A */}
              <div style={{ marginTop: '20px' }}>
                <DetailKey>ORARI PER IL 2 LUGLIO 2027</DetailKey>
                <DocCardText style={{ marginTop: '8px' }}>
                  <strong>ORARI DA RICONFERMARE PRIMA DELLA PARTENZA:</strong> gli orari definitivi del servizio ferroviario per il 2 luglio 2027 saranno pubblicati a ridosso della stagione. Verificheremo gli orari e la frequenza esatta tramite i canali ufficiali <strong>RATP</strong> e <strong>Île-de-France Mobilités</strong>, controllando anche eventuali cantieri programmati.
                </DocCardText>
              </div>

              {/* IL NOSTRO OBIETTIVO */}
              <div style={{ marginTop: '20px' }}>
                <DetailKey>IL NOSTRO OBIETTIVO</DetailKey>
                <DocCardText style={{ marginTop: '8px' }}>
                  <strong>ARRIVARE A DISNEYLAND CON TEMPO.</strong>
                  <br />
                  Una volta pubblicati gli orari ufficiali di apertura dei due Parchi per il 2 luglio 2027, sceglieremo l'orario di partenza da casa in modo da raggiungere i cancelli con un comodo anticipo per godere appieno della magia sin dal primo minuto.
                </DocCardText>
              </div>

              {/* RITORNO DA DISNEYLAND */}
              <div style={{ marginTop: '20px' }}>
                <DetailKey>RITORNO DA DISNEYLAND</DetailKey>
                <DocCardText style={{ marginTop: '8px' }}>
                  Per il rientro a casa a fine giornata si effettua il percorso inverso:
                  <br />
                  <strong>Marne-la-Vallée — Chessy</strong> ➔ <strong>RER A</strong> (direzione Parigi) ➔ <strong>Châtelet</strong> ➔ cambio con <strong>Metro Linea 4</strong> (direzione Porte de Clignancourt) ➔ <strong>Simplon</strong> ➔ a piedi a <strong>84 Rue du Mont-Cenis</strong>.
                  <br />
                  <em>Prima di lasciare il parco, controlleremo sempre sull'app RATP l'orario dei treni e l'ultimo collegamento utile della serata.</em>
                </DocCardText>
              </div>
            </DisneylandFeatureBox>
          </BaggageSection>

          {/* 5. PRIMA DI SALIRE */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>CHECKLIST SPOSTAMENTI</SectionBadge>
              <SectionTitle>PRIMA DI SALIRE</SectionTitle>
            </SectionHeader>

            <VisualChecklist>
              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Controllare la direzione</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Controllare la destinazione del RER A</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Avere il biglietto pronto</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Controllare eventuali lavori</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Controllare l'app prima del cambio</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Non confondere Val d'Europe con Marne-la-Vallée — Chessy</CheckText>
              </ChecklistItem>
            </VisualChecklist>
          </BaggageSection>

          {/* FONTI */}
          <SourcesNotice>
            INFORMAZIONI DA FONTI UFFICIALI: <strong>Île-de-France Mobilités</strong> · <strong>RATP</strong> · <strong>Disneyland Paris</strong>
          </SourcesNotice>

          {/* CHIUSURA */}
          <ClosingBox>
            <ClosingText>
              PARIGI SI VISITA.
              <br />
              DISNEYLAND SI RAGGIUNGE.
              <br />
              NOI DOBBIAMO SOLO SALIRE SUL TRENO. 🚇✨
            </ClosingText>
          </ClosingBox>

          {/* Ritorno alla Home */}
          <BottomNavRow>
            <BottomHomeBtn to="/home">
              <span>TORNA ALLA HOME</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </BottomHomeBtn>
          </BottomNavRow>
        </BaggageContent>
      </BaggageContainer>
    )
  }

  // Layout dedicato informativo per POWER BANK
  if (id === "power-bank") {
    return (
      <BaggageContainer>
        <BaggageBackground />

        <BaggageContent>
          <BaggageNavRow>
            <BackLink to="/home">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>TORNA ALLA HOME</span>
            </BackLink>
          </BaggageNavRow>

          <BaggageHero>
            <CategoryBadge>DISPOSITIVI ELETTRONICI • VOLO</CategoryBadge>
            <BaggageTitle>POWER BANK</BaggageTitle>
            <BaggageSubtitle>
              QUELLO CHE DOBBIAMO SAPERE PRIMA DI SALIRE A BORDO
            </BaggageSubtitle>
          </BaggageHero>

          {/* 3. LA REGOLA PIÙ IMPORTANTE: SOLO IN CABINA */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>SICUREZZA VOLO</SectionBadge>
              <SectionTitle>SOLO IN CABINA</SectionTitle>
              <SectionLead>
                La regola tassativa dell'aviazione civile internazionale e di ITA Airways per tutte le batterie esterne al litio.
              </SectionLead>
            </SectionHeader>

            <CriticalAlertCard>
              <CriticalBadge>REGOLA FONDAMENTALE</CriticalBadge>
              <CriticalTitle>IL POWER BANK DEVE VIAGGIARE CON NOI IN CABINA</CriticalTitle>
              <CriticalText>
                Il power bank deve essere trasportato esclusivamente nel <strong>bagaglio a mano / in cabina</strong> oppure sulla propria persona.
              </CriticalText>
              <CriticalWarningHighlight>
                🚫 <strong>È SEVERAMENTE VIETATO</strong> trasportare il power bank nel <strong>bagaglio registrato in stiva</strong>.
              </CriticalWarningHighlight>
              <CriticalText style={{ marginTop: '12px', fontSize: '13.5px', color: 'rgba(249, 249, 249, 0.8)' }}>
                Per il nostro viaggio voliamo con <strong>ITA Airways</strong>: le indicazioni di questa guida sono allineate alle regole ufficiali della compagnia e agli standard di sicurezza IATA.
              </CriticalText>
            </CriticalAlertCard>
          </BaggageSection>

          {/* 4. QUANTA CAPACITÀ POSSIAMO PORTARE */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>LIMITI DI ENERGIA</SectionBadge>
              <SectionTitle>QUANTA CAPACITÀ POSSIAMO PORTARE</SectionTitle>
              <SectionLead>
                Le soglie di capacità massima e il numero di dispositivi ammessi a persona secondo ITA Airways.
              </SectionLead>
            </SectionHeader>

            <CardsGrid>
              {/* Card 1: Fino a 100 Wh */}
              <RuleCard>
                <CardTopTag>CAPACITÀ CONSENTITA</CardTopTag>
                <CardMainValue>FINO A 100 Wh</CardMainValue>
                <RuleList>
                  <RuleItem>
                    <RuleLabel>Trasporto in cabina</RuleLabel>
                    <RuleValue>
                      È consentito il trasporto del power bank nel bagaglio a mano senza necessità di autorizzazione preventiva della compagnia.
                    </RuleValue>
                  </RuleItem>
                  <RuleItem>
                    <RuleLabel>Limite quantitativo ITA Airways</RuleLabel>
                    <RuleValue>
                      ITA Airways stabilisce un limite di <strong>massimo 2 power bank per passeggero</strong>.
                    </RuleValue>
                  </RuleItem>
                </RuleList>
              </RuleCard>

              {/* Card 2: Oltre 100 Wh */}
              <RuleCard>
                <CardTopTag>DISPOSITIVI SUPERIORI</CardTopTag>
                <CardMainValue>OLTRE 100 Wh</CardMainValue>
                <RuleList>
                  <RuleItem>
                    <RuleLabel>Regime speciale</RuleLabel>
                    <RuleValue>
                      Un power bank superiore a 100 Wh <strong>non è normalmente consentito</strong>: tra 100 Wh e 160 Wh richiede preventiva approvazione formale della compagnia, mentre sopra i 160 Wh è vietato sui voli passeggeri.
                    </RuleValue>
                  </RuleItem>
                  <RuleItem>
                    <RuleLabel>La nostra scelta sicura</RuleLabel>
                    <RuleValue>
                      Per il nostro viaggio utilizziamo esclusivamente power bank <strong>≤ 100 Wh</strong>: è la soluzione semplice, sicura e conforme al 100%.
                    </RuleValue>
                  </RuleItem>
                </RuleList>
              </RuleCard>
            </CardsGrid>
          </BaggageSection>

          {/* 5. ATTENZIONE AI mAh */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>CONVERSIONE TECNICA</SectionBadge>
              <SectionTitle>ATTENZIONE AI mAh</SectionTitle>
              <SectionLead>
                Sulla confezione e sul corpo del power bank la capacità è solitamente indicata in mAh, ma le regole del volo guardano ai Wattora (Wh).
              </SectionLead>
            </SectionHeader>

            <FormulaBox>
              <FormulaTag>FORMULA DI CONVERSIONE</FormulaTag>
              <FormulaCode>Wh = mAh × V ÷ 1000</FormulaCode>
              <FormulaExplanation>
                Per calcolare i Wattora, moltiplica la capacità in milliampere-ora (mAh) per la tensione nominale della cella (Volt, solitamente 3,7 V) e dividi per 1000.
              </FormulaExplanation>

              <ExamplesGrid>
                <ExampleItem>
                  <ExampleMah>10.000 mAh</ExampleMah>
                  <ExampleVolts>a 3,7 V</ExampleVolts>
                  <ExampleWh>≈ 37 Wh</ExampleWh>
                </ExampleItem>

                <ExampleItem>
                  <ExampleMah>20.000 mAh</ExampleMah>
                  <ExampleVolts>a 3,7 V</ExampleVolts>
                  <ExampleWh>≈ 74 Wh</ExampleWh>
                </ExampleItem>

                <ExampleItem>
                  <ExampleMah>26.800 mAh</ExampleMah>
                  <ExampleVolts>a 3,7 V</ExampleVolts>
                  <ExampleWh>≈ 99,16 Wh</ExampleWh>
                </ExampleItem>
              </ExamplesGrid>

              <NoticeWarning style={{ marginTop: '20px' }}>
                <strong>Attenzione al valore effettivo:</strong> bisogna sempre controllare il valore in Wh o la tensione dichiarata dal produttore e stampata direttamente sulla scocca del power bank. La tensione può variare in base alla composizione chimica della batteria, pertanto due modelli con gli stessi mAh non hanno necessariamente gli stessi Wh.
              </NoticeWarning>
            </FormulaBox>
          </BaggageSection>

          {/* 6. DOVE DOBBIAMO METTERLO: NON NELLA CAPPELLIERA */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>COLLOCAZIONE A BORDO</SectionBadge>
              <SectionTitle>DOVE DOBBIAMO METTERLO</SectionTitle>
              <SectionLead>
                Posizionamento corretto del dispositivo una volta saliti a bordo dell'aeromobile.
              </SectionLead>
            </SectionHeader>

            <OverheadBanCard>
              <OverheadBanTag>POSIZIONAMENTO OBBLIGATORIO</OverheadBanTag>
              <OverheadBanTitle>NON NELLA CAPPELLIERA</OverheadBanTitle>
              <OverheadBanList>
                <OverheadBanItem>
                  <span className="dot">•</span>
                  <span>Il power bank <strong>deve essere in cabina</strong> con noi.</span>
                </OverheadBanItem>
                <OverheadBanItem>
                  <span className="dot">•</span>
                  <span>Può essere tenuto <strong>sulla propria persona</strong> (in tasca o nel marsupio).</span>
                </OverheadBanItem>
                <OverheadBanItem>
                  <span className="dot">•</span>
                  <span>Può essere riposto nello <strong>zainetto / bagaglio a mano</strong>.</span>
                </OverheadBanItem>
                <OverheadBanItem>
                  <span className="dot">•</span>
                  <span>A bordo va collocato <strong>sotto il sedile di fronte</strong> o nella <strong>tasca del sedile</strong>.</span>
                </OverheadBanItem>
                <OverheadBanItem className="prohibited">
                  <span className="dot">✕</span>
                  <span><strong>NON DEVE ESSERE RIPOSTO NELLA CAPPELLIERA</strong> sopra i sedili.</span>
                </OverheadBanItem>
              </OverheadBanList>
              <OverheadReasonNotice>
                Questa specifica regola di ITA Airways garantisce che, in caso di surriscaldamento o anomalia, l'equipaggio possa intervenire tempestivamente senza che la batteria si trovi chiusa in un vano sopraelevato.
              </OverheadReasonNotice>
            </OverheadBanCard>
          </BaggageSection>

          {/* 7. DURANTE IL VOLO: A BORDO */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>UTILIZZO IN VOLO</SectionBadge>
              <SectionTitle>A BORDO</SectionTitle>
              <SectionLead>
                Cosa è consentito e cosa è vietato durante le fasi di volo con ITA Airways.
              </SectionLead>
            </SectionHeader>

            <OnBoardActionGrid>
              <OnBoardActionCard>
                <OnBoardStatusBadge>VIETATO IN VOLO</OnBoardStatusBadge>
                <OnBoardActionTitle>NON UTILIZZARE IL POWER BANK</OnBoardActionTitle>
                <OnBoardActionDesc>
                  È vietato collegare smartphone o altri dispositivi al power bank per alimentarli o ricaricarli durante il volo.
                </OnBoardActionDesc>
              </OnBoardActionCard>

              <OnBoardActionCard>
                <OnBoardStatusBadge>VIETATO IN VOLO</OnBoardStatusBadge>
                <OnBoardActionTitle>NON RICARICARE IL POWER BANK</OnBoardActionTitle>
                <OnBoardActionDesc>
                  È vietato collegare il power bank alle prese USB o di corrente dell'aereo per ricaricarlo durante il viaggio.
                </OnBoardActionDesc>
              </OnBoardActionCard>
            </OnBoardActionGrid>
          </BaggageSection>

          {/* 8. COME TRASPORTARLO: PROTEGGILO */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>PRECAUZIONI</SectionBadge>
              <SectionTitle>PROTEGGILO</SectionTitle>
              <SectionLead>
                Il power bank deve essere protetto con cura da danni accidentali e cortocircuiti.
              </SectionLead>
            </SectionHeader>

            <ProtectionCardsGrid>
              <ProtectionCard>
                <ProtectionCardTitle>CUSTODIA E CONFEZIONE</ProtectionCardTitle>
                <ProtectionCardText>
                  Conservalo nella confezione originale se disponibile, oppure inseriscilo in una <strong>custodia protettiva imbottita</strong> o in una tasca dedicata dello zaino.
                </ProtectionCardText>
              </ProtectionCard>

              <ProtectionCard>
                <ProtectionCardTitle>ISOLA I TERMINALI</ProtectionCardTitle>
                <ProtectionCardText>
                  Evita assolutamente che i terminali o le porte USB entrino in contatto con <strong>oggetti metallici</strong> (chiavi, monete, cerniere, cavi sciolti).
                </ProtectionCardText>
              </ProtectionCard>

              <ProtectionCard>
                <ProtectionCardTitle>STATO DELLA BATTERIA</ProtectionCardTitle>
                <ProtectionCardText>
                  <strong>Non trasportare mai batterie danneggiate</strong>, che abbiano subito urti violenti o che presentino anche il minimo rigonfiamento o perdita.
                </ProtectionCardText>
              </ProtectionCard>
            </ProtectionCardsGrid>
          </BaggageSection>

          {/* 9. PRIMA DI PARTIRE: CHECK PRIMA DEL VOLO */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>CHECKLIST RAPIDA</SectionBadge>
              <SectionTitle>CHECK PRIMA DEL VOLO</SectionTitle>
            </SectionHeader>

            <VisualChecklist>
              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Power bank ≤ 100 Wh</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Massimo 2 power bank a persona</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Power bank nel bagaglio a mano / in cabina</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>NON nella valigia da imbarcare</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>NON nella cappelliera</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Protetto da cortocircuiti</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Non danneggiato e non gonfio</CheckText>
              </ChecklistItem>

              <ChecklistItem>
                <CheckBoxIcon>✓</CheckBoxIcon>
                <CheckText>Pronto per essere tenuto facilmente accessibile</CheckText>
              </ChecklistItem>
            </VisualChecklist>
          </BaggageSection>

          {/* 10. IL NOSTRO VIAGGIO */}
          <BaggageSection>
            <SectionHeader>
              <SectionBadge>LE NOSTRE TRATTE AEREE</SectionBadge>
              <SectionTitle>IL NOSTRO VIAGGIO</SectionTitle>
              <SectionLead>
                La riserva di energia sicura per accompagnare ogni momento dei nostri trasferimenti e delle nostre giornate a Parigi.
              </SectionLead>
            </SectionHeader>

            <DocCard>
              <DocCardTop>I NOSTRI VOLI</DocCardTop>
              <DocCardTitle>NAPOLI → MILANO → PARIGI & PARIGI → ROMA → NAPOLI</DocCardTitle>
              <DocCardText>
                Porteremo il power bank con noi durante tutti i voli per avere una riserva essenziale di energia pronta all'uso durante le attese e gli spostamenti per:
              </DocCardText>
              <DocCardText>
                • <strong>Smartphone</strong> sempre pronti per ogni esigenza
                <br />
                • <strong>Carte d'imbarco digitali</strong> nei gate e ai controlli
                <br />
                • <strong>Mappe e itinerari</strong> di Parigi e Disneyland
                <br />
                • <strong>Biglietti Metro, RER e prenotazioni</strong>
                <br />
                • <strong>Foto e video</strong> dei nostri ricordi indimenticabili
                <br />
                • <strong>Comunicazioni</strong> rapide in viaggio
              </DocCardText>
              <NoticeWarning style={{ marginTop: '14px' }}>
                <em>Nota importante per il volo:</em> durante le ore trascorse a bordo il power bank rimarrà spento e riposto al sicuro secondo le regole ITA Airways; sarà pronto a ridarci energia durante gli scali e non appena scesi dall'aereo a destinazione!
              </NoticeWarning>
            </DocCard>
          </BaggageSection>

          {/* 11. LA REGOLA DA RICORDARE */}
          <BaggageSection>
            <GoldenRuleCard>
              <GoldenRuleBadge>MEMORIZZA QUESTA REGOLA</GoldenRuleBadge>
              <GoldenRuleTitle>LA REGOLA DA RICORDARE</GoldenRuleTitle>
              <GoldenRuleBlockquote>
                POWER BANK = CABINA, NON STIVA.
                <br />
                MAX 100 Wh.
                <br />
                MAX 2 A PERSONA.
                <br />
                NON NELLA CAPPELLIERA.
              </GoldenRuleBlockquote>
            </GoldenRuleCard>
          </BaggageSection>

          {/* 12. CHIUSURA */}
          <ClosingBox>
            <ClosingText>
              TELEFONO CARICO.
              <br />
              POWER BANK PRONTO.
              <br />
              ORA POSSIAMO PARTIRE. ✈️❤️
            </ClosingText>
          </ClosingBox>

          {/* 13. FONTI */}
          <SourcesNotice>
            Informazioni verificate sulle regole <strong>ITA Airways</strong> e sulle indicazioni <strong>IATA</strong>. Le regole della compagnia possono essere aggiornate: verificare sempre prima della partenza.
          </SourcesNotice>

          {/* Pulsante di ritorno */}
          <BottomNavRow>
            <BottomHomeBtn to="/home">
              <span>TORNA ALLA HOME</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </BottomHomeBtn>
          </BottomNavRow>
        </BaggageContent>
      </BaggageContainer>
    )
  }

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

// STYLED COMPONENTS PER BAGAGLIO A MANO
const BaggageContainer = styled.main`
  min-height: calc(100vh - 70px);
  position: relative;
  top: 72px;
  overflow-x: hidden;
  box-sizing: border-box;
  color: #f9f9f9;
  background-color: #040714;
`

const BaggageBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 50% 20%,
      rgba(15, 30, 65, 0.45) 0%,
      rgba(4, 7, 20, 0.95) 75%
    ),
    url("/images/home-background.png") center center / cover no-repeat fixed;
  z-index: -1;
  pointer-events: none;
`

const BaggageContent = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px 24px calc(80px + env(safe-area-inset-bottom, 0px));
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 20px 16px 70px;
  }
`

const BaggageNavRow = styled.div`
  margin-bottom: 24px;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(14, 18, 30, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 8px 18px;
  color: #f9f9f9;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.2px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 250ms ease;

  &:hover {
    background: #0063e5;
    border-color: #0483ee;
    transform: translateX(-3px);
    box-shadow: 0 0 16px rgba(0, 99, 229, 0.5);
  }
`

const BaggageHero = styled.header`
  margin-bottom: 40px;
  text-align: left;
`

const CategoryBadge = styled.div`
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: #60a5fa;
  margin-bottom: 12px;
  text-transform: uppercase;
`

const BaggageTitle = styled.h1`
  font-size: clamp(34px, 7vw, 62px);
  font-weight: 800;
  letter-spacing: clamp(3px, 1.2vw, 6px);
  color: #ffffff;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  line-height: 1.1;
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.9);
`

const BaggageSubtitle = styled.p`
  font-size: clamp(14px, 3.2vw, 19px);
  font-weight: 600;
  letter-spacing: 1.5px;
  color: rgba(249, 249, 249, 0.85);
  margin: 0;
  text-transform: uppercase;
  line-height: 1.5;
`

const BaggageSection = styled.section`
  margin-bottom: 42px;
`

const SectionHeader = styled.div`
  margin-bottom: 20px;
`

const SectionBadge = styled.div`
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #93c5fd;
  text-transform: uppercase;
  margin-bottom: 6px;
`

const SectionTitle = styled.h2`
  font-size: clamp(24px, 5vw, 36px);
  font-weight: 800;
  letter-spacing: clamp(2px, 0.8vw, 4px);
  color: #ffffff;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.8);
`

const SectionLead = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: rgba(249, 249, 249, 0.8);
  margin: 0;
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 22px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const RuleCard = styled.div`
  background: rgba(14, 20, 36, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  padding: 26px 22px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  transition: transform 250ms ease, border-color 250ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(96, 165, 250, 0.4);
  }
`

const CardTopTag = styled.div`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #60a5fa;
  margin-bottom: 8px;
  text-transform: uppercase;
`

const CardMainValue = styled.div`
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #ffffff;
  margin-bottom: 20px;
`

const RuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const RuleItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const RuleLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: rgba(249, 249, 249, 0.6);
  text-transform: uppercase;
`

const RuleValue = styled.span`
  font-size: 14.5px;
  line-height: 1.5;
  color: rgba(249, 249, 249, 0.95);

  strong {
    color: #60a5fa;
    font-weight: 700;
  }
`

const HighlightCard = styled.div`
  background: rgba(14, 20, 36, 0.72);
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: 18px;
  padding: 26px 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
`

const HighlightTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #93c5fd;
  margin: 0 0 18px 0;
  text-transform: uppercase;
`

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const HighlightItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`

const HighlightIcon = styled.span`
  font-size: 22px;
  line-height: 1.2;
  flex-shrink: 0;
`

const HighlightBody = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: rgba(249, 249, 249, 0.88);

  strong {
    color: #ffffff;
  }
`

const ExperienceCard = styled.div`
  background: rgba(16, 24, 46, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  padding: 26px 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);

  p {
    font-size: 15.5px;
    line-height: 1.7;
    color: rgba(249, 249, 249, 0.9);
    margin: 0 0 14px 0;

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      color: #93c5fd;
    }
  }
`

const ChecklistGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ChecklistCard = styled.div`
  background: rgba(14, 20, 36, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);
`

const ChecklistHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;

  span {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #ffffff;
  }
`

const ChecklistDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 8px #60a5fa;
  flex-shrink: 0;
`

const ChecklistText = styled.p`
  font-size: 13.5px;
  line-height: 1.55;
  color: rgba(249, 249, 249, 0.8);
  margin: 0;
`

const BottomNavRow = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`

const BottomHomeBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #0063e5;
  color: #ffffff;
  border: 1px solid #0483ee;
  border-radius: 30px;
  padding: 13px 32px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1.8px;
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

const SpecialQuoteHeader = styled.div`
  margin-bottom: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`

const SpecialQuoteDate = styled.div`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 3px;
  color: #60a5fa;
  margin-bottom: 8px;
  text-transform: uppercase;
`

const SpecialQuoteHighlight = styled.h3`
  font-size: clamp(20px, 4.5vw, 28px);
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #ffffff;
  margin: 0;
  line-height: 1.35;
  text-transform: uppercase;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.8);
`

const ClosingBox = styled.div`
  margin: 40px auto 0;
  text-align: center;
  background: rgba(14, 20, 36, 0.85);
  border: 1px solid rgba(96, 165, 250, 0.35);
  border-radius: 20px;
  padding: 32px 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);
  max-width: 600px;
`

const ClosingDate = styled.div`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 3px;
  color: #60a5fa;
  margin-bottom: 10px;
  text-transform: uppercase;
`

const ClosingText = styled.h3`
  font-size: clamp(20px, 4.5vw, 26px);
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #ffffff;
  margin: 0;
  line-height: 1.35;
  text-transform: uppercase;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.9);
`

const ClosingTitleSmall = styled.div`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: #60a5fa;
  margin-bottom: 8px;
  text-transform: uppercase;
`

const UltimateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 18px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const UltimateCard = styled.div`
  background: rgba(14, 20, 36, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  padding: 26px 22px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  transition: transform 250ms ease, border-color 250ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(96, 165, 250, 0.45);
  }
`

const UltimateCardTitle = styled.h3`
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #60a5fa;
  margin: 0 0 12px 0;
  text-transform: uppercase;
`

const UltimateCardText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: rgba(249, 249, 249, 0.95);
  margin: 0;
`

const DiscreetNotice = styled.p`
  font-size: 12.5px;
  line-height: 1.5;
  color: rgba(249, 249, 249, 0.65);
  text-align: center;
  margin: 0 0 40px 0;
  font-style: italic;
`

const EmotionalSection = styled.section`
  background: rgba(16, 24, 46, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 20px;
  padding: 36px 28px;
  text-align: center;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55);
  margin-bottom: 35px;
`

const EmotionalDate = styled.div`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 3px;
  color: #60a5fa;
  margin-bottom: 12px;
  text-transform: uppercase;
`

const EmotionalQuote = styled.h2`
  font-size: clamp(22px, 5vw, 34px);
  font-weight: 800;
  letter-spacing: clamp(1.5px, 0.8vw, 3px);
  color: #ffffff;
  margin: 0;
  line-height: 1.35;
  text-transform: uppercase;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.9);
`

// STYLED COMPONENTS PER DOCUMENTI
const DocCardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const DocCard = styled.div`
  background: rgba(14, 20, 36, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  padding: 26px 22px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  transition: transform 250ms ease, border-color 250ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(96, 165, 250, 0.45);
  }
`

const DocCardTop = styled.div`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #60a5fa;
  margin-bottom: 8px;
  text-transform: uppercase;
`

const DocCardTitle = styled.h3`
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 1.2px;
  color: #ffffff;
  margin: 0 0 14px 0;
  text-transform: uppercase;
`

const DocCardText = styled.p`
  font-size: 14.5px;
  line-height: 1.65;
  color: rgba(249, 249, 249, 0.9);
  margin: 0 0 12px 0;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #60a5fa;
    font-weight: 700;
  }
`

const FlightDocBlock = styled.div`
  background: rgba(14, 20, 36, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  padding: 24px 22px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
`

const FlightDateHeader = styled.div`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: #60a5fa;
  margin-bottom: 14px;
  text-transform: uppercase;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const FlightLegItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`

const FlightCode = styled.span`
  display: inline-block;
  background: rgba(0, 99, 229, 0.28);
  border: 1px solid rgba(96, 165, 250, 0.5);
  color: #93c5fd;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 6px;
  flex-shrink: 0;
`

const FlightRouteText = styled.span`
  font-size: 14.5px;
  font-weight: 600;
  color: #ffffff;
`

const NoticeWarning = styled.div`
  background: rgba(30, 41, 59, 0.65);
  border-left: 3px solid #60a5fa;
  border-radius: 0 12px 12px 0;
  padding: 14px 18px;
  margin-top: 16px;
  font-size: 13.5px;
  line-height: 1.55;
  color: rgba(249, 249, 249, 0.88);

  strong {
    color: #ffffff;
  }
`

const VisualChecklist = styled.div`
  background: rgba(14, 20, 36, 0.76);
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: 20px;
  padding: 28px 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`

const ChecklistItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 16px;
`

const CheckBoxIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid #60a5fa;
  background: rgba(96, 165, 250, 0.15);
  color: #60a5fa;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
`

const CheckText = styled.span`
  font-size: 14.5px;
  font-weight: 600;
  color: rgba(249, 249, 249, 0.95);
  line-height: 1.4;
`

// STYLED COMPONENTS PER METRO & RER
const MetroTable = styled.div`
  background: rgba(14, 20, 36, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  padding: 22px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const MetroTableItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`

const MetroTableItemName = styled.span`
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #ffffff;
`

const MetroTableItemPrice = styled.span`
  font-size: 16px;
  font-weight: 800;
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.15);
  border: 1px solid rgba(96, 165, 250, 0.4);
  padding: 4px 12px;
  border-radius: 8px;
`

const TariffDisclaimer = styled.div`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #93c5fd;
  text-transform: uppercase;
  margin-top: 8px;
  display: inline-block;
  background: rgba(96, 165, 250, 0.12);
  border: 1px solid rgba(96, 165, 250, 0.35);
  padding: 5px 12px;
  border-radius: 6px;
`

const CityRoutesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const CityRouteCard = styled.div`
  background: rgba(14, 20, 36, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  padding: 24px 20px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  transition: transform 250ms ease, border-color 250ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(96, 165, 250, 0.45);
  }
`

const CityRouteHeader = styled.div`
  font-size: 19px;
  font-weight: 800;
  letter-spacing: 1.2px;
  color: #ffffff;
  margin-bottom: 16px;
  text-transform: uppercase;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`

const RouteDetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const DetailKey = styled.span`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #60a5fa;
  text-transform: uppercase;
`

const DetailVal = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: rgba(249, 249, 249, 0.92);

  strong {
    color: #ffffff;
  }
`

const DisneylandFeatureBox = styled.div`
  background: rgba(14, 20, 36, 0.85);
  border: 1px solid rgba(96, 165, 250, 0.35);
  border-radius: 20px;
  padding: 30px 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);
  margin-bottom: 24px;
`

const PathDiagramBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 20px 0;
`

const PathStep = styled.div`
  background: rgba(14, 20, 36, 0.9);
  border: 1px solid rgba(96, 165, 250, 0.4);
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 14.5px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  width: 100%;
  max-width: 380px;
  box-sizing: border-box;

  &.highlight {
    background: rgba(0, 99, 229, 0.35);
    border-color: #60a5fa;
    color: #93c5fd;
    font-size: 15.5px;
  }
`

const PathArrow = styled.div`
  color: #60a5fa;
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
`

const SourcesNotice = styled.div`
  font-size: 12px;
  color: rgba(249, 249, 249, 0.6);
  text-align: center;
  margin: 30px 0 10px;
  letter-spacing: 0.5px;

  strong {
    color: rgba(249, 249, 249, 0.85);
  }
`

// STYLED COMPONENTS PER POWER BANK
const CriticalAlertCard = styled.div`
  background: rgba(220, 38, 38, 0.12);
  border: 2px solid rgba(239, 68, 68, 0.55);
  border-radius: 20px;
  padding: 28px 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
`

const CriticalBadge = styled.div`
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #f87171;
  text-transform: uppercase;
  margin-bottom: 8px;
`

const CriticalTitle = styled.h3`
  font-size: clamp(22px, 4.5vw, 32px);
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #ffffff;
  margin: 0 0 14px 0;
  text-transform: uppercase;
`

const CriticalText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: rgba(249, 249, 249, 0.95);
  margin: 0;

  strong {
    color: #ffffff;
    font-weight: 700;
  }
`

const CriticalWarningHighlight = styled.div`
  background: rgba(239, 68, 68, 0.22);
  border-left: 4px solid #ef4444;
  border-radius: 0 10px 10px 0;
  padding: 12px 16px;
  margin-top: 16px;
  font-size: 15px;
  font-weight: 600;
  color: #fee2e2;

  strong {
    color: #ffffff;
    font-weight: 800;
  }
`

const FormulaBox = styled.div`
  background: rgba(14, 20, 36, 0.78);
  border: 1px solid rgba(96, 165, 250, 0.35);
  border-radius: 20px;
  padding: 28px 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.55);
`

const FormulaTag = styled.div`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #60a5fa;
  margin-bottom: 8px;
  text-transform: uppercase;
`

const FormulaCode = styled.div`
  font-size: clamp(22px, 4.5vw, 32px);
  font-weight: 800;
  letter-spacing: 2px;
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.12);
  border: 1px solid rgba(96, 165, 250, 0.4);
  padding: 14px 20px;
  border-radius: 12px;
  display: inline-block;
  margin-bottom: 14px;
`

const FormulaExplanation = styled.p`
  font-size: 14.5px;
  line-height: 1.6;
  color: rgba(249, 249, 249, 0.88);
  margin: 0 0 20px 0;
`

const ExamplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ExampleItem = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 18px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ExampleMah = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
`

const ExampleVolts = styled.div`
  font-size: 12px;
  color: rgba(249, 249, 249, 0.6);
  font-weight: 600;
  text-transform: uppercase;
`

const ExampleWh = styled.div`
  font-size: 17px;
  font-weight: 800;
  color: #60a5fa;
  margin-top: 4px;
`

const OverheadBanCard = styled.div`
  background: rgba(14, 20, 36, 0.82);
  border: 2px solid rgba(245, 158, 11, 0.6);
  border-radius: 20px;
  padding: 28px 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);
`

const OverheadBanTag = styled.div`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #fbbf24;
  margin-bottom: 8px;
  text-transform: uppercase;
`

const OverheadBanTitle = styled.h3`
  font-size: clamp(24px, 5vw, 34px);
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #fbbf24;
  margin: 0 0 18px 0;
  text-transform: uppercase;
`

const OverheadBanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const OverheadBanItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14.5px;
  line-height: 1.55;
  color: rgba(249, 249, 249, 0.95);

  .dot {
    color: #60a5fa;
    font-weight: 800;
    font-size: 16px;
    flex-shrink: 0;
  }

  &.prohibited {
    background: rgba(239, 68, 68, 0.16);
    border: 1px solid rgba(239, 68, 68, 0.5);
    border-radius: 10px;
    padding: 12px 14px;
    color: #ffffff;

    .dot {
      color: #ef4444;
      font-weight: 900;
      font-size: 17px;
    }

    strong {
      color: #fca5a5;
    }
  }

  strong {
    color: #ffffff;
  }
`

const OverheadReasonNotice = styled.div`
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 13px;
  line-height: 1.5;
  color: rgba(249, 249, 249, 0.72);
  font-style: italic;
`

const OnBoardActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const OnBoardActionCard = styled.div`
  background: rgba(220, 38, 38, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 18px;
  padding: 24px 20px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`

const OnBoardStatusBadge = styled.div`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #f87171;
  text-transform: uppercase;
  margin-bottom: 8px;
`

const OnBoardActionTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #ffffff;
  margin: 0 0 10px 0;
  text-transform: uppercase;
`

const OnBoardActionDesc = styled.p`
  font-size: 14px;
  line-height: 1.55;
  color: rgba(249, 249, 249, 0.9);
  margin: 0;
`

const ProtectionCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProtectionCard = styled.div`
  background: rgba(14, 20, 36, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  padding: 22px 18px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 250ms ease, border-color 250ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(96, 165, 250, 0.45);
  }
`

const ProtectionCardTitle = styled.h3`
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #60a5fa;
  margin: 0 0 10px 0;
  text-transform: uppercase;
`

const ProtectionCardText = styled.p`
  font-size: 14px;
  line-height: 1.55;
  color: rgba(249, 249, 249, 0.9);
  margin: 0;

  strong {
    color: #ffffff;
  }
`

const GoldenRuleCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(23, 37, 84, 0.85) 0%,
    rgba(14, 20, 36, 0.95) 100%
  );
  border: 2px solid rgba(96, 165, 250, 0.5);
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.65);
`

const GoldenRuleBadge = styled.div`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: #60a5fa;
  margin-bottom: 10px;
  text-transform: uppercase;
`

const GoldenRuleTitle = styled.h2`
  font-size: clamp(22px, 4.5vw, 32px);
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #ffffff;
  margin: 0 0 16px 0;
  text-transform: uppercase;
`

const GoldenRuleBlockquote = styled.div`
  font-size: clamp(17px, 3.8vw, 22px);
  font-weight: 800;
  letter-spacing: 1.5px;
  line-height: 1.6;
  color: #93c5fd;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 12px;
  padding: 20px 16px;
  margin: 0 auto;
  max-width: 580px;
  border-left: 4px solid #60a5fa;
`



