export const profile = {
  name: "Cleyton Tembe",
  initials: "CT",
  avatar: "",
  role: "Full-stack developer and Computer Engineering student",
  tagline: "I build web apps with React, Next.js and Node.",
  intro:
    "Right now I'm going deep on TypeScript and Next.js, shipping one project at a time and learning from each one. These are the ones I'm proudest of.",
  github: "https://github.com/Cleyton-Tembe",
  email: "accesscodetalk3r@gmail.com",
  linkedin: "https://www.linkedin.com/in/cleyton-tembe-48ab17446",
  resume: {
    pdf: "Resume_Cleyton_Tembe.pdf",
    image: "resume.webp",
  },
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  image: string;
  demo: string;
  code: string;
};

const gh = (repo: string) => `https://github.com/Cleyton-Tembe/${repo}`;

export const featured: Project = {
  slug: "next-ecommerce",
  title: "Online store",
  summary:
    "A full online store with Stripe payments, discount coupons, Redis caching and an admin panel with a sales chart.",
  stack: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Redis"],
  image: "previews/ecommerce.png",
  demo: "https://next-ecommerce-three-ebon.vercel.app/",
  code: gh("Next-Ecommerce"),
};

export const projects: Project[] = [
  {
    slug: "next-social",
    title: "Evlyn, a social network",
    summary:
      "Image posts, likes, comments, followers and notifications. Built with Server Actions, with sign-in through Clerk.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Clerk"],
    image: "previews/next-social.png",
    demo: "https://next-social-media-62o8.vercel.app/",
    code: gh("Next-SocialMedia"),
  },
  {
    slug: "next-dashboard",
    title: "Admin dashboard",
    summary:
      "Interactive Recharts graphs, Framer Motion animations and searchable tables of products, users and orders.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "previews/next-dashboard.png",
    demo: "https://next-dashboard-inky-five-70.vercel.app/",
    code: gh("Next-Dashboard"),
  },
  {
    slug: "spotify-clone",
    title: "Music streaming app",
    summary:
      "Playlists, a full player and a live list of what friends are listening to. Google sign-in and song uploads to Cloudinary.",
    stack: ["React", "TypeScript", "Express", "MongoDB", "Cloudinary"],
    image: "previews/spotify-clone.png",
    demo: "https://spotify-clone-8s82.onrender.com/",
    code: gh("Spotify-Clone"),
  },
  {
    slug: "react-auth",
    title: "React Auth",
    summary:
      "Sign-up with email verification by code, password reset by email and JWT sessions in httpOnly cookies.",
    stack: ["React", "TypeScript", "Express", "MongoDB"],
    image: "previews/react-auth.png",
    demo: "https://reactauth-6j7h.vercel.app/",
    code: gh("ReactAuth"),
  },
  {
    slug: "chat-app",
    title: "Chatty, a real-time chat",
    summary:
      "Live messages with Socket.io, image sharing, a list of who's online and switchable themes.",
    stack: ["React", "Socket.io", "Express", "MongoDB"],
    image: "previews/chat-app.png",
    demo: "https://chat-app-s-1.onrender.com",
    code: gh("Chat-App-S"),
  },
  {
    slug: "product-store",
    title: "Product store",
    summary:
      "Create, edit and delete products with images, in light or dark mode. React and Zustand on an Express API.",
    stack: ["React", "Express", "MongoDB"],
    image: "previews/product-store.png",
    demo: "https://product-store-dpux.onrender.com",
    code: gh("Product-Store"),
  },
];

export const facts: { label: string; value: string }[] = [
  { label: "Based in", value: "Maputo, Mozambique" },
  {
    label: "Studying",
    value:
      "BSc in Computer Engineering, Eduardo Mondlane University (3rd year)",
  },
  {
    label: "Training",
    value: "Full-Stack Web Development course, Udemy (2025)",
  },
  { label: "Open to", value: "Internships and junior developer roles" },
];

export const beyondCode = [
  "System design, requirements gathering and modelling",
  "Working in Scrum teams",
  "Databases, from schema design to queries",
  "Leadership and teamwork",
];

export const toolbox = [
  "HTML5",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Spring Boot",
  "PostgreSQL",
  "MongoDB",
  "Git",
];

export const journey: {
  when: string;
  title: string;
  body: string;
  links: { label: string; href: string }[];
}[] = [
  {
    when: "Dec 2024 to Jan 2025",
    title: "Started with Java and Spring Boot",
    body: "Built a customer loyalty app where every transaction earns points. It taught me how a back end is layered: controllers, services and the database.",
    links: [{ label: "Customer loyalty", href: gh("Fidelizacao-de-Clientes") }],
  },
  {
    when: "Nov to Dec 2025",
    title: "Moved to full-stack JavaScript",
    body: "Built my first MERN apps: a product store with image uploads and a real-time chat with Socket.io.",
    links: [
      { label: "Product store", href: gh("Product-Store") },
      { label: "Real-time chat", href: gh("Chat-App-S") },
    ],
  },
  {
    when: "Aug to Oct 2026",
    title: "Switched to TypeScript and Next.js",
    body: "Shipped an online store with Stripe, a social network on PostgreSQL, an admin dashboard, a music app and a full authentication flow.",
    links: [
      { label: "Online store", href: gh("Next-Ecommerce") },
      { label: "Next Social", href: gh("Next-SocialMedia") },
    ],
  },
];
