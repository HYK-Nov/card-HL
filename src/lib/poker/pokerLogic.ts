import { THandRanking } from "@/types/pokerTypes.ts";

const RANKS = [
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
const SUITS = ["C", "D", "H", "S"];
const HAND_RANKINGS: THandRanking[] = [
  { name: "로열 스트레이트 플러시", multiplier: 100 },
  { name: "파이브카드", multiplier: 30 },
  { name: "스트레이트 플러시", multiplier: 15 },
  { name: "포카드", multiplier: 10 },
  { name: "풀하우스", multiplier: 5 },
  { name: "플러시", multiplier: 4 },
  { name: "스트레이트", multiplier: 2 },
  { name: "트리플", multiplier: 1 },
  { name: "투페어", multiplier: 1 },
  { name: "원페어", multiplier: 0 },
  { name: "노페어", multiplier: 0 },
];

// 카드 랜덤 셔플
export const getRandomCards = (
  count: number = 5,
  jokerProbability: number = 1, // 조커 등장 확률
): string[] => {
  const normalDeck: string[] = [];

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      normalDeck.push(`${suit}${rank}`);
    }
  }

  const deck = [...normalDeck];

  // 조커를 넣을지 결정
  const includeJoker = Math.random() < jokerProbability;
  if (includeJoker) {
    // 무작위로 X1 또는 X2 중 하나 선택
    const joker = Math.random() < 0.5 ? "X1" : "X2";
    deck.push(joker);
  }

  const selected = new Set<string>();
  while (selected.size < count) {
    const card = deck[Math.floor(Math.random() * deck.length)];
    selected.add(card);
  }

  return Array.from(selected);
};

// 카드 정보 파싱
type ParsedCard = { suit: string; rank: string };
const rankOrder: Record<string, number> = Object.fromEntries(
  RANKS.map((rank, i) => [rank, i + 2]),
);

const parseHand = (hand: string[]) => {
  const normal: ParsedCard[] = [];
  let hasJoker = false;

  for (const card of hand) {
    if (card.startsWith("X")) {
      hasJoker = true;
    } else {
      const match = card.match(/^([CDHS])(10|[2-9]|J|Q|K|A)$/);
      if (match) {
        normal.push({ suit: match[1], rank: match[2] });
      }
    }
  }

  return { normal, hasJoker };
};

// 족보 판별
const evaluateHand = (cards: ParsedCard[]): THandRanking => {
  const suitsCount = new Map<string, number>();
  const ranksCount = new Map<string, number>();

  // 문양, 숫자 세기
  for (const { suit, rank } of cards) {
    suitsCount.set(suit, (suitsCount.get(suit) || 0) + 1);
    ranksCount.set(rank, (ranksCount.get(rank) || 0) + 1);
  }

  // 같은 문양이 5개 이상인 경우 => 플러시
  const isFlush = Array.from(suitsCount.values()).some((value) => value >= 5);

  // rank -> 숫자 변환 후 오름차순 정렬 (ex. J => 11, A => 14)
  const nums = Array.from(ranksCount.keys())
    .map((r) => rankOrder[r])
    .sort((a, b) => a - b);

  // 연속된 숫자 5개 => 스트레이트
  const unique = Array.from(new Set(nums));
  const isStraight = (() => {
    if (unique.length >= 5) {
      const slice = unique.slice(0, 5);
      return slice[4] - slice[0] === 4; // 연속된 숫자 검사
    }

    // 특수 케이스 (A, 2, 3, 4, 5)
    return (
      unique.includes(14) &&
      [2, 3, 4, 5].every((value) => unique.includes(value))
    );
  })();

  //  같은 숫자(rank) 갯수 내림차순 정렬
  const counts = Array.from(ranksCount.values()).sort((a, b) => b - a);

  //  족보 판별
  if (isFlush && isStraight && nums.includes(14)) {
    return HAND_RANKINGS[0];
  }
  if (counts[0] === 5) {
    return HAND_RANKINGS[1];
  }
  if (isFlush && isStraight) {
    return HAND_RANKINGS[2];
  }
  if (counts[0] === 4) {
    return HAND_RANKINGS[3];
  }
  if (counts[0] === 3 && counts[1] === 2) {
    return HAND_RANKINGS[4];
  }
  if (isFlush) {
    return HAND_RANKINGS[5];
  }
  if (isStraight) {
    return HAND_RANKINGS[6];
  }
  if (counts[0] === 3) {
    return HAND_RANKINGS[7];
  }
  if (counts[0] === 2 && counts[1] === 2) {
    return HAND_RANKINGS[8];
  }
  if (counts[0] === 2) {
    return HAND_RANKINGS[9];
  }

  // 아무것도 해당 X
  return HAND_RANKINGS[10];
};

const getHandWithJoker = (
  normal: ParsedCard[],
  isEasyMode: boolean,
): THandRanking => {
  const allCards: ParsedCard[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      allCards.push({ suit, rank });
    }
  }

  let best = HAND_RANKINGS[10];

  for (const wild of allCards) {
    const testHand = [...normal, wild];
    const result = evaluateHand(testHand);

    const resultIndex = HAND_RANKINGS.findIndex((h) => h.name === result.name);
    const bestIndex = HAND_RANKINGS.findIndex((h) => h.name === best.name);

    if (result.name === "노페어" && isEasyMode) {
      best = HAND_RANKINGS[9];
      continue;
    }

    if (resultIndex < bestIndex) {
      best = result;
    }
  }

  return best;
};

const getHandWithoutJoker = (
  normal: ParsedCard[],
  isEasyMode: boolean,
): THandRanking => {
  const ranksCount = new Map<string, number>();
  normal.forEach((card) => {
    ranksCount.set(card.rank, (ranksCount.get(card.rank) || 0) + 1);
  });

  // isEasyMode일 경우 원페어가 없으면 강제로 원페어 변경
  if (isEasyMode && ![...ranksCount.values()].includes(2)) {
    normal[normal.length - 1].rank = normal[0].rank;
    return HAND_RANKINGS[9];
  }

  return evaluateHand(normal); // 족보에 맞는 결과 반환
};

// EZ 모드 (원페어 확정)
const getEZModeHand = (
  normal: ParsedCard[],
  hasJoker: boolean,
): THandRanking => {
  return hasJoker
    ? getHandWithJoker(normal, true)
    : getHandWithoutJoker(normal, true);
};

export const getBestHand = (
  cards: string[],
  isEasyMode: boolean,
): THandRanking => {
  const { normal, hasJoker } = parseHand(cards);

  if (isEasyMode) {
    return getEZModeHand(normal, hasJoker);
  }
  // 조커가 있을 경우 족보를 평가한 후 조커가 없을 경우 평가
  return hasJoker ? getHandWithJoker(normal, false) : evaluateHand(normal);
};
