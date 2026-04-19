"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Frame from "@/components/primitives/Frame";
import MagneticBtn from "@/components/motion/MagneticBtn";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email").refine((v) => v.endsWith("@hcmut.edu.vn"), {
    message: "Must be a valid HCMUT email (@hcmut.edu.vn)",
  }),
  year: z.string().min(1, "Year / Major is required"),
  shipped: z.string().min(40, "Please write at least 40 characters about what you have shipped"),
});

type FormData = z.infer<typeof schema>;

export default function JoinPage() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const result = await res.json();
        if (result.errors) {
          (Object.keys(result.errors) as Array<keyof FormData>).forEach((field) => {
            setError(field, { message: result.errors[field] });
          });
        } else {
          setSubmitError("Something went wrong. Please try again.");
        }
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    }
  }

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
        We are building the Agentic Engineering institution at HCMUT. Founding cohort opens by
        application. Tell us what you have shipped, what you want to ship, and why this room.
      </p>

      {sent ? (
        <div className="mt-16 border border-[var(--color-amber)] bg-[var(--color-ink2)] p-10">
          <p className="eyebrow mb-3">Received</p>
          <p className="font-serif-italic text-[var(--color-amber)]" style={{ fontSize: "28px" }}>
            We&apos;ll be in touch within 7 days.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-16 grid max-w-2xl gap-6">
          <Field
            label="Full name"
            name="name"
            register={register}
            error={errors.name?.message}
          />
          <Field
            label="HCMUT email"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />
          <Field
            label="Year / Major"
            name="year"
            register={register}
            error={errors.year?.message}
          />
          <div>
            <label htmlFor="shipped" className="eyebrow mb-2 block">
              What have you shipped?
            </label>
            <textarea
              id="shipped"
              rows={4}
              {...register("shipped")}
              aria-describedby={errors.shipped ? "shipped-error" : undefined}
              className="w-full bg-[var(--color-ink2)] border border-[var(--color-ink3)] p-4 text-[var(--color-ivory)] focus:border-[var(--color-amber)] focus:outline-none"
            />
            {errors.shipped && (
              <p id="shipped-error" className="mt-1 text-sm text-[var(--color-amber)]">
                {errors.shipped.message}
              </p>
            )}
          </div>

          {submitError && (
            <p className="text-sm text-[var(--color-amber)]">{submitError}</p>
          )}

          <MagneticBtn
            type="submit"
            disabled={isSubmitting}
            className="cta-fill mt-4 w-fit inline-flex items-center justify-center gap-3 border border-[var(--color-amber)] px-6 py-4 text-[12px] uppercase tracking-[0.22em] text-[var(--color-amber)] disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit application →"}
          </MagneticBtn>
        </form>
      )}
    </Frame>
  );
}

function Field({
  label,
  name,
  type = "text",
  register,
  error,
}: {
  label: string;
  name: keyof FormData;
  type?: string;
  register: ReturnType<typeof useForm<FormData>>["register"];
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="eyebrow mb-2 block">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        aria-describedby={error ? errorId : undefined}
        className="w-full bg-[var(--color-ink2)] border border-[var(--color-ink3)] p-4 text-[var(--color-ivory)] focus:border-[var(--color-amber)] focus:outline-none"
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-[var(--color-amber)]">
          {error}
        </p>
      )}
    </div>
  );
}
