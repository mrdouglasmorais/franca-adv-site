"use client";

import { useEffect, useRef } from "react";

type Props = {
  pending: boolean;
  pendingLabel: string;
  error?: string;
};

export function FormStatus({ pending, pendingLabel, error }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!pending && !error) return;
    ref.current?.focus();
  }, [pending, error]);

  if (pending) {
    return (
      <p ref={ref} tabIndex={-1} role="status" aria-live="polite" className="form-status">
        {pendingLabel}
      </p>
    );
  }

  if (!error) return null;

  return (
    <p ref={ref} tabIndex={-1} role="alert" className="form-status">
      {error}
    </p>
  );
}
