"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONTACT_PAGE } from "@/constants/content/contact-page";
import {
  contactSchema,
  CONTACT_FIELD_ORDER,
  type ContactFormValues,
} from "@/lib/validation/contact";

const FORM = CONTACT_PAGE.form;

type Status = "idle" | "success" | "error" | "rateLimited";

// Map a schema field to its input id and visible label, so the error
// summary can link straight to the control that needs fixing.
const FIELD_META: Record<
  (typeof CONTACT_FIELD_ORDER)[number],
  { id: string; label: string }
> = {
  name: { id: "contact-name", label: FORM.nameLabel },
  email: { id: "contact-email", label: FORM.emailLabel },
  message: { id: "contact-message", label: FORM.messageLabel },
};

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    // Validate a field once it has been touched, then keep it live on
    // every change so a corrected field clears its error immediately.
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onValid = async (data: ContactFormValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
      } else if (res.status === 429) {
        setStatus("rateLimited");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // Move focus to the success heading so screen-reader and keyboard
  // users are told the submission worked (the form is swapped out).
  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  // On an invalid submit, pull focus to the error summary so the failure
  // is announced and the user lands on the list of what to fix.
  const errorEntries = CONTACT_FIELD_ORDER.filter((field) => errors[field]).map(
    (field) => ({
      field,
      ...FIELD_META[field],
      message: errors[field]?.message ?? "",
    }),
  );
  const showSummary = submitCount > 0 && errorEntries.length > 0;

  useEffect(() => {
    if (showSummary) {
      summaryRef.current?.focus();
    }
  }, [showSummary, submitCount]);

  if (status === "success") {
    return (
      <div className="contact-form__success" role="status">
        <h2 className="text-3xl" ref={successHeadingRef} tabIndex={-1}>
          {FORM.successTitle}
        </h2>
        <p className="text-lg">{FORM.successBody}</p>
      </div>
    );
  }

  return (
    <form
      className="contact-form__form"
      onSubmit={handleSubmit(onValid)}
      noValidate
    >
      {showSummary ? (
        <div
          ref={summaryRef}
          className="contact-form__summary is-flex is-flex-column has-gap-2 has-p-4"
          role="alert"
          tabIndex={-1}
        >
          <p className="has-font-semibold">{FORM.summaryTitle}</p>
          <ul className="contact-form__summary-list is-flex is-flex-column has-gap-1">
            {errorEntries.map((entry) => (
              <li key={entry.field}>
                <a href={`#${entry.id}`} className="contact-form__summary-link">
                  {entry.label}: {entry.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="contact-form__honeypot"
        aria-hidden
        {...register("website")}
      />

      <div className="contact-form__field">
        <label htmlFor="contact-name">
          <span>{FORM.nameLabel}</span>{" "}
          <span className="contact-form__required">{FORM.requiredHint}</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <span
            id="contact-name-error"
            className="contact-form__error"
            role="alert"
          >
            {errors.name.message}
          </span>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">
          <span>{FORM.emailLabel}</span>{" "}
          <span className="contact-form__required">{FORM.requiredHint}</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <span
            id="contact-email-error"
            className="contact-form__error"
            role="alert"
          >
            {errors.email.message}
          </span>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-company">
          <span>{FORM.companyLabel}</span>
        </label>
        <input
          id="contact-company"
          type="text"
          autoComplete="organization"
          {...register("company")}
        />
      </div>

      <fieldset className="contact-form__field">
        <legend className="text-sm has-font-medium">
          {FORM.projectTypeLabel}
        </legend>
        <div className="contact-form__chips">
          {FORM.projectTypes.map((type) => (
            <label key={type} className="contact-form__chip">
              <input type="radio" value={type} {...register("projectType")} />
              {type}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="contact-form__field">
        <label htmlFor="contact-message">
          <span>{FORM.messageLabel}</span>{" "}
          <span className="contact-form__required">{FORM.requiredHint}</span>
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
          <span
            id="contact-message-error"
            className="contact-form__error"
            role="alert"
          >
            {errors.message.message}
          </span>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-budget">
          <span>{FORM.budgetLabel}</span>
        </label>
        <input id="contact-budget" type="text" {...register("budget")} />
      </div>

      <button
        type="submit"
        className="contact-form__submit"
        disabled={isSubmitting}
      >
        {FORM.submitLabel}
      </button>

      {status === "error" ? (
        <div
          className="contact-form__notice is-flex is-flex-column has-gap-1 has-p-4"
          role="alert"
        >
          <p className="has-font-semibold">{FORM.errorTitle}</p>
          <p>{FORM.errorBody}</p>
        </div>
      ) : null}

      {status === "rateLimited" ? (
        <div
          className="contact-form__notice is-flex is-flex-column has-gap-1 has-p-4"
          role="alert"
        >
          <p className="has-font-semibold">{FORM.rateLimitedTitle}</p>
          <p>{FORM.rateLimitedBody}</p>
        </div>
      ) : null}
    </form>
  );
}
