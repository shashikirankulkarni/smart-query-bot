import { useEffect, useRef, useState } from "react";
import { api } from "../api";

type Message = {
    role: "you" | "bot";
    text: string;
    time: string;
};

type Props = {
    sheetUrl: string;
};

export default function ChatInterface({ sheetUrl }: Props) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Initial bot message after sync
    useEffect(() => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMessages([
            {
                role: "bot",
                text: "Hey There, Welcome! How Can I help you?",
                time: now
            },
        ]);
    }, [sheetUrl]);

    // Scroll to bottom on new message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        if (!input.trim()) return;
        const userMsg: Message = { role: "you", text: input, time: now };
        setMessages((prev) => [...prev, userMsg]);
        setLoading(true);
        setInput("");

        try {
            const res = await api.post("/query", {
                sheet_url: sheetUrl,
                question: input,
            });
            const botMsg: Message = { role: "bot", text: res.data.answer, time: now };
            setMessages((prev) => [...prev, botMsg]);
        } catch (e: any) {
            const errorMsg =
                e?.response?.data?.detail || e?.message || "Sorry, I did not catch that. Please try again.";
            const botMsg: Message = { role: "bot", text: errorMsg, time: now };
            setMessages((prev) => [...prev, botMsg]);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-6 px-4">
            <div className="bg-white border rounded p-4 h-[60vh] overflow-y-auto mb-4 shadow-sm">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`my-2 flex items-start ${msg.role === "you" ? "justify-end" : "justify-start"
                            }`}
                    >
                        {msg.role === "bot" && (
                            <div className="mr-2 text-2xl">🤖</div>
                        )}

                        <div
                            className={`p-2 rounded-md max-w-[80%] ${msg.role === "you"
                                ? "bg-blue-100 text-right"
                                : "bg-gray-200 text-left"
                                }`}
                        >
                            <div className="text-sm">{msg.text}</div>
                            <div
                                className={`flex justify-between text-xs text-gray-500 mt-1 ${msg.role === "you" ? "flex-row-reverse" : "flex-row"
                                    }`}
                            >
                                <span className="capitalize">{msg.role}</span>
                                <span>{msg.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex items-center text-sm italic text-gray-500 gap-2">
                        <svg
                            className="animate-spin h-4 w-4 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                        Bot is typing...
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded"
                    placeholder="Ask a question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={sendMessage}
                    disabled={loading}
                >
                    Send
                </button>
            </div>
        </div>
    );
}