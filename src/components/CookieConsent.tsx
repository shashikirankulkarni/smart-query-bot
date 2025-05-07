import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50 px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
      <p className="text-gray-800 mb-2 sm:mb-0">
        We use cookies to analyze site traffic and enhance your experience. By using our site, you consent to analytics tracking.
      </p>
      <button
        onClick={handleAccept}
        className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Accept
      </button>
    </div>
  );
}