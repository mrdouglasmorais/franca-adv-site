"use client";

import { useEffect, useRef, useState } from "react";
import { firm } from "@/content/firm";
import { ContactForm } from "@/components/site/contact-form";
import { Button } from "@/components/ui/button";

export function AreaContact({
  areaName,
  areaSlug,
}: {
  areaName: string;
  areaSlug: string;
}) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("input[name='name']")?.focus({ preventScroll: true });
  }, [open]);

  return (
    <div className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]">
      {open ? (
        <div ref={panelRef} className="area-form-in">
          <ContactForm
            defaultArea={areaSlug}
            idPrefix={areaSlug}
            title={`Falar sobre ${areaName}`}
            onSent={() => setSent(true)}
          />
          {sent ? null : (
            <button
              type="button"
              className="mt-4 text-sm underline underline-offset-4"
              onClick={() => setOpen(false)}
            >
              Fechar formulário
            </button>
          )}
        </div>
      ) : (
        <div className="contact-panel">
          <h2 className="font-display text-2xl font-medium text-balance">
            Falar sobre {areaName}
          </h2>
          <p className="mt-2 text-sm text-ink-soft">O formulário abre nesta página.</p>
          <div className="mt-6">
            <Button type="button" pill onClick={() => setOpen(true)}>
              Escrever a mensagem
            </Button>
          </div>
        </div>
      )}
      <div className="mt-4">
        <Button href={firm.contact.whatsappUrl} tone="ghost" pill className="w-full">
          Chamar no WhatsApp
        </Button>
      </div>
    </div>
  );
}
