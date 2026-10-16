# Portfólio — Cleyton Tembe

Portfólio com interface de **menu de jogo** — sem copiar nenhum jogo em particular:
ecrã de arranque com botão "Começar", menu principal, ficha de personagem,
árvore de habilidades e inventário com raridades. O texto foi pensado para ser
sempre legível (fonte Exo 2, tamanhos ≥ 13px e alto contraste).

| Ecrã | O que mostra |
|---|---|
| Arranque | Barra de carregamento e botão **Começar** (ou qualquer tecla) |
| Início | Menu principal, perfil do jogador e "Missão actual" com objectivos |
| Personagem | CV (biografia, formação como equipamento, competências como perks) e contacto |
| Habilidades | Hub de pontos + ramos + árvore de pré-requisitos |
| Inventário | Projectos como itens: Lendário, Épico, Raro, Incomum, Comum |

Navegação: separadores `Q [ … ] E` no topo; no celular, barra inferior com ícones
e deslizar para os lados.

## Correr localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
```

## Editar o conteúdo

Todo o conteúdo está em `src/data/` — não é preciso mexer nos componentes:

- `profile.ts` — nome, biografia, contactos, formação, perks, missão actual e foto (`photo`).
- `skills.ts` — ramos e habilidades. `parent` define o pré-requisito e `level` vai de 1 a 5.
- `projects.ts` — projectos do inventário (raridade, tecnologias, links).
- `rarity.ts` — nomes das raridades; as cores estão em `src/index.css` (`--r-*`).

O CV para download está em `public/Curriculo_Vitae_Cleyton_Tembe.pdf`.
A cor principal (ciano) é `--color-accent` em `src/index.css`.

## Atalhos

`Q`/`E` mudam de separador, `1`–`4` saltam para um ecrã, `Esc` volta ao início,
setas navegam no menu, nos ramos de habilidades e nos itens.

## Publicar no GitHub Pages

1. Cria o repositório **`Cleyton-Tembe.github.io`** (público).
2. Copia o conteúdo desta pasta para a raiz desse repositório e faz push para a `main`.
3. Em **Settings → Pages → Source**, escolhe **GitHub Actions**.

O workflow `.github/workflows/deploy.yml` faz o build e publica em
`https://cleyton-tembe.github.io` a cada push.
