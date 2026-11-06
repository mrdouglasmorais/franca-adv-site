"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { candidateRoles } from "@/content/roles";
import { CV_MAX_BYTES, emailError, messageError, nameError, phoneLineError } from "@/lib/forms";
import { FormStatus } from "@/components/site/form-status";
import { PhoneFields } from "@/components/site/phone-fields";
import { Button } from "@/components/ui/button";

const labelClass = "field-label";

export function ApplicationForm() {
  const [role, setRole] = useState<string>(candidateRoles[0]);
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "ddi" | "phone" | "role" | "message" | "file" | "consent", string>>>({});
  const [notice, setNotice] = useState("");
  const [protocol, setProtocol] = useState("");
  const [pending, setPending] = useState(false);
  const [errorTick, setErrorTick] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!errorTick) return;
    formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, [errorTick]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: typeof errors = {};
    const invalidName = nameError(String(data.get("name") ?? ""));
    if (invalidName) nextErrors.name = invalidName;
    const invalidEmail = emailError(String(data.get("email") ?? ""), true);
    if (invalidEmail) nextErrors.email = invalidEmail;
    const line = phoneLineError(String(data.get("ddi") ?? ""), String(data.get("phone") ?? ""), false);
    if (line.ddi) nextErrors.ddi = line.ddi;
    if (line.phone) nextErrors.phone = line.phone;
    const roleTitle = role === "Outro" ? String(data.get("roleOther") ?? "").trim() : role;
    if (!roleTitle) nextErrors.role = "Informe o cargo de interesse.";
    else if (roleTitle.length > 120) nextErrors.role = "O cargo deve ter no máximo 120 caracteres.";
    const invalidMessage = messageError(String(data.get("message") ?? ""), 0, 4000);
    if (invalidMessage) nextErrors.message = invalidMessage;
    const file = data.get("curriculum");
    if (!(file instanceof File) || file.size <= 0) nextErrors.file = "Anexe o currículo.";
    else if (file.size > CV_MAX_BYTES) nextErrors.file = "O currículo deve ter no máximo 10 MB.";
    else {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!["pdf", "doc", "docx", "odt", "rtf", "txt"].includes(extension)) {
        nextErrors.file = "Envie o currículo em PDF, DOC, DOCX, ODT, RTF ou TXT.";
      }
    }
    if (data.get("lgpdConsent") !== "on") nextErrors.consent = "É preciso autorizar o uso dos dados para a seleção.";
    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length > 0) {
      setErrorTick((tick) => tick + 1);
      return;
    }

    const bodyData = new FormData(form);
    setPending(true);
    try {
      const response = await fetch("/api/candidaturas", {
        method: "POST",
        body: bodyData,
      });
      const body = (await response.json()) as { error?: string; protocolId?: string };
      if (!response.ok) {
        setNotice(body.error ?? "A candidatura não foi registrada. Tente de novo em instantes.");
        return;
      }
      setProtocol(body.protocolId ?? "");
      form.reset();
      setRole(candidateRoles[0]);
    } catch {
      setNotice("A candidatura não foi registrada. Verifique a conexão e tente de novo.");
    } finally {
      setPending(false);
    }
  }

  if (protocol) {
    return (
      <div className="contact-panel" role="status">
        <p className="font-display text-2xl font-medium">Candidatura recebida</p>
        <p className="mt-3 text-[17px]">
          {protocol ? `Protocolo ${protocol}. ` : ""}A equipe lê o currículo na seleção.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="contact-panel grid gap-5"
      noValidate
      autoComplete="on"
      aria-busy={pending || undefined}
    >
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="job-website">Site</label>
        <input id="job-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label className={labelClass} htmlFor="job-name">
          Nome
        </label>
        <input
          id="job-name"
          name="name"
          required
          autoComplete="name"
          autoCapitalize="words"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "job-name-error" : undefined}
          className="field"
        />
        {errors.name ? (
          <p id="job-name-error" className="field-error" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div>
        <label className={labelClass} htmlFor="job-email">
          E-mail
        </label>
        <input
          id="job-email"
          name="email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "job-email-error" : undefined}
          className="field"
        />
        {errors.email ? (
          <p id="job-email-error" className="field-error" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div>
        <label className={labelClass} htmlFor="job-phone">
          Telefone com DDI
        </label>
        <PhoneFields idPrefix="job" ddiError={errors.ddi} phoneError={errors.phone} />
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
          autoComplete="off"
          aria-invalid={errors.role ? true : undefined}
          aria-describedby={errors.role ? "job-role-error" : undefined}
          className="field field-select"
        >
          {candidateRoles.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {role !== "Outro" && errors.role ? (
          <p id="job-role-error" className="field-error" role="alert">
            {errors.role}
          </p>
        ) : null}
      </div>
      {role === "Outro" ? (
        <div>
          <label className={labelClass} htmlFor="job-role-other">
            Qual função
          </label>
          <input
            id="job-role-other"
            name="roleOther"
            required
            autoComplete="organization-title"
            aria-invalid={errors.role ? true : undefined}
            aria-describedby={errors.role ? "job-role-error" : undefined}
            className="field"
          />
          {errors.role ? (
            <p id="job-role-error" className="field-error" role="alert">
              {errors.role}
            </p>
          ) : null}
        </div>
      ) : null}
      <div>
        <label className={labelClass} htmlFor="job-message">
          Apresentação
        </label>
        <textarea
          id="job-message"
          name="message"
          rows={5}
          autoComplete="off"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "job-message-error" : undefined}
          className="field field-area"
        />
        {errors.message ? (
          <p id="job-message-error" className="field-error" role="alert">
            {errors.message}
          </p>
        ) : null}
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
        {errors.file ? (
          <p id="job-file-error" className="field-error" role="alert">
            {errors.file}
          </p>
        ) : null}
      </div>
      <label className="flex items-start gap-3 text-sm leading-5">
        <input
          name="lgpdConsent"
          type="checkbox"
          required
          autoComplete="off"
          aria-invalid={errors.consent ? true : undefined}
          className="field-check"
        />
        <span>
          Autorizo o uso destes dados e do currículo na seleção, conforme a{" "}
          <a href="/privacidade" className="underline underline-offset-4">
            política de privacidade
          </a>
          .
        </span>
      </label>
      {errors.consent ? (
        <p className="field-error" role="alert">
          {errors.consent}
        </p>
      ) : null}
      <FormStatus
        pending={pending}
        pendingLabel="Enviando a candidatura…"
        error={notice}
      />
      <div>
        <Button type="submit" pill disabled={pending}>
          {pending ? "Enviando a candidatura…" : "Enviar candidatura"}
        </Button>
      </div>
    </form>
  );
}
