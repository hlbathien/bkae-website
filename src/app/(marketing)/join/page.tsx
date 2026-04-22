"use client";
import { useState, useRef, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Frame from "@/components/primitives/Frame";
import MagneticBtn from "@/components/motion/MagneticBtn";
import { ensureGsap } from "@/lib/gsap";
import { Check, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [applicationId, setApplicationId] = useState("");
  const [visibleFields, setVisibleFields] = useState<Set<string>>(new Set(["name"]));
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, dirtyFields },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const shippedValue = useWatch({ control, name: "shipped", defaultValue: "" });

  const shakeForm = useCallback((target?: HTMLElement) => {
    const el = target || formRef.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    gsap.to(el, {
      x: 4,
      repeat: 5,
      yoyo: true,
      duration: 0.05,
      onComplete: () => gsap.set(el, { x: 0 }),
    });
  }, []);

  const onSubmit = useCallback(async (data: FormData) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setApplicationId(`AE-2026-${Math.floor(1000 + Math.random() * 9000)}`);
        setSent(true);
      } else {
        const result = await res.json();
        if (result.errors) {
          (Object.keys(result.errors) as Array<keyof FormData>).forEach((field) => {
            setError(field, { message: result.errors[field] });
          });
        } else {
          setSubmitError("Something went wrong. Please try again.");
          shakeForm();
        }
      }
    } catch {
      setSubmitError("Network error. Please try again.");
      shakeForm();
    }
  }, [setError, shakeForm]);

  // Using a separate handler to avoid passing ref-consuming callback to handleSubmit directly if possible
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit((data) => onSubmit(data))(e);
  };

  const showNextField = useCallback((name: string) => {
    setVisibleFields(prev => {
      const next = new Set(prev);
      if (name === "name") next.add("email");
      if (name === "email") next.add("year");
      if (name === "year") next.add("shipped");
      return next;
    });
  }, []);

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
        <div className="mt-16 border border-[var(--color-amber)] bg-[var(--color-ink2)] p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 bg-[var(--color-amber)] w-full" />
          <p className="eyebrow mb-3">Application Received</p>
          <p className="font-serif-italic text-[var(--color-amber)] text-[28px] mb-8">
            We&apos;ll be in touch within 7 days.
          </p>
          <div className="border-t border-[var(--color-ink3)] pt-6 flex flex-col gap-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-steel)]">
              Receipt ID
            </p>
            <p className="font-mono text-[14px] text-[var(--color-ivory)]">{applicationId}</p>
          </div>
          <div className="mt-8">
            <MagneticBtn
              href="/"
              className="bracket-link text-[12px] uppercase tracking-[0.2em] text-[var(--color-amber)]"
            >
              Back to terminal
            </MagneticBtn>
          </div>
        </div>
      ) : (
        <form 
          ref={formRef}
          onSubmit={handleFormSubmit} 
          className="mt-16 grid max-w-2xl gap-8"
          noValidate
        >
          <div className={cn("transition-opacity duration-500", visibleFields.has("name") ? "opacity-100" : "opacity-20 pointer-events-none")}>
            <Field
              label="Full name"
              name="name"
              register={register}
              error={errors.name?.message}
              isValid={dirtyFields.name && !errors.name}
              onFocus={() => showNextField("name")}
            />
          </div>

          <div className={cn("transition-opacity duration-500", visibleFields.has("email") ? "opacity-100" : "opacity-20 pointer-events-none")}>
            <Field
              label="HCMUT email"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
              isValid={dirtyFields.email && !errors.email}
              onFocus={() => showNextField("email")}
            />
          </div>

          <div className={cn("transition-opacity duration-500", visibleFields.has("year") ? "opacity-100" : "opacity-20 pointer-events-none")}>
            <Field
              label="Year / Major"
              name="year"
              register={register}
              error={errors.year?.message}
              isValid={dirtyFields.year && !errors.year}
              onFocus={() => showNextField("year")}
            />
          </div>

          <div className={cn("transition-opacity duration-500", visibleFields.has("shipped") ? "opacity-100" : "opacity-20 pointer-events-none")}>
            <div className="relative">
              <div className="flex justify-between items-end mb-2">
                <label htmlFor="shipped" className="eyebrow block">
                  What have you shipped?
                </label>
                <div className={cn(
                  "font-mono text-[10px] uppercase tracking-wider",
                  shippedValue.length < 40 ? "text-[var(--color-steel)]" : "text-[var(--color-amber)]"
                )}>
                  {shippedValue.length} / 40 min
                </div>
              </div>
              <textarea
                id="shipped"
                rows={4}
                {...register("shipped")}
                onFocus={() => showNextField("shipped")}
                aria-describedby={errors.shipped ? "shipped-error" : undefined}
                className={cn(
                  "w-full bg-[var(--color-ink2)] border p-4 text-[var(--color-ivory)] focus:outline-none transition-colors",
                  errors.shipped ? "border-[var(--color-amber)]" : "border-[var(--color-ink3)] focus:border-[var(--color-amber)]"
                )}
              />
              <div className="absolute right-4 top-10 pointer-events-none">
                {errors.shipped ? (
                  <X size={14} className="text-[var(--color-amber)]" />
                ) : dirtyFields.shipped && !errors.shipped ? (
                  <Check size={14} className="text-[var(--color-amber)]" />
                ) : null}
              </div>
              {errors.shipped && (
                <p id="shipped-error" className="mt-2 text-[11px] uppercase tracking-wider text-[var(--color-amber)] flex items-center gap-2">
                  <Info size={12} /> {errors.shipped.message}
                </p>
              )}
            </div>
          </div>

          {submitError && (
            <div role="alert" className="p-4 border border-[var(--color-amber)]/20 bg-[var(--color-amber)]/5 text-[var(--color-amber)] text-[12px] uppercase tracking-wider flex items-center gap-3">
              <X size={16} /> {submitError}
            </div>
          )}

          <div className={cn("transition-opacity duration-500", visibleFields.size >= 4 ? "opacity-100" : "opacity-20 pointer-events-none")}>
            <MagneticBtn
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-4 w-full sm:w-fit inline-flex items-center justify-center gap-3 border border-[var(--color-amber)] px-8 py-5 text-[12px] uppercase tracking-[0.22em] text-[var(--color-amber)] disabled:opacity-50 overflow-hidden"
            >
              {/* Hairline progress */}
              {isSubmitting && (
                <span className="absolute bottom-0 left-0 h-[1px] bg-[var(--color-amber-hot)] animate-progress-hairline" />
              )}
              <span className="relative z-10">
                {isSubmitting ? "Processing discipline..." : "Submit application →"}
              </span>
            </MagneticBtn>
          </div>
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
  isValid,
  onFocus,
}: {
  label: string;
  name: keyof FormData;
  type?: string;
  register: ReturnType<typeof useForm<FormData>>["register"];
  error?: string;
  isValid?: boolean;
  onFocus?: () => void;
}) {
  const errorId = `${name}-error`;
  return (
    <div className="relative">
      <label htmlFor={name} className="eyebrow mb-2 block">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type={type}
          {...register(name)}
          onFocus={onFocus}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full bg-[var(--color-ink2)] border p-4 text-[var(--color-ivory)] focus:outline-none transition-colors",
            error ? "border-[var(--color-amber)]" : "border-[var(--color-ink3)] focus:border-[var(--color-amber)]"
          )}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {error ? (
            <X size={14} className="text-[var(--color-amber)]" />
          ) : isValid ? (
            <Check size={14} className="text-[var(--color-amber)]" />
          ) : (
            <div className="h-1 w-1 rounded-full bg-[var(--color-steel)] opacity-30" />
          )}
        </div>
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-[11px] uppercase tracking-wider text-[var(--color-amber)] flex items-center gap-2">
          <Info size={12} /> {error}
        </p>
      )}
    </div>
  );
}
