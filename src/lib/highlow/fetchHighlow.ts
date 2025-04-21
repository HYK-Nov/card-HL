import { Session } from "@supabase/supabase-js";

type TincreaseCoin = {
  session: Session;
  score: number;
};

export const increaseCoin = async ({
  session,
  score,
}: TincreaseCoin): Promise<number | null> => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_FUNCTIONS}/increaseCoin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ totalScore: score }),
      },
    );

    if (!res.ok) {
      const errorText = await res.text(); // 서버에서 JSON이 아닐 수 있음
      throw new Error(`Increase coin failed: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    return data.total_score;
  } catch (error) {
    console.error("increaseCoin error:", error);
    throw error; // 상위에서 catch 할 수 있도록 재던짐
  }
};
