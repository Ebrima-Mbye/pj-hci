"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type Field = keyof FormState;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Your name is required.";
  else if (form.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";

  if (!form.email.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Please enter a valid email address.";

  if (!form.subject.trim()) errors.subject = "Please enter a subject.";
  else if (form.subject.trim().length < 3)
    errors.subject = "Subject must be at least 3 characters.";

  if (!form.message.trim()) errors.message = "Message is required.";
  else if (form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";

  return errors;
}

const contactInfo = [
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />`,
    label: "Email Us",
    value: "hello@novastore.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />`,
    label: "Call Us",
    value: "+220 000 0000",
    sub: "Mon – Fri, 9am – 6pm GMT",
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />`,
    label: "Visit Us",
    value: "Banjul, The Gambia",
    sub: "West Africa",
  },
];

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3–7 business days. Express shipping (1–2 days) is available at checkout for an additional fee.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day hassle-free return policy. If you're not completely satisfied, contact us and we'll make it right.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes, absolutely. We use 256-bit SSL encryption and never store your card details. Your security is our top priority.",
  },
  {
    q: "Can I track my order?",
    a: "Yes. Once your order ships, you'll receive a tracking number via email so you can follow your package every step of the way.",
  },
  {
    q: "Do you offer international shipping?",
    a: "Currently we ship within West Africa and are expanding. Sign up for our newsletter to be notified when we reach your region.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (field: Field, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (field: Field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = {
      name: true,
      email: true,
      subject: true,
      message: true,
    };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block mb-4 text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-800/50 px-3 py-1.5 rounded-full">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-indigo-200 text-lg max-w-xl mx-auto">
            Have a question, feedback, or just want to say hello? Our team is
            here and happy to help.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-12 bg-white" aria-label="Contact information">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: info.icon }}
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                  {info.label}
                </p>
                <p className="font-bold text-gray-900 text-sm">{info.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{info.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form + FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Fill in the form below and we will get back to you as soon as
                possible.
              </p>

              {submitted ? (
                <div
                  className="bg-white rounded-2xl p-10 text-center border border-green-100 shadow-sm"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Thanks, <strong>{form.name.split(" ")[0]}</strong>! We
                    received your message and will reply to{" "}
                    <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                      setTouched({});
                      setErrors({});
                    }}
                    className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5"
                  noValidate
                  aria-label="Contact form"
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        id: "name" as Field,
                        label: "Your Name",
                        type: "text",
                        placeholder: "Ebrima Mbye",
                        autoComplete: "name",
                      },
                      {
                        id: "email" as Field,
                        label: "Email Address",
                        type: "email",
                        placeholder: "you@example.com",
                        autoComplete: "email",
                      },
                    ].map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="block text-xs font-semibold text-gray-700 mb-1.5"
                        >
                          {field.label}{" "}
                          <span className="text-red-500" aria-hidden="true">
                            *
                          </span>
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          autoComplete={field.autoComplete}
                          value={form[field.id]}
                          onChange={(e) =>
                            handleChange(field.id, e.target.value)
                          }
                          onBlur={() => handleBlur(field.id)}
                          className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                            errors[field.id] && touched[field.id]
                              ? "border-red-400 focus:ring-red-200 bg-red-50"
                              : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
                          }`}
                          aria-required="true"
                          aria-invalid={
                            !!(errors[field.id] && touched[field.id])
                          }
                          aria-describedby={
                            errors[field.id] && touched[field.id]
                              ? `${field.id}-error`
                              : undefined
                          }
                        />
                        {errors[field.id] && touched[field.id] && (
                          <p
                            id={`${field.id}-error`}
                            className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                            role="alert"
                          >
                            <svg
                              className="w-3 h-3 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {errors[field.id]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold text-gray-700 mb-1.5"
                    >
                      Subject{" "}
                      <span className="text-red-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="e.g. Question about my order"
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      onBlur={() => handleBlur("subject")}
                      className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                        errors.subject && touched.subject
                          ? "border-red-400 focus:ring-red-200 bg-red-50"
                          : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
                      }`}
                      aria-required="true"
                      aria-invalid={!!(errors.subject && touched.subject)}
                      aria-describedby={
                        errors.subject && touched.subject
                          ? "subject-error"
                          : undefined
                      }
                    />
                    {errors.subject && touched.subject && (
                      <p
                        id="subject-error"
                        className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                        role="alert"
                      >
                        <svg
                          className="w-3 h-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-gray-700 mb-1.5"
                    >
                      Message{" "}
                      <span className="text-red-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us how we can help..."
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-colors resize-none ${
                        errors.message && touched.message
                          ? "border-red-400 focus:ring-red-200 bg-red-50"
                          : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
                      }`}
                      aria-required="true"
                      aria-invalid={!!(errors.message && touched.message)}
                      aria-describedby={
                        errors.message && touched.message
                          ? "message-error"
                          : "message-hint"
                      }
                    />
                    {errors.message && touched.message ? (
                      <p
                        id="message-error"
                        className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                        role="alert"
                      >
                        <svg
                          className="w-3 h-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.message}
                      </p>
                    ) : (
                      <p
                        id="message-hint"
                        className="mt-1.5 text-xs text-gray-400"
                      >
                        Minimum 10 characters · {form.message.length} typed
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Quick answers to the questions we hear most often.
              </p>
              <div className="space-y-3" role="list">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                    role="listitem"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <span>{faq.q}</span>
                      <svg
                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div
                        id={`faq-answer-${i}`}
                        className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50"
                        role="region"
                        aria-label={faq.q}
                      >
                        <p className="pt-3">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
