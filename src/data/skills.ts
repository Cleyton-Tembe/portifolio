// Árvore de skills. Cada ramo é uma árvore: `parent` liga o nó ao pré-requisito.
// `level` vai de 1 a MAX_LEVEL — ajusta os valores à tua auto-avaliação.
// `projects` usa os ids de src/data/projects.ts.

export const MAX_LEVEL = 5;

export type Skill = {
  id: string;
  name: string;
  code: string; // 2–4 letras mostradas no nó
  level: number;
  parent?: string;
  desc: string;
  projects?: string[];
};

export type Branch = {
  id: string;
  name: string;
  tag: string;
  desc: string;
  skills: Skill[];
};

export const branches: Branch[] = [
  {
    id: "frontend",
    name: "Front-end",
    tag: "Ataque",
    desc: "Interfaces rápidas, acessíveis e responsivas.",
    skills: [
      {
        id: "html",
        name: "HTML",
        code: "HTML",
        level: 5,
        desc: "Estrutura semântica e acessível.",
        projects: ["quiz"],
      },
      {
        id: "css",
        name: "CSS",
        code: "CSS",
        level: 4,
        parent: "html",
        desc: "Layouts com Flexbox e Grid, animações e design responsivo.",
        projects: ["quiz"],
      },
      {
        id: "js",
        name: "JavaScript",
        code: "JS",
        level: 4,
        parent: "html",
        desc: "ES6+, DOM, assincronia e consumo de APIs.",
        projects: ["quiz", "chat-app", "product-store"],
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        code: "TW",
        level: 4,
        parent: "css",
        desc: "Estilos utilitários com shadcn/ui em vários projectos.",
        projects: ["social", "chat-app", "spotify"],
      },
      {
        id: "react",
        name: "React.js",
        code: "RE",
        level: 4,
        parent: "js",
        desc: "Componentes, hooks e gestão de estado com Zustand e React Query.",
        projects: ["spotify", "chat-app", "product-store", "todo"],
      },
      {
        id: "next",
        name: "Next.js",
        code: "NX",
        level: 4,
        parent: "react",
        desc: "App Router, Server Actions, rotas de API e autenticação.",
        projects: ["social", "ecommerce", "next-chat"],
      },
    ],
  },
  {
    id: "backend",
    name: "Back-end",
    tag: "Defesa",
    desc: "APIs, autenticação e tempo real.",
    skills: [
      {
        id: "node",
        name: "Node.js",
        code: "ND",
        level: 4,
        desc: "Servidores e APIs REST em JavaScript e TypeScript.",
        projects: ["spotify", "chat-app", "product-store"],
      },
      {
        id: "java",
        name: "Java",
        code: "JV",
        level: 3,
        desc: "Programação orientada a objectos.",
        projects: ["fidelizacao", "todo"],
      },
      {
        id: "express",
        name: "Express",
        code: "EX",
        level: 4,
        parent: "node",
        desc: "Rotas, middlewares, autenticação JWT e upload de ficheiros.",
        projects: ["spotify", "chat-app", "product-store"],
      },
      {
        id: "spring",
        name: "Spring Boot",
        code: "SB",
        level: 3,
        parent: "java",
        desc: "APIs REST com Spring Web e Spring Data JPA.",
        projects: ["fidelizacao", "todo"],
      },
      {
        id: "socket",
        name: "Socket.io",
        code: "IO",
        level: 3,
        parent: "express",
        desc: "Comunicação em tempo real: mensagens e estado online.",
        projects: ["chat-app", "spotify"],
      },
      {
        id: "security",
        name: "Spring Security",
        code: "SS",
        level: 2,
        parent: "spring",
        desc: "Autenticação e autorização em aplicações Spring.",
        projects: ["fidelizacao"],
      },
    ],
  },
  {
    id: "data",
    name: "Bases de Dados",
    tag: "Conhecimento",
    desc: "Modelação e persistência de dados.",
    skills: [
      {
        id: "sql",
        name: "SQL",
        code: "SQL",
        level: 4,
        desc: "Consultas, junções e modelação relacional.",
      },
      {
        id: "nosql",
        name: "NoSQL",
        code: "NoSQL",
        level: 3,
        desc: "Modelação orientada a documentos.",
      },
      {
        id: "postgres",
        name: "PostgreSQL",
        code: "PG",
        level: 3,
        parent: "sql",
        desc: "Base de dados relacional da rede social.",
        projects: ["social"],
      },
      {
        id: "mysql",
        name: "MySQL",
        code: "MY",
        level: 3,
        parent: "sql",
        desc: "Persistência dos projectos em Spring Boot.",
        projects: ["fidelizacao"],
      },
      {
        id: "mongo",
        name: "MongoDB",
        code: "MDB",
        level: 4,
        parent: "nosql",
        desc: "Base de dados de vários projectos MERN.",
        projects: ["ecommerce", "spotify", "chat-app", "product-store"],
      },
      {
        id: "prisma",
        name: "Prisma ORM",
        code: "PR",
        level: 3,
        parent: "postgres",
        desc: "Schema, migrações e consultas tipadas.",
        projects: ["social"],
      },
      {
        id: "mongoose",
        name: "Mongoose",
        code: "MG",
        level: 4,
        parent: "mongo",
        desc: "Schemas, validação e relações entre documentos.",
        projects: ["ecommerce", "spotify", "chat-app"],
      },
    ],
  },
  {
    id: "tools",
    name: "Ferramentas & DevOps",
    tag: "Utilidade",
    desc: "Versionamento, CI e qualidade de código.",
    skills: [
      {
        id: "git",
        name: "Git",
        code: "GIT",
        level: 4,
        desc: "Branches, merges e resolução de conflitos.",
      },
      {
        id: "vscode",
        name: "VS Code",
        code: "VSC",
        level: 5,
        desc: "Editor principal, com depuração e extensões.",
      },
      {
        id: "github",
        name: "GitHub",
        code: "GH",
        level: 4,
        parent: "git",
        desc: "Repositórios, pull requests e colaboração.",
      },
      {
        id: "gitlab",
        name: "GitLab",
        code: "GL",
        level: 2,
        parent: "git",
        desc: "Repositórios e colaboração em GitLab.",
      },
      {
        id: "jenkins",
        name: "Jenkins",
        code: "JK",
        level: 2,
        parent: "github",
        desc: "Pipelines declarativos: lint, typecheck e testes em paralelo.",
        projects: ["jenkins-lab"],
      },
      {
        id: "vitest",
        name: "Vitest",
        code: "VT",
        level: 2,
        parent: "jenkins",
        desc: "Testes unitários com relatórios JUnit no CI.",
        projects: ["jenkins-lab"],
      },
    ],
  },
  {
    id: "engineering",
    name: "Engenharia de Software",
    tag: "Estratégia",
    desc: "Do requisito à entrega.",
    skills: [
      {
        id: "req",
        name: "Requisitos",
        code: "REQ",
        level: 3,
        desc: "Levantamento e análise de requisitos.",
      },
      {
        id: "scrum",
        name: "Scrum",
        code: "SCR",
        level: 2,
        desc: "Sprints, backlog e cerimónias (nível básico).",
      },
      {
        id: "model",
        name: "Modelação",
        code: "UML",
        level: 3,
        parent: "req",
        desc: "Diagramas UML e modelação de sistemas.",
      },
      {
        id: "practices",
        name: "Boas práticas",
        code: "BP",
        level: 3,
        parent: "model",
        desc: "Código limpo, revisão e versionamento disciplinado.",
      },
    ],
  },
];

export const totalPoints = (b: Branch) =>
  b.skills.reduce((n, s) => n + s.level, 0);
export const maxPoints = (b: Branch) => b.skills.length * MAX_LEVEL;
