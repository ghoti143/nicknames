import "server-only"; // Safety check: this file can only run on the server

// Define the shape of our row
interface NicknameEntry {
  id: number;
  fullname: string;
  nickname: string;
}

export default async function NicknameList() {
  console.log("starting fetch", new Date().toISOString());
  const res = await fetch('/api/nicknames', { cache: 'no-store' });
  const nicknamesData: NicknameEntry[] = await res.json();
  console.log("finished fetch", new Date().toISOString());

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
