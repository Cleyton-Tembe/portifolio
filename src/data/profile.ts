// Dados do ecrã "Personagem". Tudo o que aparece no CV vive aqui.

export const profile = {
  name: "Cleyton Samuel Tembe",
  callsign: "Cleyton Tembe",
  initials: "CT",
  role: "Desenvolvedor Web",
  title: "Estudante de Engenharia Informática",
  location: "Maputo, Moçambique",
  faction: "FEUEM — Engenharia Informática",
  level: 3,
  levelLabel: "3.º ano · em curso",
  status: "Disponível para estágio e projectos",
  bio: "Estudante do 3.º ano de Engenharia Informática na Faculdade de Engenharia da UEM, com formação complementar em desenvolvimento web full-stack. Possuo bases sólidas em Engenharia de Software, Programação Web (avançado), Bases de Dados e na metodologia ágil Scrum. Destaco-me pela dedicação, rapidez de aprendizagem e capacidade de transformar problemas em soluções tecnológicas.",
  // "Missão actual" no ecrã inicial.
  quest: {
    title: "Missão actual",
    headline: "Encontrar o primeiro estágio",
    body: "Desenvolvedor web full-stack em formação, à procura de estágio e de projectos onde possa aprender e entregar.",
    objectives: [
      { text: "Concluir o curso Full-Stack (Udemy)", done: true },
      { text: "Construir 10 projectos", done: true },
      { text: "Terminar a licenciatura — 3.º ano", done: false },
      { text: "Encontrar o primeiro estágio", done: false },
    ],
  },
  cv: "Curriculo_Vitae_Cleyton_Tembe.pdf",
  // Caminho da foto em public/ (ex.: "foto.jpg"). Vazio = emblema com iniciais.
  photo: "",
};

export const contacts = [
  { id: "email", label: "Email", value: "accesscodetalk3r@gmail.com", href: "mailto:accesscodetalk3r@gmail.com" },
  { id: "phone", label: "Telefone", value: "+258 85 278 1397", href: "tel:+258852781397" },
  { id: "whatsapp", label: "WhatsApp", value: "+258 85 278 1397", href: "https://wa.me/258852781397" },
  { id: "github", label: "GitHub", value: "Cleyton-Tembe", href: "https://github.com/Cleyton-Tembe" },
] as const;

export type Contact = (typeof contacts)[number];

// "Equipamento": formação académica.
export const education = [
  {
    slot: "Primária",
    title: "Licenciatura em Engenharia Informática",
    org: "Faculdade de Engenharia — Universidade Eduardo Mondlane",
    period: "3.º ano (em curso)",
    detail: "Engenharia de Software, Programação Web, Bases de Dados e Scrum (nível básico).",
    rarity: "exotic",
  },
  {
    slot: "Secundária",
    title: "Curso de Desenvolvimento Web Full-Stack",
    org: "Udemy — Dra. Angela Yu",
    period: "2025",
    detail: "Formação completa em front-end e back-end.",
    rarity: "highend",
  },
  {
    slot: "Lateral",
    title: "Ensino Secundário",
    org: "Escola Marista da Manhiça",
    period: "2015 – 2022",
    detail: "Média final de 16 valores.",
    rarity: "superior",
  },
] as const;

// "Talentos": competências pessoais.
export const talents = [
  { name: "Ética de trabalho", desc: "Forte ética de trabalho e elevado nível de dedicação." },
  { name: "Aprendizagem rápida", desc: "Aprendo depressa e adapto-me com facilidade." },
  { name: "Pensamento analítico", desc: "Orientado para a resolução de problemas." },
  { name: "Trabalho em equipa", desc: "Colaboro bem em equipa e com Scrum." },
] as const;
