"use client";

import { useFormStatus } from "react-dom";

export default function AuthSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}
