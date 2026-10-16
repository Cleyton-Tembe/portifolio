// Raridades clássicas de jogos: a cor diz a importância do item.
export type Rarity = "exotic" | "highend" | "superior" | "specialized" | "standard";

export const rarities: Record<Rarity, { label: string; color: string }> = {
  exotic: { label: "Lendário", color: "var(--r-exotic)" },
  highend: { label: "Épico", color: "var(--r-highend)" },
  superior: { label: "Raro", color: "var(--r-superior)" },
  specialized: { label: "Incomum", color: "var(--r-specialized)" },
  standard: { label: "Comum", color: "var(--r-standard)" },
};

export const rarityOrder: Rarity[] = ["exotic", "highend", "superior", "specialized", "standard"];
