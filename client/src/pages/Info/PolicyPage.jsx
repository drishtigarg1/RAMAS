export default function PolicyPage({ title, intro, sections }) {
  return <main className="mx-auto max-w-4xl px-4 py-16">
    <h1 className="text-4xl font-bold text-[#102B52]">{title}</h1>
    <p className="mt-4 text-slate-600">{intro}</p>
    <div className="mt-10 space-y-8">
      {sections.map((section) => <section key={section.title}>
        <h2 className="text-xl font-semibold text-[#102B52]">{section.title}</h2>
        <p className="mt-2 leading-7 text-slate-600">{section.body}</p>
      </section>)}
    </div>
  </main>;
}
