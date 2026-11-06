"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { DIAL_GROUPS, dialByCode, flagEmoji, formatNational, maskPhoneValue, phonePlaceholder } from "@/lib/phone";

type Props = {
  idPrefix: string;
  ddiError?: string;
  phoneError?: string;
};

export function PhoneFields({ idPrefix, ddiError, phoneError }: Props) {
  const [ddi, setDdi] = useState("+55");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const phoneRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef("");
  const queryTimer = useRef(0);
  const listId = useId();
  const options = DIAL_GROUPS.flatMap((group) => group.options);
  const selected = dialByCode(ddi);

  useLayoutEffect(() => {
    const field = phoneRef.current;
    const caret = caretRef.current;
    if (!field || caret == null) return;
    field.setSelectionRange(caret, caret);
    caretRef.current = null;
  }, [phone]);

  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  const activeCode = options[active]?.code ?? "";

  useEffect(() => {
    if (!open || !activeCode) return;
    document.getElementById(`${listId}-${activeCode}`)?.scrollIntoView({ block: "nearest" });
  }, [open, activeCode, listId]);

  function choose(code: string) {
    const next = `+${code}`;
    setDdi(next);
    setPhone((current) => formatNational(next, current));
    setOpen(false);
  }

  function onDdiKey(event: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActive((current) => {
        const start = open ? current : options.findIndex((item) => item.code === selected.code);
        const base = start < 0 ? 0 : start;
        return event.key === "ArrowDown" ? Math.min(last, base + 1) : Math.max(0, base - 1);
      });
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setOpen(true);
      setActive(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setOpen(true);
      setActive(last);
      return;
    }
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && open) {
      event.preventDefault();
      const option = options[active];
      if (option) choose(option.code);
      return;
    }
    if (/^\p{L}$/u.test(event.key)) {
      event.preventDefault();
      queryRef.current = `${queryRef.current}${event.key}`.toLocaleLowerCase("pt-BR");
      window.clearTimeout(queryTimer.current);
      queryTimer.current = window.setTimeout(() => {
        queryRef.current = "";
      }, 600);
      const found = options.findIndex((item) => item.name.toLocaleLowerCase("pt-BR").startsWith(queryRef.current));
      if (found >= 0) {
        setOpen(true);
        setActive(found);
      }
    }
  }

  function onPhoneChange(event: ChangeEvent<HTMLInputElement>) {
    const field = event.currentTarget;
    const inputType = (event.nativeEvent as InputEvent).inputType;
    const caret = field.selectionStart ?? field.value.length;

    if (inputType === "deleteContentBackward") {
      const removed = phone[caret] ?? "";
      if (removed && /\D/.test(removed)) {
        const digits = phone.replace(/\D/g, "");
        const digitsBefore = phone.slice(0, caret).replace(/\D/g, "").length;
        const dropAt = digitsBefore - 1;
        if (dropAt >= 0) {
          const nextDigits = `${digits.slice(0, dropAt)}${digits.slice(dropAt + 1)}`;
          const value = formatNational(ddi, nextDigits);
          caretRef.current = maskPhoneValue(ddi, nextDigits, dropAt).caret;
          setPhone(value);
          return;
        }
      }
    }

    const next = maskPhoneValue(ddi, field.value, caret);
    caretRef.current = next.caret;
    setPhone(next.value);
  }

  const ddiDescribedBy = ddiError ? `${idPrefix}-ddi-error` : undefined;
  const phoneDescribedBy = phoneError ? `${idPrefix}-phone-error` : undefined;

  return (
    <>
      <div className={`phone-line${ddiError || phoneError ? " is-invalid" : ""}`}>
        <div className="field-ddi" ref={rootRef}>
          <input type="hidden" name="ddi" value={ddi} autoComplete="tel-country-code" />
          <button
            type="button"
            id={`${idPrefix}-ddi`}
            className="field-ddi-button"
            aria-label={`DDI ${selected.name} ${ddi}`}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={`${idPrefix}-ddi-list`}
            aria-activedescendant={open ? `${listId}-${options[active]?.code}` : undefined}
            aria-invalid={ddiError ? true : undefined}
            aria-describedby={ddiDescribedBy}
            onClick={() => {
              setOpen((current) => !current);
              setActive(Math.max(0, options.findIndex((item) => item.code === selected.code)));
            }}
            onKeyDown={onDdiKey}
          >
            <span className="field-ddi-flag" aria-hidden="true">
              {flagEmoji(selected.iso)}
            </span>
            <span className="field-ddi-code">{ddi}</span>
          </button>
          {open ? (
            <ul id={`${idPrefix}-ddi-list`} role="listbox" aria-label="DDI" className="field-ddi-list">
              {DIAL_GROUPS.map((group) => (
                <li key={group.region} role="presentation">
                  <p className="field-ddi-region">{group.region}</p>
                  <ul role="presentation">
                    {group.options.map((option) => {
                      const index = options.findIndex((item) => item.code === option.code);
                      const isSelected = option.code === selected.code;
                      return (
                        <li key={option.code} role="presentation">
                          <button
                            type="button"
                            id={`${listId}-${option.code}`}
                            role="option"
                            aria-selected={isSelected}
                            className={`field-ddi-option${index === active ? " is-active" : ""}`}
                            onMouseEnter={() => setActive(index)}
                            onClick={() => choose(option.code)}
                          >
                            <span className="field-ddi-flag" aria-hidden="true">
                              {flagEmoji(option.iso)}
                            </span>
                            <span className="field-ddi-code">+{option.code}</span>
                            <span>{option.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <input
          ref={phoneRef}
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="next"
          placeholder={phonePlaceholder(ddi)}
          value={phone}
          onChange={onPhoneChange}
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={phoneDescribedBy}
          className="field-phone"
        />
      </div>
      {ddiError ? (
        <p id={`${idPrefix}-ddi-error`} className="field-error" role="alert">
          {ddiError}
        </p>
      ) : null}
      {phoneError ? (
        <p id={`${idPrefix}-phone-error`} className="field-error" role="alert">
          {phoneError}
        </p>
      ) : null}
    </>
  );
}
