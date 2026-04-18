"use client";
import { useState } from "react";
import Frame from "@/components/primitives/Frame";

export default function JoinPage() {
  const [sent, setSent] = useState(false);

  return (
    <Frame className="pt-40 pb-32">
      <p className="eyebrow mb-4">[ Founding cohort ]</p>
      <h1
        className="font-display text-[var(--color-ivory)]"
        style={{ fontSize: "clamp(48px, 9vw, 160px)" }}
      >
        Apply.
        <br />
        <span className="font-serif-italic text-[var(--color-amber)]">Or build alone.</span>
      </h1>

      <p className="mt-10 max-w-xl text-[var(--color-steel-light)]">
        We are building the Agentic Engineering institution at HCMUT. Founding cohort opens by application. Tell us what you have shipped, what you want to ship, and why this room.
      </p>

      {sent ? (
        <div className="mt-16 border border-[var(--color-amber)] bg-[var(--color-ink2)] p-10">
          <p className="eyebrow mb-3">Received</p>
          <p className="font-serif-italic text-[var(--color-amber)]" style={{ fontSize: "28px" }}>
            We&apos;ll be in touch within 7 days.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-16 grid max-w-2xl gap-6"
        >
          <Field label="Full name" name="name" />
          <Field label="HCMUT email" name="email" type="email" />
          <Field label="Year / Major" name="year" />
          <div>
            <label className="eyebrow mb-2 block">What have you shipped?</label>
            <textarea
              required
              rows={4}
              name="shipped"
              className="w-full bg-[var(--color-ink2)] border border-[var(--color-ink3)] p-4 text-[var(--color-ivory)] focus:border-[var(--color-amber)] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="cta-fill mt-4 inline-flex w-fit items-center gap-3 border border-[var(--color-amber)] px-6 py-4 text-[12px] uppercase tracking-[0.22em] text-[var(--color-amber)]"
          >
            Submit application →
          </button>
        </form>
      )}
    </Frame>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow mb-2 block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full bg-[var(--color-ink2)] border border-[var(--color-ink3)] p-4 text-[var(--color-ivory)] focus:border-[var(--color-amber)] focus:outline-none"
      />
    </div>
  );
}
