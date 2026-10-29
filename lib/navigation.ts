/** Root-relative links work from both the homepage and nested routes. */
export const navigationItems = [
  { href: "/#tjenester", label: "Tjenester" },
  { href: "/priser", label: "Pris" },
  { href: "/prosjekter", label: "Prosjekter" },
  { href: "/#kundeomtaler", label: "Kundeomtaler" },
  { href: "/#kontakt", label: "Kontakt" },
] as const;
