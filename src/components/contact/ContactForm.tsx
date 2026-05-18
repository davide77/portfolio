"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONTACT_PAGE } from "@/constants/content/contact-page";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  message: z.string().min(10, "Please add a short brief"),
  budget: z.string().optional(),
  projectType: z.string().optional(),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setStatus("idle");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? "success" : "error");
  };

  // Move focus to the success heading so screen-reader and keyboard
  // users are told the submission worked (the form is swapped out).
  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  if (status === "success") {
    return (
      <div className={"contact-form__success"} role="status">
        <h2 className="text-3xl" ref={successHeadingRef} tabIndex={-1}>
          {CONTACT_PAGE.form.successTitle}
        </h2>
        <p className="text-lg">{CONTACT_PAGE.form.successBody}</p>
      </div>
    );
  }

  return (
    <form className={"contact-form__form"} onSubmit={handleSubmit(onSubmit)} noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className={"contact-form__honeypot"}
        aria-hidden
        {...register("website")}
      />
      <div className={"contact-form__field"}>
        <label htmlFor="contact-name">
          <span>{CONTACT_PAGE.form.nameLabel}</span>{" "}
          <span className="contact-form__required">{CONTACT_PAGE.form.requiredHint}</span>
        </label>
        <input
          id="contact-name"
          type="text"
          aria-required="true"
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <span id="contact-name-error" className={"contact-form__error"} role="alert">
            {errors.name.message}
          </span>
        ) : null}
      </div>
      <div className={"contact-form__field"}>
        <label htmlFor="contact-email">
          <span>{CONTACT_PAGE.form.emailLabel}</span>{" "}
          <span className="contact-form__required">{CONTACT_PAGE.form.requiredHint}</span>
        </label>
        <input
          id="contact-email"
          type="email"
          aria-required="true"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <span id="contact-email-error" className={"contact-form__error"} role="alert">
            {errors.email.message}
          </span>
        ) : null}
      </div>
      <div className={"contact-form__field"}>
        <label htmlFor="contact-company">
          <span>{CONTACT_PAGE.form.companyLabel}</span>
        </label>
        <input id="contact-company" type="text" {...register("company")} />
      </div>
      <fieldset className={"contact-form__field"}>
        <legend className="text-sm has-font-medium">{CONTACT_PAGE.form.projectTypeLabel}</legend>
        <div className={"contact-form__chips"}>
          {CONTACT_PAGE.form.projectTypes.map((type) => (
            <label key={type} className={"contact-form__chip"}>
              <input type="radio" value={type} {...register("projectType")} />
              {type}
            </label>
          ))}
        </div>
      </fieldset>
      <div className={"contact-form__field"}>
        <label htmlFor="contact-message">
          <span>{CONTACT_PAGE.form.messageLabel}</span>{" "}
          <span className="contact-form__required">{CONTACT_PAGE.form.requiredHint}</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          aria-required="true"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <span id="contact-message-error" className={"contact-form__error"} role="alert">
            {errors.message.message}
          </span>
        ) : null}
      </div>
      <div className={"contact-form__field"}>
        <label htmlFor="contact-budget">
          <span>{CONTACT_PAGE.form.budgetLabel}</span>
        </label>
        <input id="contact-budget" type="text" {...register("budget")} />
      </div>
      <button type="submit" className={"contact-form__submit"} disabled={isSubmitting} data-magnetic data-cursor-text="Send">
        {CONTACT_PAGE.form.submitLabel}
      </button>
      {status === "error" ? (
        <p className={"contact-form__error"} role="alert">
          {CONTACT_PAGE.form.errorBody}
        </p>
      ) : null}
    </form>
  );
}
