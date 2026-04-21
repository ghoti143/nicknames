import { Suspense } from "react";
import NicknameList from "@/components/NicknameList";

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-8 md:p-24">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Nicknames
          </h1>
          <p className="text-zinc-500 mt-2">
            Here are today's nicknames
          </p>
        </header>

        <Suspense
          fallback={
            <div className="w-64 h-48 bg-zinc-900 animate-pulse rounded-xl flex items-center justify-center text-zinc-700">
              Loading nicknames...
            </div>
          }
        >
          <NicknameList />
        </Suspense>
      </div>
    </main>
  );
}
