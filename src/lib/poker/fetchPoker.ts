import { Session } from "@supabase/supabase-js";

type TdecreaseCoin = {
  session: Session;
  bet: number;
};
export const decreaseCoin = async ({
  session,
  bet,
}: TdecreaseCoin): Promise<number | null> => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_FUNCTIONS}/decreaseScore`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ usedCoins: bet }),
      },
    );

    if (!res.ok) {
      console.error("decreaseCoin fetch failed:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();

    if (typeof data.total_score === "number") {
      return data.total_score;
    } else {
      console.error("Unexpected response:", data);
      return null;
    }
  } catch (err) {
    console.error("decreaseCoin error:", err);
    return null;
  }
};
