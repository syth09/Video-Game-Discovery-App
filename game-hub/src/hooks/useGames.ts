import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

// Create a interface to fulfill the shape of the response object with the schema on rawg
interface Game {
  id: number;
  name: string;
}

interface FetchGamesRespond {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // cancellation
    const controller = new AbortController();
    // use angle brackets to provide  generics type args
    apiClient
      .get<FetchGamesRespond>("/games", { signal: controller.signal })
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
