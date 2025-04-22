type TRankingResponse = {
  name: string;
  total_score: number;
  picture: string;
};

export const getRanking = async (): Promise<TRankingResponse[] | null> => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_FUNCTIONS}/topUsers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      console.error("getRanking fetch failed:", res.status, res.statusText);
      return null;
    }

    const data: TRankingResponse[] = await res.json();

    return data;
  } catch (e) {
    console.error("getRanking error:", e);
    return null;
  }
};
