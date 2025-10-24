// src/components/CtaBanner.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AnimatedInView from "@/components/AnimatedInView"

export default function CtaBanner({
  title,
  text,
  primary,
  secondary,
}: {
  title: string
  text: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}) {
  return (
    <AnimatedInView className="rounded-2xl border bg-orange-50 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div className="text-lg md:text-xl font-semibold">{title}</div>
        <div className="text-neutral-700 text-sm">{text}</div>
      </div>
      <div className="flex gap-3">
        <Link href={primary.href}>
          <Button className="bg-orange-600 hover:bg-orange-700">{primary.label}</Button>
        </Link>
        {secondary && (
          <Link href={secondary.href}>
            <Button variant="outline">{secondary.label}</Button>
          </Link>
        )}
      </div>
    </AnimatedInView>
  )
}