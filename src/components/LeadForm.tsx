"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  defaultMotif?: string;
  defaultProfil?: "Laboratoire" | "Grossiste/Pharmacie" | "Autre";
};

const PROFILS = ["Laboratoire", "Grossiste/Pharmacie", "Autre"] as const;

const MOTIFS = [
  "Découvrir nos solutions",
  "Devenir partenaire",
  "Catalogue & disponibilités",
  "Logistique (import, stockage, traçabilité)",
  "Autre",
] as const;

export default function LeadForm({ defaultMotif, defaultProfil }: Props) {
  const [profil, setProfil] = useState<Props["defaultProfil"]>(defaultProfil ?? undefined);
  const [motif, setMotif] = useState<string | undefined>(defaultMotif ?? undefined);
  const [nom, setNom] = useState("");
  const [societe, setSociete] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | "ok" | "ko">(null);
  const [hp, setHp] = useState(""); // honeypot anti-bot

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hp) return;
    if (!profil || !motif || !nom || !email) {
      setOk("ko");
      return;
    }

    setSubmitting(true);
    setOk(null);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setOk("ok");
      setProfil(defaultProfil ?? undefined);
      setMotif(defaultMotif ?? undefined);
      setNom("");
      setSociete("");
      setEmail("");
      setTel("");
      setMessage("");
    } catch {
      setOk("ko");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Profil */}
      <div>
        <label htmlFor="profil" className="text-sm font-medium">
          Je suis <span className="text-red-600">*</span>
        </label>
        <select
          id="profil"
          required
          value={profil ?? ""}
          onChange={(e) => setProfil(e.target.value as Props["defaultProfil"])}
          className="mt-1 w-full rounded-md border border-app bg-card text-app placeholder:text-app-muted px-3 py-2 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500/60 focus:shadow-[0_0_0_3px_rgba(234,88,12,0.12)]"
        >
          <option value="" disabled>
            Sélectionner votre profil
          </option>
          {PROFILS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Motif */}
      <div>
        <label htmlFor="motif" className="text-sm font-medium">
          Motif <span className="text-red-600">*</span>
        </label>
        <select
          id="motif"
          required
          value={motif ?? ""}
          onChange={(e) => setMotif(e.target.value)}
          className="mt-1 w-full rounded-md border border-app bg-card text-app placeholder:text-app-muted px-3 py-2 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500/60 focus:shadow-[0_0_0_3px_rgba(234,88,12,0.12)]"
        >
          <option value="" disabled>
            Sélectionner un motif
          </option>
          {MOTIFS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Identité */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nom" className="text-sm font-medium">
            Nom & Prénom <span className="text-red-600">*</span>
          </label>
          <input
            id="nom"
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="mt-1 w-full rounded-md border border-app bg-card text-app placeholder:text-app-muted px-3 py-2 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500/60 focus:shadow-[0_0_0_3px_rgba(234,88,12,0.12)]"
          />
        </div>
        <div>
          <label htmlFor="societe" className="text-sm font-medium">
            Société
          </label>
          <input
            id="societe"
            value={societe}
            onChange={(e) => setSociete(e.target.value)}
            className="mt-1 w-full rounded-md border border-app bg-card text-app placeholder:text-app-muted px-3 py-2 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500/60 focus:shadow-[0_0_0_3px_rgba(234,88,12,0.12)]"
          />
        </div>
      </div>

      {/* Contact */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-app bg-card text-app placeholder:text-app-muted px-3 py-2 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500/60 focus:shadow-[0_0_0_3px_rgba(234,88,12,0.12)]"
          />
        </div>
        <div>
          <label htmlFor="tel" className="text-sm font-medium">
            Téléphone
          </label>
          <input
            id="tel"
            inputMode="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            className="mt-1 w-full rounded-md border border-app bg-card text-app placeholder:text-app-muted px-3 py-2 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500/60 focus:shadow-[0_0_0_3px_rgba(234,88,12,0.12)]"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-md border border-app bg-card text-app placeholder:text-app-muted px-3 py-2 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500/60 focus:shadow-[0_0_0_3px_rgba(234,88,12,0.12)]"
          placeholder="Décrivez brièvement votre besoin (facultatif)."
        />
      </div>

      <p className="text-xs text-app-muted">
        Données utilisées uniquement pour répondre à votre demande. Jamais partagées avec des tiers.
        Horaires : 8h–17h (lun–ven) — réponse sous 48h.
      </p>

      {ok === "ok" && (
        <div className="text-sm text-green-700 mt-1">
          Merci ! Nous revenons vers vous sous 48h ouvrées.
        </div>
      )}
      {ok === "ko" && (
        <div className="text-sm text-red-700 mt-1">
          Veuillez vérifier les champs requis puis réessayer.
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="h-11 w-full bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-70"
        >
          {submitting ? "Envoi..." : "Envoyer le message"}
        </Button>
      </div>
    </form>
  );
}