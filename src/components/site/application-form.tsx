"use client";

import { useState, type FormEvent } from "react";
import { candidateRoles } from "@/content/roles";
import { Button } from "@/components/ui/button";

const fieldClass =
  "h-12 w-full rounded-surface border border-line bg-paper px-3 text-base text-ink";
const labelClass = "mb-1.5 block text-sm font-medium";

export function ApplicationForm() {
  const [role, setRole] = useState<string>(candidateRoles[0]);
  const [error, setError] = useState("");
  const [protocol, setProtocol] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/candidaturas", {
        method: "POST",
        body: new FormData(form),
      });
      const body = (await response.json()) as { error?: string; protocolId?: string };
      if (!response.ok) {
        setError(body.error ?? "Não foi possível enviar.");
        return;
      }
      setProtocol(body.protocolId ?? "");
      form.reset();
      setRole(candidateRoles[0]);
    } catch {
      setError("Não foi possível enviar. Verifique a conexão e tente de novo.");
    } finally {
      setPending(false);
    }
  }

  if (protocol) {
    return (
      <p role="status" className="text-[17px]">
        Candidatura recebida{protocol ? `. Protocolo ${protocol}` : ""}. O escritório lê o material
        na seleção.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="job-website">Site</label>
        <input id="job-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label className={labelClass} htmlFor="job-name">
          Nome
        </label>
        <input id="job-name" name="name" required autoComplete="name" className={fieldClass} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="job-email">
            E-mail
          </label>
          <input id="job-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="job-phone">
            Telefone
          </label>
          <input id="job-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="job-role">
          Interesse
        </label>
        <select
          id="job-role"
          name="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className={fieldClass}
        >
          {candidateRoles.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {role === "Outro" ? (
        <div>
          <label className={labelClass} htmlFor="job-role-other">
            Qual função
          </label>
          <input id="job-role-other" name="roleOther" required className={fieldClass} />
        </div>
      ) : null}
      <div>
        <label className={labelClass} htmlFor="job-message">
          Apresentação
        </label>
        <textarea id="job-message" name="message" rows={5} className={`${fieldClass} h-auto py-3`} />
      </div>
      <div>
        <label className={labelClass} htmlFor="job-cv">
          Currículo
        </label>
        <input
          id="job-cv"
          name="curriculum"
          type="file"
          required
          accept=".pdf,.doc,.docx,.odt,.rtf,.txt,application/pdf"
          className="block w-full text-sm file:mr-4 file:h-11 file:rounded-surface file:border-0 file:bg-ink file:px-4 file:text-sm file:text-paper"
        />
        <p className="mt-2 text-sm text-ink-soft">PDF, DOC, DOCX, ODT, RTF ou TXT, até 10 MB.</p>
      </div>
      <label className="flex items-start gap-3 text-sm leading-5">
        <input name="lgpdConsent" type="checkbox" required className="mt-1" />
        <span>
          Autorizo o uso destes dados e do currículo na seleção, conforme a{" "}
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
          {pending ? "Enviando…" : "Enviar candidatura"}
        </Button>
      </div>
    </form>
  );
}
