// src/lib/faceit.ts
// Тонкая обёртка над FACEIT Data API v4. Запросы идут через dev-прокси /api/faceit,
// который инжектит Authorization из FACEIT_API_KEY (см. vite.config.ts).
// На проде нужен внешний прокси (Vercel Functions / отдельный бэкенд).

export const GAMESPORT_TEAM_ID = "970ac3bd-3b9c-483b-9c9c-fd4ff7137a4b";
export const CS2 = "cs2";

const BASE = "/api/faceit";

async function get<T>(path: string): Promise<T> {
  const r = await fetch(`${BASE}${path}`, { headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error(`FACEIT ${r.status} ${path}`);
  return r.json() as Promise<T>;
}

export type FaceitTeam = {
  team_id: string;
  name: string;
  nickname: string;
  avatar: string;
  cover_image: string;
  leader: string;
  members: Array<{
    user_id: string;
    nickname: string;
    avatar: string;
    country: string;
    skill_level: number;
    game_player_id: string;
    faceit_url: string;
  }>;
};

export type FaceitSegmentStats = Record<string, string>;
export type FaceitSegment = {
  type: string;       // "Map"
  mode: string;       // "5v5"
  label: string;      // "de_mirage"
  img_small?: string;
  img_regular?: string;
  stats: FaceitSegmentStats;
};

export type FaceitTeamStats = {
  team_id: string;
  lifetime: Record<string, string>;
  segments: FaceitSegment[];
};

export type FaceitPlayer = {
  player_id: string;
  nickname: string;
  avatar: string;
  country: string;
  games: Record<string, { skill_level: number; faceit_elo: number; region: string }>;
};

export type FaceitMatchHistoryItem = {
  match_id: string;
  game_id: string;
  competition_name: string;
  finished_at: number;
  results: { winner: string; score: Record<string, number> };
  teams: Record<string, { team_id: string; nickname: string; players: Array<{ player_id: string; nickname: string }> }>;
};

export const getTeam = (teamId = GAMESPORT_TEAM_ID) =>
  get<FaceitTeam>(`/teams/${teamId}`);

export const getTeamStats = (teamId = GAMESPORT_TEAM_ID, game = CS2) =>
  get<FaceitTeamStats>(`/teams/${teamId}/stats/${game}`);

export const getPlayer = (playerId: string) =>
  get<FaceitPlayer>(`/players/${playerId}`);

export const getPlayerStats = (playerId: string, game = CS2) =>
  get<FaceitTeamStats>(`/players/${playerId}/stats/${game}`);

export const getPlayerHistory = (playerId: string, game = CS2, limit = 20) =>
  get<{ items: FaceitMatchHistoryItem[] }>(
    `/players/${playerId}/history?game=${game}&limit=${limit}`,
  );

// Удобный парсер для карт в /teams/{id}/stats/{game}
export type MapStat = {
  label: string;       // de_mirage
  short: string;       // MIR
  img?: string;
  matches: number;
  wins: number;
  winRate: number;     // 0..100
};

const MAP_SHORT: Record<string, string> = {
  de_mirage: "MIR",
  de_inferno: "INF",
  de_nuke: "NUK",
  de_anubis: "ANU",
  de_ancient: "ANC",
  de_overpass: "OVP",
  de_vertigo: "VRT",
  de_dust2: "D2",
  de_train: "TRN",
};

export function parseMapStats(stats: FaceitTeamStats): MapStat[] {
  const segs = stats.segments?.filter((s) => s.type === "Map") ?? [];
  return segs
    .map((s): MapStat => {
      const matches = Number(s.stats["Matches"] ?? 0);
      const wins = Number(s.stats["Wins"] ?? 0);
      const wrRaw = Number(s.stats["Win Rate %"] ?? 0);
      return {
        label: s.label,
        short: MAP_SHORT[s.label] ?? s.label.replace(/^de_/, "").slice(0, 3).toUpperCase(),
        img: s.img_regular ?? s.img_small,
        matches,
        wins,
        winRate: matches ? Math.round(wrRaw || (wins / matches) * 100) : 0,
      };
    })
    .sort((a, b) => b.matches - a.matches);
}
