"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONTACT_PAGE } from "@/constants/content/contact-page";
import { cx } from "@/components/cx";

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

  if (status === "success") {
    return (
      <div className={"contact-form__success"}>
        <h2 className="text-3xl">{CONTACT_PAGE.form.successTitle}</h2>
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
      <label className={"contact-form__field"}>
        <span>{CONTACT_PAGE.form.nameLabel}</span>
        <input type="text" {...register("name")} />
        {errors.name ? <span className={"contact-form__error"}>{errors.name.message}</span> : null}
      </label>
      <label className={"contact-form__field"}>
        <span>{CONTACT_PAGE.form.emailLabel}</span>
        <input type="email" {...register("email")} />
        {errors.email ? <span className={"contact-form__error"}>{errors.email.message}</span> : null}
      </label>
      <label className={"contact-form__field"}>
        <span>{CONTACT_PAGE.form.companyLabel}</span>
        <input type="text" {...register("company")} />
      </label>
      <fieldset className={"contact-form__field"}>
        <legend className="text-sm has-font-medium">Project type</legend>
        <div className={"contact-form__chips"}>
          {CONTACT_PAGE.form.projectTypes.map((type) => (
            <label key={type} className={"contact-form__chip"}>
              <input type="radio" value={type} {...register("projectType")} />
              {type}
            </label>
          ))}
        </div>
      </fieldset>
      <label className={"contact-form__field"}>
        <span>{CONTACT_PAGE.form.messageLabel}</span>
        <textarea rows={5} {...register("message")} />
        {errors.message ? <span className={"contact-form__error"}>{errors.message.message}</span> : null}
      </label>
      <label className={"contact-form__field"}>
        <span>{CONTACT_PAGE.form.budgetLabel}</span>
        <input type="text" {...register("budget")} />
      </label>
      <button type="submit" className={"contact-form__submit"} disabled={isSubmitting} data-magnetic data-cursor-text="Send">
        {CONTACT_PAGE.form.submitLabel}
      </button>
      {status === "error" ? (
        <p className={"contact-form__error"}>Something went wrong. Email davide@domenghini.com directly.</p>
      ) : null}
    </form>
  );
}
