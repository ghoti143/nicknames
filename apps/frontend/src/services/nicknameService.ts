export interface NicknameEntry {
  id: number;
  fullName: string;
  nick: string;
}

export async function fetchNicknames(): Promise<NicknameEntry[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8888";
  const res = await fetch(`${baseUrl}/api/nicknames`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch nicknames: ${res.status}`);
  }
  return await res.json();
}
