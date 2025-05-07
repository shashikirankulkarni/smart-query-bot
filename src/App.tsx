import { useEffect, useState } from "react";
import SyncForm from "./components/SyncForm";
import ChatInterface from "./components/ChatInterface";
import CookieConsent from "./components/CookieConsent";
import { fetchVisits } from "./api";

declare global {
  interface Window {
    google?: any;
  }
}

function App() {
  const [syncedUrl, setSyncedUrl] = useState<string | null>(null);
  const [visits, setVisits] = useState<number | null>(null);

  const handleSyncSuccess = (url: string) => {
    setSyncedUrl(url);
  };

  useEffect(() => {
    const getVisits = async () => {
      try {
        const total = await fetchVisits();
        setVisits(total);
      } catch (error) {
        console.error("Failed to fetch visit count:", error);
      }
    };
    getVisits();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <header className="flex flex-col items-center gap-2 text-center pt-6">
        <div className="flex items-center gap-3">
          <img src="/smartquerybot.png" alt="Smart Query Bot" className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Smart Query Bot</h1>
        </div>
        {visits !== null && (
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <span>Total Visits: <strong className="text-black">{visits}</strong></span>
            <img src="/google-analytics-logo.png" alt="Google Analytics" className="h-4 w-4" />
            <span className="text-gray-400">Powered by Google Analytics</span>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto p-4 space-y-6">
        <SyncForm onSyncSuccess={handleSyncSuccess} />
        {syncedUrl && <ChatInterface sheetUrl={syncedUrl} />}
      </main>

      <footer className="fixed bottom-0 left-0 w-full border-t bg-white shadow text-sm text-gray-600 z-50 py-3 px-2">
        <div className="relative max-w-5xl mx-auto flex justify-center items-center gap-16">
          {/* Center: Author */}
          <div className="text-center">
            © Built by <strong className="font-semibold text-black">Shashikiran Kulkarni</strong>
          </div>
        </div>
      </footer>

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
}

export default App;