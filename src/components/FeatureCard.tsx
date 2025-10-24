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
    <AnimatedInView className="rounded-2xl border bg-white p-5">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm text-neutral-600">{description}</div>
    </AnimatedInView>
  )
}