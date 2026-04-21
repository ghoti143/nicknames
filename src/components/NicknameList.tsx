import "server-only"; // Safety check: this file can only run on the server
import { db } from '@/lib/drizzle';
import { nicknames, fullnames } from '@/lib/schema';
import { eq } from 'drizzle-orm';

// Define the shape of our row
interface NicknameEntry {
  fullname: string;
  nickname: string;
}

export default async function NicknameList() {
  console.log("starting DB query", new Date().toISOString());
  const rows = await db
    .select({ fullname: fullnames.fullname, nickname: nicknames.nickname })
    .from(nicknames)
    .innerJoin(fullnames, eq(nicknames.fullname_id, fullnames.id));
  console.log("finished DB query", new Date().toISOString());

  const nicknamesData: NicknameEntry[] = rows.map((row) => ({
    fullname: row.fullname,
    nickname: row.nickname,
  }));

  return (
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-800/50">
        <h3 className="font-bold text-white">Database Users</h3>
      </div>
      <ul className="divide-y divide-zinc-800">
        {nicknamesData.map((row, index) => (
          <li
            key={index}
            className="px-6 py-4 flex justify-between items-center group hover:bg-zinc-800/30 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-zinc-100">
                {row.fullname}
              </p>
              <p className="text-xs text-zinc-500">Full Name</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono font-bold text-blue-400">
                @{row.nickname}
              </p>
              <p className="text-xs text-zinc-500">Nickname</p>
            </div>
          </li>
        ))}
      </ul>

      {nicknamesData.length === 0 && (
        <p className="p-10 text-center text-zinc-500">
          No nicknames found in the database.
        </p>
      )}
    </div>
  );
}
