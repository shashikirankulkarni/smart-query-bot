import { useState } from "react";
import SyncForm from "./components/SyncForm";
import ChatInterface from "./components/ChatInterface";
import companyLogo from '/smartquerybot.png';

function App() {
  const [syncedUrl, setSyncedUrl] = useState<string | null>(null);

  const handleSyncSuccess = (url: string) => {
    setSyncedUrl(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="flex justify-center items-center gap-2 py-6">
        <img src="/smartquerybot.png" alt="Smart Query Bot" className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Smart Query Bot</h1>
      </div>

      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <SyncForm onSyncSuccess={handleSyncSuccess} />
        {syncedUrl && <ChatInterface sheetUrl={syncedUrl} />}
      </div>
      <footer className="fixed bottom-0 left-0 w-full text-center text-sm text-gray-600 py-3 border-t bg-white shadow">
        ©Built by <strong className="font-semibold text-black">Shashikiran Kulkarni</strong>
      </footer>
    </div>
  );
}

export default App;