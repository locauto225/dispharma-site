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
    <AnimatedInView className="relative overflow-hidden rounded-2xl border border-app bg-card p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pl-5 md:pl-6 border-l-6 border-orange-500/85 dark:border-orange-400/75">
      {/* Accent de fond plus présent (dégradé orangé discret de gauche vers la droite) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-orange-500/10 via-orange-500/0 to-transparent" />
      {/* Accents orange subtils pour rappeler la marque, tout en restant sombre */}
      <div aria-hidden className="pointer-events-none absolute -z-10 right-[-80px] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-orange-500/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-4 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      <div>
        <div className="text-lg md:text-xl font-semibold text-app">{title}</div>
        <div className="text-app-muted text-sm">{text}</div>
      </div>
      <div className="flex gap-3">
        <Link href={primary.href}>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">{primary.label}</Button>
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