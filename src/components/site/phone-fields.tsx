"use client";

import { useLayoutEffect, useRef, useState, type ChangeEvent } from "react";
import { DIAL_GROUPS, formatNational, maskPhoneValue, phonePlaceholder } from "@/lib/phone";

type Props = {
  idPrefix: string;
  ddiError?: string;
  phoneError?: string;
};

export function PhoneFields({ idPrefix, ddiError, phoneError }: Props) {
  const [ddi, setDdi] = useState("+55");
  const [phone, setPhone] = useState("");
  const phoneRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const field = phoneRef.current;
    const caret = caretRef.current;
    if (!field || caret == null) return;
    field.setSelectionRange(caret, caret);
    caretRef.current = null;
  }, [phone]);

  function onDdiChange(event: ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value;
    setDdi(next);
    setPhone((current) => formatNational(next, current));
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
      <div className="phone-line">
        <select
          id={`${idPrefix}-ddi`}
          name="ddi"
          value={ddi}
          onChange={onDdiChange}
          autoComplete="tel-country-code"
          aria-label="DDI"
          aria-invalid={ddiError ? true : undefined}
          aria-describedby={ddiDescribedBy}
          className="field field-select field-ddi"
        >
          {DIAL_GROUPS.map((group) => (
            <optgroup key={group.region} label={group.region}>
              {group.options.map((option) => (
                <option key={option.code} value={`+${option.code}`}>
                  +{option.code} {option.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
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
          className="field field-phone"
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
