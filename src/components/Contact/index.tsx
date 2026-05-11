"use client";

import TurnstileWidget from "@/components/TurnstileWidget";
import type { TurnstileStatus } from "@/components/TurnstileWidget";
import { useEffect, useState } from "react";

type ContactProps = {
  copy: any;
};

const Contact = ({ copy }: ContactProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaStatus, setCaptchaStatus] = useState<TurnstileStatus>("disabled");
  const [formStartedAt, setFormStartedAt] = useState<number>(() => Date.now());
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const form = copy?.form ?? {};
  const submitLabel = form.submit ?? form.submitLabel;
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const isTurnstileEnabled = Boolean(turnstileSiteKey);
  const requiresCaptchaToken = isTurnstileEnabled && !captchaToken;
  const captchaMessages = {
    loading: form.captchaLoadingMessage ?? "正在加载安全验证，请稍候。",
    ready: form.captchaReadyMessage ?? "请完成安全验证后提交。",
    expired: form.captchaExpiredMessage ?? "验证已过期，请重新完成验证。",
    error: form.captchaErrorMessage ?? "安全验证加载失败，请刷新页面后重试。",
  };
  const captchaButtonLabels = {
    loading: form.captchaLoadingButtonLabel ?? "正在加载验证…",
    ready: form.captchaReadyButtonLabel ?? "请完成验证",
    expired: form.captchaExpiredButtonLabel ?? "请重新验证",
    error: form.captchaErrorButtonLabel ?? "验证加载失败",
  };
  const captchaMessage =
    captchaStatus === "loading"
      ? captchaMessages.loading
      : captchaStatus === "expired"
        ? captchaMessages.expired
        : captchaStatus === "error"
          ? captchaMessages.error
          : requiresCaptchaToken
            ? captchaMessages.ready
            : null;
  const captchaButtonLabel =
    captchaStatus === "loading"
      ? captchaButtonLabels.loading
      : captchaStatus === "expired"
        ? captchaButtonLabels.expired
        : captchaStatus === "error"
          ? captchaButtonLabels.error
          : requiresCaptchaToken
            ? captchaButtonLabels.ready
            : null;

  useEffect(() => {
    setFormStartedAt(Date.now());
  }, []);

  const resetCaptcha = () => {
    if (!isTurnstileEnabled) return;
    setCaptchaToken(null);
    setCaptchaResetKey((value) => value + 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setRequestId(null);
    setErrorMessage(null);

    if (requiresCaptchaToken) {
      setErrorMessage(captchaMessage ?? captchaMessages.ready);
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const submittedWithCaptcha = Boolean(captchaToken);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      intention: formData.get("intention"),
      message: formData.get("message"),
      // anti-spam extras
      website: formData.get("website"),
      formStartedAt,
      captchaToken,
    };

    try {
      const res = await fetch("/api/public/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        const rid = payload?.requestId ? String(payload.requestId) : null;
        if (rid) setRequestId(rid);
        throw new Error(payload?.error || "Failed to submit ticket");
      }

      const payload = await res.json().catch(() => null);
      const rid = payload?.requestId ? String(payload.requestId) : null;
      if (rid) setRequestId(rid);
      setErrorMessage(null);

      setSubmitStatus("success");
      form.reset();
      setFormStartedAt(Date.now());
    } catch (error) {
      console.error("Ticket submission error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit ticket");
      setSubmitStatus("error");
    } finally {
      if (submittedWithCaptcha) {
        resetCaptcha();
      }
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="overflow-hidden pb-16 pt-8 md:pb-20 md:pt-10 lg:pb-28 lg:pt-12">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 max-w-[1320px] mx-auto">
            <div
              className="mb-12 rounded-2xl bg-white px-8 py-11 shadow-sm dark:bg-dark-2 sm:p-[55px] xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                {copy.formTitle}
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                {copy.formDescription}
              </p>
              
              {submitStatus === "success" && (
                <div className="mb-8 rounded bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {form.submitSuccessMessage ?? (
                    submitLabel === "Submit Ticket" ? "Submitted successfully! We will contact you soon." :
                    submitLabel === "送信" ? "送信しました！まもなくご連絡いたします。" :
                    "提交成功！我们会尽快与您联系。"
                  )}
                  {errorMessage ? <div className="mt-2 text-xs opacity-80">{errorMessage}</div> : null}
                  {requestId ? <div className="mt-2 text-xs opacity-80">Request ID: {requestId}</div> : null}
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mb-8 rounded bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  {errorMessage ?? form.submitErrorMessage ?? (
                    submitLabel === "Submit Ticket" ? "Submission failed, please try again later." :
                    submitLabel === "送信" ? "送信に失敗しました。後でもう一度お試しください。" :
                    "提交失败，请稍后重试。"
                  )}
                  {requestId ? (
                    <div className="mt-2 text-xs opacity-80">Request ID: {requestId}</div>
                  ) : null}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        <span className="text-red-500">*</span> {form.nameLabel ?? "姓名"}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={form.namePlaceholder ?? "请输入姓名"}
                        className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2d2520] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        {form.emailLabel ?? "邮箱"}
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder={form.emailPlaceholder ?? "请输入邮箱"}
                        className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2d2520] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="phone"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        <span className="text-red-500">*</span> {form.phoneLabel ?? "手机号"}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder={form.phonePlaceholder ?? "请输入手机号"}
                        className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2d2520] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="intention"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        <span className="text-red-500">*</span> {form.intentionLabel ?? "合作意向选择"}
                      </label>
                      <div className="relative">
                        <select
                          name="intention"
                          required
                          defaultValue=""
                          className="border-stroke w-full appearance-none rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2d2520] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        >
                          <option value="" disabled>{form.intentionPlaceholder ?? "请选择合作意向"}</option>
                          {(Array.isArray(form.intentionOptions) ? form.intentionOptions : [
                            "课程/实验室/专业建设合作",
                            "联合开发产品",
                            "渠道合作"
                          ]).map((opt: string, i: number) => (
                            <option key={i} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-body-color dark:text-body-color-dark">
                          <svg className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        {form.messageLabel ?? "您的留言"}
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder={form.messagePlaceholder ?? "请填写想咨询的问题"}
                        className="border-stroke w-full resize-none rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2d2520] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <TurnstileWidget
                      siteKey={turnstileSiteKey}
                      onTokenChange={setCaptchaToken}
                      onStatusChange={setCaptchaStatus}
                      resetKey={captchaResetKey}
                    />
                    {captchaMessage ? (
                      <p className="-mt-4 mb-8 text-sm text-body-color">
                        {captchaMessage}
                      </p>
                    ) : null}
                  </div>
                  <div className="w-full px-4">
                    <button
                      disabled={isSubmitting || requiresCaptchaToken}
                      className="rounded-xs bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-submit-dark"
                    >
                      {isSubmitting
                        ? "提交中..."
                        : captchaButtonLabel
                          ? captchaButtonLabel
                          : (submitLabel ?? "提交工单")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
