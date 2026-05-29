"use client";

type CookiePreferencesButtonProps = {
  label: string;
};

const CookiePreferencesButton = ({ label }: CookiePreferencesButtonProps) => {
  const resolvedLabel = String(label ?? "").trim();

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("cookie-consent:open"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-sm text-body-color transition hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
    >
      {resolvedLabel}
    </button>
  );
};

export default CookiePreferencesButton;
