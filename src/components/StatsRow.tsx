// src/components/StatsRow.tsx
import AnimatedInView from "@/components/AnimatedInView"

export default function StatsRow({
  stats,
}: {
  stats: { n: string; k: string }[]
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s) => (
        <AnimatedInView
          key={s.k}
          className="rounded-2xl border bg-white p-6 text-center"
        >
          <div className="text-2xl md:text-3xl font-bold text-orange-600">{s.n}</div>
          <div className="mt-1 text-sm text-neutral-600">{s.k}</div>
        </AnimatedInView>
      ))}
    </div>
  )
}