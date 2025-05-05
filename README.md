
# 💡 Smart Query Bot — Frontend

This is the frontend for **Smart Query Bot**, a web-based chatbot that lets users ask questions based on a synced Excel/Google Sheet. It integrates with a FastAPI backend powered by Cohere's LLM and Sentence Transformers for intelligent Q&A.

### 🛠️ Tech Stack

- ⚛️ React (Vite + TypeScript)
- 🎨 Tailwind CSS
- 🔁 Axios (API communication)
- 🧠 Cohere API (via backend)
- 🗂️ Modular, component-based structure
- 🖼️ Icons: Emoji / Heroicons

---

## 📦 Project Structure

```
smart-query-bot/
├── public/
├── src/
│   ├── api.ts                 # Axios instance
│   ├── App.tsx                # Main app logic
│   ├── main.tsx               # Vite entry point
│   └── components/
│       ├── SyncForm.tsx       # URL sync input & status
│       └── ChatInterface.tsx  # Real-time chat interface
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-query-bot.git
cd smart-query-bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the Backend URL

Edit `src/api.ts` to point to your deployed backend API:

```ts
export const api = axios.create({
  baseURL: "https://your-backend-url.onrender.com", // Replace with your real backend URL
  headers: {
    Authorization: `Bearer YOUR_SECRET_TOKEN`,      // Optional: if your backend uses auth
  },
});
```

### 4. Run the App Locally

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🌟 Features

- 🔄 Sync Google Sheets / Excel links
- ✅ Shows sync status and last synced time
- 💬 Chat UI with auto scroll
- 🤖 Intelligent Q&A based on sheet content
- ⏳ Typing indicators and timestamps
- 📎 Sticky footer and clean UI
- 🚫 Handles API errors gracefully

---

## 📦 Deployment (Optional)

You can host this frontend on platforms like:

- **Netlify** (recommended, free tier)
- **Vercel**
- **Render (Static Site)**
- **GitHub Pages**

> Just build the app with:

```bash
npm run build
```

And follow the hosting platform's static site deployment instructions.

---

## 🙌 Credits

Developed by **Shashikiran Kulkarni** — powered by Open Source and AI ✨  
Backend powered by [Cohere API](https://cohere.com/) + FastAPI.

---

## 🛡️ License

This project is licensed under the MIT License.