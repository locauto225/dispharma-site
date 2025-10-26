// src/components/FeatureCard.tsx
import AnimatedInView from "@/components/AnimatedInView"

export default function FeatureCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <AnimatedInView className="rounded-2xl border border-app bg-card p-5 dark:bg-[#0b1e36] dark:border-white/10">
      <div className="text-sm font-semibold text-app">{title}</div>
      <div className="mt-1 text-sm text-app/70">{description}</div>
    </AnimatedInView>
  )
}