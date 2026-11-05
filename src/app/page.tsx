export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-obsidian text-ivory">
      <div className="max-w-2xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-graphite text-xs text-teal">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          <span>Milestone 1 Initialized — Nabil Dawud Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ivory">
          Thoughtful Engineering.{" "}
          <span className="text-champagne">Powerful Backends.</span>
        </h1>
        <p className="text-sand text-lg">
          Software Engineer focused on Laravel, APIs, and scalable systems.
        </p>
      </div>
    </main>
  );
}
