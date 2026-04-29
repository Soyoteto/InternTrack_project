export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">InternTrack</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your job and internship applications</p>
          </div>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
            + New Application
          </button>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <section className="rounded-xl bg-slate-200/50 p-4">
            <h2 className="mb-4 font-semibold text-slate-700 flex items-center gap-2">
              Pending (2)
            </h2>
            <div className="flex flex-col gap-3">
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="font-bold text-slate-900">Google</h3>
                <p className="text-sm text-slate-500 mb-3">Software Engineer Intern</p>
                <span className="inline-block rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">Reviewing</span>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="font-bold text-slate-900">Apple</h3>
                <p className="text-sm text-slate-500 mb-3">Front-end Developer</p>
                <span className="inline-block rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">Applied</span>
              </div>
            </div>
          </section>

          <section className="rounded-xl bg-slate-200/50 p-4">
            <h2 className="mb-4 font-semibold text-slate-700 flex items-center gap-2">
              Interviews (1)
            </h2>
            <div className="flex flex-col gap-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-sm">
                <h3 className="font-bold text-slate-900">Microsoft</h3>
                <p className="text-sm text-slate-500 mb-3">Fullstack Intern</p>
                <span className="inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">Technical Round</span>
              </div>
            </div>
          </section>

          <section className="rounded-xl bg-slate-200/50 p-4">
            <h2 className="mb-4 font-semibold text-slate-700 flex items-center gap-2">
              Finalized (1)
            </h2>
            <div className="flex flex-col gap-3">
              <div className="rounded-lg border bg-white p-4 shadow-sm opacity-75">
                <h3 className="font-bold text-slate-900">Amazon</h3>
                <p className="text-sm text-slate-500 mb-3">Backend Intern</p>
                <span className="inline-block rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">Rejected</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}