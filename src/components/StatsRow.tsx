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
          className="rounded-2xl border border-app bg-card p-6 text-center dark:bg-[#0b1e36] dark:border-white/10"
        >
          <div className="text-2xl md:text-3xl font-bold text-orange-600">{s.n}</div>
          <div className="mt-1 text-sm text-app/70">{s.k}</div>
        </AnimatedInView>
      ))}
    </div>
  )
}