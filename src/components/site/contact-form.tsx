"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { practiceAreas } from "@/content/areas";
import {
  areaError,
  composePhone,
  digitsOnly,
  emailError,
  messageError,
  nameError,
  phoneLineError,
} from "@/lib/forms";
import { FormStatus } from "@/components/site/form-status";
import { PhoneFields } from "@/components/site/phone-fields";
import { Button } from "@/components/ui/button";

type Props = {
  defaultArea?: string;
  idPrefix?: string;
  title?: string;
  onSent?: () => void;
};

type FieldKey = "name" | "email" | "ddi" | "phone" | "area" | "message" | "consent";

const labelClass = "field-label";

export function ContactForm({ defaultArea = "", idPrefix = "lead", title, onSent }: Props) {
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
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
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const ddi = String(data.get("ddi") ?? "");
    const national = String(data.get("phone") ?? "");
    const areaSlug = String(data.get("areaSlug") ?? "");
    const message = String(data.get("message") ?? "");
    const nextErrors: Partial<Record<FieldKey, string>> = {};

    const invalidName = nameError(name);
    if (invalidName) nextErrors.name = invalidName;

    const invalidEmail = emailError(email, false);
    const line = phoneLineError(ddi, national, false);
    if (!email.trim() && !digitsOnly(national)) {
      nextErrors.email = "Informe o e-mail ou o telefone com DDI.";
      nextErrors.phone = "Informe o telefone com DDI ou o e-mail.";
    } else {
      if (invalidEmail) nextErrors.email = invalidEmail;
      if (line.ddi) nextErrors.ddi = line.ddi;
      if (line.phone) nextErrors.phone = line.phone;
    }

    const invalidArea = areaError(areaSlug);
    if (invalidArea) nextErrors.area = invalidArea;

    const invalidMessage = messageError(message, 10, 5000);
    if (invalidMessage) nextErrors.message = invalidMessage;
    if (data.get("lgpdConsent") !== "on") {
      nextErrors.consent = "É necessário autorizar o uso dos dados para a resposta.";
    }

    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length > 0) {
      setErrorTick((tick) => tick + 1);
      return;
    }

    setPending(true);
    const payload = {
      name: name.trim().replace(/\s+/g, " "),
      email: email.trim(),
      phone: digitsOnly(national) ? composePhone(ddi, national) : "",
      areaSlug,
      message: message.trim(),
      lgpdConsent: true,
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
        setNotice(body.error ?? "A mensagem não foi registrada. Tente de novo em instantes.");
        return;
      }
      setProtocol(body.protocolId ?? "");
      onSent?.();
      form.reset();
    } catch {
      setNotice("A mensagem não foi registrada. Verifique a conexão e tente de novo.");
    } finally {
      setPending(false);
    }
  }

  if (protocol) {
    return (
      <div className="contact-panel" role="status">
        <p className="font-display text-2xl font-medium">Mensagem recebida</p>
        <p className="mt-3 text-[17px]">
          Protocolo {protocol}. O escritório retorna pelo contato informado, de segunda a sexta, das
          8h às 18h.
        </p>
      </div>
    );
  }

  return (
    <div className="contact-panel">
      {title ? <h2 className="font-display text-2xl font-medium text-balance">{title}</h2> : null}
      <p className={title ? "mt-2 text-sm text-ink-soft" : "text-sm text-ink-soft"} id={`${idPrefix}-hint`}>
        E-mail ou telefone com DDI. A mensagem entra na fila de atendimento do escritório.
      </p>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="mt-6 grid gap-5"
        noValidate
        autoComplete="on"
        aria-busy={pending || undefined}
      >
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor={`${idPrefix}-website`}>Site</label>
          <input id={`${idPrefix}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="form-field">
          <label className={labelClass} htmlFor={`${idPrefix}-name`}>
            Nome
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            required
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
            className="field"
          />
          {errors.name ? (
            <p id={`${idPrefix}-name-error`} className="field-error">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label className={labelClass} htmlFor={`${idPrefix}-email`}>
            E-mail
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="next"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
            className="field"
          />
          {errors.email ? (
            <p id={`${idPrefix}-email-error`} className="field-error" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label className={labelClass} htmlFor={`${idPrefix}-phone`}>
            Telefone com DDI
          </label>
          <PhoneFields idPrefix={idPrefix} ddiError={errors.ddi} phoneError={errors.phone} />
        </div>

        <div className="form-field">
          <label className={labelClass} htmlFor={`${idPrefix}-area`}>
            Área
          </label>
          <select
            id={`${idPrefix}-area`}
            name="areaSlug"
            defaultValue={defaultArea}
            autoComplete="off"
            aria-invalid={errors.area ? true : undefined}
            aria-describedby={errors.area ? `${idPrefix}-area-error` : undefined}
            className="field field-select"
          >
            <option value="">Ainda não sei</option>
            {practiceAreas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
          {errors.area ? (
            <p id={`${idPrefix}-area-error`} className="field-error" role="alert">
              {errors.area}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label className={labelClass} htmlFor={`${idPrefix}-message`}>
            Mensagem
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            required
            minLength={10}
            rows={5}
            autoComplete="off"
            enterKeyHint="send"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${idPrefix}-message-error` : `${idPrefix}-hint`}
            className="field field-area"
          />
          {errors.message ? (
            <p id={`${idPrefix}-message-error`} className="field-error" role="alert">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label className="flex items-start gap-3 text-sm leading-5">
            <input
              name="lgpdConsent"
              type="checkbox"
              required
              autoComplete="off"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? `${idPrefix}-consent-error` : undefined}
              className="field-check"
            />
            <span>
              Autorizo o uso destes dados para responder ao contato, conforme a{" "}
              <a href="/privacidade" className="underline underline-offset-4">
                política de privacidade
              </a>
              .
            </span>
          </label>
          {errors.consent ? (
            <p id={`${idPrefix}-consent-error`} className="field-error" role="alert">
              {errors.consent}
            </p>
          ) : null}
        </div>

        <FormStatus pending={pending} pendingLabel="Enviando a mensagem…" error={notice} />
        <div className="form-field">
          <Button type="submit" pill disabled={pending}>
            {pending ? "Enviando a mensagem…" : "Enviar mensagem"}
          </Button>
        </div>
      </form>
    </div>
  );
}
