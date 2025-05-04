import { useState } from "react";
import { api } from "../api";

type Props = {
    onSyncSuccess: (url: string) => void;
};

export default function SyncForm({ onSyncSuccess }: Props) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [lastSynced, setLastSynced] = useState<string | null>(null);

    const handleSync = async () => {
        setError("");
        setLoading(true);
        setStatusMessage("");
        try {
            await api.post("/sync", { sheet_url: url });
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            setLastSynced(timeStr);
            setStatusMessage("✅ Synced successfully");
            onSyncSuccess(url); // Notify parent
        } catch (err: any) {
            setError(err?.response?.data?.detail || "Failed to sync sheet.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Paste your sheet URL</h2>
            <div className="flex gap-2 mb-2">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/..."
                    className="flex-1 p-2 border rounded"
                />
                <button
                    onClick={handleSync}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60 whitespace-nowrap"
                    disabled={!url || loading}
                >
                    {loading ? "⏳ Syncing..." : "🔄 Sync"}
                </button>
            </div>

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
