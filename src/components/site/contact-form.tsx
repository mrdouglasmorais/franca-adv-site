"use client";

import { useState, type FormEvent } from "react";
import { practiceAreas } from "@/content/areas";
import { Button } from "@/components/ui/button";

type Props = {
  defaultArea?: string;
  idPrefix?: string;
};

const fieldClass =
  "h-12 w-full rounded-surface border border-line bg-paper px-3 text-base text-ink";
const labelClass = "mb-1.5 block text-sm font-medium";

export function ContactForm({ defaultArea = "", idPrefix = "lead" }: Props) {
  const [error, setError] = useState("");
  const [protocol, setProtocol] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      areaSlug: String(data.get("areaSlug") ?? ""),
      message: String(data.get("message") ?? ""),
      lgpdConsent: data.get("lgpdConsent") === "on",
      website: String(data.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as { error?: string; protocolId?: string };
      if (!response.ok) {
        setError(body.error ?? "Não foi possível enviar.");
        return;
      }
      setProtocol(body.protocolId ?? "");
      form.reset();
    } catch {
      setError("Não foi possível enviar. Verifique a conexão e tente de novo.");
    } finally {
      setPending(false);
    }
  }

  if (protocol) {
    return (
      <p role="status" className="text-[17px]">
        Mensagem recebida{protocol ? `. Protocolo ${protocol}` : ""}. O escritório retorna pelo
        contato informado.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <p className="text-sm text-ink-soft" id={`${idPrefix}-hint`}>
        E-mail ou telefone. A mensagem segue para a fila de atendimento do escritório.
      </p>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Site</label>
        <input id={`${idPrefix}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-name`}>
          Nome
        </label>
        <input id={`${idPrefix}-name`} name="name" required autoComplete="name" className={fieldClass} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${idPrefix}-email`}>
            E-mail
          </label>
          <input id={`${idPrefix}-email`} name="email" type="email" autoComplete="email" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor={`${idPrefix}-phone`}>
            Telefone
          </label>
          <input id={`${idPrefix}-phone`} name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-area`}>
          Área
        </label>
        <select
          id={`${idPrefix}-area`}
          name="areaSlug"
          defaultValue={defaultArea}
          className={fieldClass}
        >
          <option value="">Ainda não sei</option>
          {practiceAreas.map((area) => (
            <option key={area.slug} value={area.slug}>
              {area.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-message`}>
          Mensagem
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          required
          minLength={10}
          rows={5}
          className={`${fieldClass} h-auto py-3`}
        />
      </div>
      <label className="flex items-start gap-3 text-sm leading-5">
        <input name="lgpdConsent" type="checkbox" required className="mt-1" />
        <span>
          Autorizo o uso destes dados para responder ao contato, conforme a{" "}
          <a href="/privacidade" className="underline underline-offset-4">
            política de privacidade
          </a>
          .
        </span>
      </label>
      {error ? (
        <p role="alert" className="text-sm text-seal">
          {error}
        </p>
      ) : null}
      <div>
        <Button type="submit" pill disabled={pending}>
          {pending ? "Enviando…" : "Enviar mensagem"}
        </Button>
      </div>
    </form>
  );
}
