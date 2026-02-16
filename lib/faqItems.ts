type FAQItem = {
  q: string;
  a: string;
};

export const FAQ_ITEMS: FAQItem[] = [
  { 
    q: "Hva påvirker prisen mest?",
    a: "Areal (m²), type gulv, underlag og antall kutt/overganger." 
  },
  {
    q: "Hva koster parkettlegging per m²?",
    a: "Prisen avhenger av type gulv, underlag og størrelse på arealet. Du kan bruke priskalkulatoren på siden for et raskt estimat. For større prosjekter anbefaler vi befaring.",
  },
  {
    q: "Har dere minimumspris?",
    a: "Ja, vi har minimumsjobb for mindre oppdrag. Dette sikrer at arbeidet utføres effektivt og profesjonelt.",
  },
  {
    q: "Hvor lang tid tar det å legge parkett?",
    a: "Vanligvis 1–3 dager, avhengig av størrelse og type gulv. Vi gir alltid tydelig tidsestimat før oppstart.",
  },
  {
    q: "Legger dere både klikk og limt parkett?",
    a: "Ja. Vi legger både klikk-parkett og limt parkett. Løsningen velges basert på underlag og bruk.",
  },
  {
    q: "Kan dere legge gulv i leilighet med varmefolier?",
    a: "Ja, vi har erfaring med legging over varmefolier. Riktig type parkett og underlag er viktig.",
  },
  {
    q: "Utfører dere også gulvlister?",
    a: "Ja, vi monterer gulvlister for et helhetlig og ferdig resultat.",
  },
  {
    q: "Må jeg tømme rommet før dere starter?",
    a: "Ja, rommet bør være tomt for møbler før arbeidet starter. Dette gir best og mest effektiv utførelse.",
  },
  {
    q: "Jobber dere i hele Oslo-området?",
    a: "Vi jobber i Oslo, Bærum, Asker og nærliggende områder.",
  },
  {
    q: "Tilbyr dere gratis befaring?",
    a: "Ja, vi tilbyr gratis befaring i Oslo og omegn.",
  },
  {
    q: "Når kan dere starte?",
    a: "Oppstart avtales individuelt. Ta kontakt for å sjekke tilgjengelighet.",
  },
] as const;
