import { useState } from "react";
import { api } from "../api";

type Props = {
  onSyncSuccess: (url: string) => void;
};

// Sample Sheet URL constant
const SAMPLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1kZtiecdPgBY92Y3b51DBT2YRv0KNBfG9/edit?usp=drive_link";

export default function SyncForm({ onSyncSuccess }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [sampleNotice, setSampleNotice] = useState(false);

  const handleSync = async () => {
    setError("");
    setStatusMessage("");
    if (!/^https?:\/\/.+\..+/.test(url)) {
      setError("Please enter a valid URL starting with http or https.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/sync", { sheet_url: url });
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setLastSynced(now);
      setStatusMessage("✅ Synced successfully");
      onSyncSuccess(url);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to sync sheet.");
    } finally {
      setLoading(false);
    }
  };

  const handleTrySample = () => {
    setUrl(SAMPLE_SHEET_URL);
    setSampleNotice(true);
    setError("");
    setTimeout(() => setSampleNotice(false), 6000);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Paste your sheet URL</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSync();
        }}
      >
        <div className="flex gap-2 mb-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60 whitespace-nowrap"
            disabled={!url || loading}
          >
            {loading ? "⏳ Syncing..." : "🔄 Sync"}
          </button>
        </div>

        {sampleNotice && (
          <div className="mt-2 text-sm text-green-600 pb-3 pl-3">
            Sample sheet URL added. Now click <strong>Sync</strong> to begin chatting!
          </div>
        )}

        <div className="bg-white border border-blue-200 p-3 rounded mb-4 shadow-sm">
          <div className="mb-4 text-sm text-gray-700 bg-yellow-50 border border-yellow-300 p-3 rounded">
            <strong>📝 Note:</strong> Your Google Sheet must have two columns named:
            <span className="font-medium text-gray-900"> "Question" </span> and
            <span className="font-medium text-gray-900"> "Answer" </span>. The bot will answer intelligently based on your custom data.
          </div>
          <p className="text-sm text-gray-700 mb-2 font-medium">Want to try a sample sheet?</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
            <a
              href={SAMPLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-700 px-3 py-2 rounded text-center"
            >
              📂 View Sample Sheet
            </a>
            <button
              type="button"
              onClick={handleTrySample}
              className="text-sm bg-green-50 hover:bg-green-100 border border-green-300 text-green-700 px-3 py-2 rounded"
            >
              🚀 Try Sample Sheet
            </button>
          </div>
        </div>
      </form>

      {statusMessage && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded text-sm">
          <span>{statusMessage}</span>
          {lastSynced && (
            <span className="text-xs text-gray-600 sm:ml-4 mt-1 sm:mt-0">
              Last Synced: {lastSynced}
            </span>
          )}
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}