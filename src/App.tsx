import { useEffect, useState } from "react";
import SyncForm from "./components/SyncForm";
import ChatInterface from "./components/ChatInterface";
import CookieConsent from "./components/CookieConsent";
import { fetchVisits } from "./api";

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
      {/* Logo and Title */}
      <div className="flex flex-col items-center gap-2 py-6">
        <div className="flex items-center gap-2">
          <img src="/smartquerybot.png" alt="Smart Query Bot" className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Smart Query Bot</h1>
        </div>

        {visits !== null && (
          <div className="text-xs text-gray-600 flex items-center gap-0 mt-1">
            <span>Total Visits: <strong className="font-semibold text-black">{visits}</strong></span>
            <img src="/google-analytics-logo.png" alt="Google Analytics" className="h-4 w-auto" />
            <span className="text-gray-400">Powered by Google Analytics</span>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <SyncForm onSyncSuccess={handleSyncSuccess} />
        {syncedUrl && <ChatInterface sheetUrl={syncedUrl} />}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full text-center text-sm text-gray-600 py-3 border-t bg-white shadow">
        ©Built by <strong className="font-semibold text-black">Shashikiran Kulkarni</strong>
      </footer>

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
}

export default App;