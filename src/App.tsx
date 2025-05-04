import { useState } from "react";
import SyncForm from "./components/SyncForm";
import ChatInterface from "./components/ChatInterface";

function App() {
  const [syncedUrl, setSyncedUrl] = useState<string | null>(null);

  const handleSyncSuccess = (url: string) => {
    setSyncedUrl(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <h1 className="text-2xl font-bold text-center py-6">💡 Smart Query Bot</h1>

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