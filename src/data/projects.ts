import type { Rarity } from "./rarity";

// Inventário: cada projecto é um item. A raridade define o destaque.
export type Project = {
  id: string;
  name: string;
  type: "Full-Stack" | "Front-end" | "Back-end" | "DevOps";
  rarity: Rarity;
  year: number;
  desc: string;
  talents: string[]; // funcionalidades principais
  stack: string[];
  repo?: string;
  demo?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    id: "social",
    name: "Rede Social",
    type: "Full-Stack",
    rarity: "exotic",
    year: 2026,
    desc: "Rede social full-stack com publicações, comentários, gostos, seguidores e notificações.",
    talents: ["Autenticação com Clerk", "Upload de imagens com UploadThing", "Server Actions e Prisma", "Sistema de seguidores e notificações"],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind", "shadcn/ui"],
    repo: "https://github.com/Cleyton-Tembe/Next-SocialMedia",
  },
  {
    id: "ecommerce",
    name: "Loja Online",
    type: "Full-Stack",
    rarity: "exotic",
    year: 2026,
    desc: "E-commerce com carrinho, cupões de desconto, pagamentos e painel de administração com estatísticas.",
    talents: ["Pagamentos com Stripe", "Autenticação JWT", "Cache com Redis", "Painel de vendas com gráficos"],
    stack: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Redis", "Cloudinary"],
    repo: "https://github.com/Cleyton-Tembe/Next-Ecommerce",
  },
  {
    id: "jenkins-lab",
    name: "Jenkins Lab",
    type: "DevOps",
    rarity: "highend",
    year: 2026,
    desc: "Pipeline de integração contínua em Jenkins para a rede social: instalação, Prisma, lint e typecheck em paralelo e testes com relatório JUnit.",
    talents: ["Pipeline declarativo multiplataforma", "Etapas em paralelo", "Testes Vitest com cobertura", "Relatórios JUnit no Jenkins"],
    stack: ["Jenkins", "Groovy", "Vitest", "ESLint", "Node.js"],
    note: "Repositório privado",
  },
  {
    id: "next-chat",
    name: "Chat Next",
    type: "Full-Stack",
    rarity: "highend",
    year: 2026,
    desc: "Chat em tempo real com envio de imagens, emojis, sons e preferências do utilizador.",
    talents: ["Mensagens em tempo real com Pusher", "Autenticação com Kinde", "Redis (Upstash) como base de dados", "Upload de imagens com Cloudinary"],
    stack: ["Next.js", "TypeScript", "Pusher", "Redis", "React Query", "Zustand"],
    repo: "https://github.com/Cleyton-Tembe/Next-ChatApp",
  },
  {
    id: "spotify",
    name: "Spotify Clone",
    type: "Full-Stack",
    rarity: "highend",
    year: 2026,
    desc: "Clone do Spotify com álbuns, músicas, painel de administração e estatísticas.",
    talents: ["API REST em Express", "Autenticação com Clerk", "Upload de músicas e capas", "Tempo real com Socket.io"],
    stack: ["React", "Vite", "TypeScript", "Express", "MongoDB", "Socket.io"],
    repo: "https://github.com/Cleyton-Tembe/Spotify-Clone",
  },
  {
    id: "fidelizacao",
    name: "Fidelização de Clientes",
    type: "Back-end",
    rarity: "superior",
    year: 2025,
    desc: "Aplicação para controlar transacções e recompensar clientes com pontos que podem trocar por benefícios.",
    talents: ["Acumulação de pontos por transacção", "Autenticação com Spring Security", "Persistência com JPA"],
    stack: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
    repo: "https://github.com/Cleyton-Tembe/Fidelizacao-de-Clientes",
  },
  {
    id: "chat-app",
    name: "Chat App",
    type: "Full-Stack",
    rarity: "superior",
    year: 2025,
    desc: "Chat em tempo real com perfis, temas e estado online dos utilizadores.",
    talents: ["Socket.io", "Autenticação JWT com cookies", "Vários temas", "Fotos de perfil com Cloudinary"],
    stack: ["React", "Zustand", "Express", "MongoDB", "Socket.io"],
    repo: "https://github.com/Cleyton-Tembe/Chat-App-S",
  },
  {
    id: "product-store",
    name: "Product Store",
    type: "Full-Stack",
    rarity: "superior",
    year: 2025,
    desc: "Loja de produtos MERN com operações CRUD completas.",
    talents: ["API REST", "Gestão de estado com Zustand", "Interface com Chakra UI"],
    stack: ["React", "Chakra UI", "Express", "MongoDB"],
    repo: "https://github.com/Cleyton-Tembe/Product-Store",
  },
  {
    id: "todo",
    name: "Java Todo",
    type: "Full-Stack",
    rarity: "specialized",
    year: 2026,
    desc: "Lista de tarefas com front-end em React e API em Spring Boot.",
    talents: ["API REST em Spring", "Base de dados H2", "Front-end com Vite"],
    stack: ["React", "Spring Boot", "H2"],
    repo: "https://github.com/Cleyton-Tembe/Java-Todo-Basic",
  },
  {
    id: "quiz",
    name: "Quiz Website",
    type: "Front-end",
    rarity: "standard",
    year: 2025,
    desc: "Quiz interactivo em JavaScript puro.",
    talents: ["Perguntas carregadas de um ficheiro JS", "Manipulação do DOM sem frameworks"],
    stack: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/Cleyton-Tembe/Story",
  },
];

export const projectTypes = ["Todos", "Full-Stack", "Front-end", "Back-end", "DevOps"] as const;
export type ProjectFilter = (typeof projectTypes)[number];
