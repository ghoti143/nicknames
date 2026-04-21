import "server-only"; // Safety check: this file can only run on the server
import { fetchNicknames } from "../services/nicknameService";

export default async function NicknameList() {
  const nicknamesData = await fetchNicknames();

  return (
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-800/50">
        <h3 className="font-bold text-white">Database Users</h3>
      </div>
      <ul className="divide-y divide-zinc-800">
        {nicknamesData.map((row) => (
          <li
            key={row.id}
            className="px-6 py-4 flex justify-between items-center group hover:bg-zinc-800/30 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-zinc-100">
                {row.fullName}
              </p>
              <p className="text-xs text-zinc-500">Full Name</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono font-bold text-blue-400">
                @{row.nick}
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
