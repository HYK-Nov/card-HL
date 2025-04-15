const rankOrder = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const getCardValue = (card: string) => {
  const rank = card.slice(1); // 예: "H10" → "10"
  return rankOrder.indexOf(rank);
};

export const getWinningCard = (cards: string[], mode: "high" | "low") => {
  const [val1, val2] = [getCardValue(cards[0]), getCardValue(cards[1])];

  if (val1 === val2) return "draw";
  if (mode === "high") {
    return val1 > val2 ? "lose" : "win";
  } else {
    return val1 < val2 ? "lose" : "win";
  }
};
