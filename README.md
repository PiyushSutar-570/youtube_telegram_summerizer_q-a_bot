# 🚀 YouTube AI Telegram Bot (RAG-Based)

An intelligent Telegram bot that:

- 📺 Extracts transcript from any YouTube video  
- 🧠 Generates structured AI summaries  
- ❓ Answers follow-up questions using semantic search (RAG)  
- 🌍 Supports multiple languages (English + Hindi)  
- ⚡ Uses Embedding-based Retrieval  
- 🛡 Includes rate limiting & transcript caching  

Built using **Node.js, Express, Telegram Bot API, OpenRouter, and Semantic Embeddings**.

---

# ✨ Features

## 📺 1. YouTube Transcript Extraction
Fetches transcript automatically using:
- `youtube-transcript-plus`

---

## 🧠 2. AI Summary Modes

Available Commands:

- `/language` → Language selection
- `/summary` → Structured overview  
- `/deepdive` → Detailed explanation  
- `/actionpoints` → Practical insights  

Summary includes:

- 🎥 Video Overview  
- 📌 5 Key Points  
- ⏱ Important Topics  
- 🧠 Core Takeaway  

---

## ❓ 3. AI Question Answering (RAG System)

After sending a YouTube link, you can ask:

Examples:
- What did he say about Python 3?
- Why is Python beginner friendly?

The bot:
1. Chunks the transcript  
2. Generates embeddings  
3. Uses cosine similarity to retrieve top relevant chunks  
4. Answers strictly from transcript context  

This prevents hallucination and improves accuracy.

---

## 🌍 4. Multi-Language Support

Command:

/language


Supported Languages:
- English 🇬🇧
- Hindi 🇮🇳

All summaries and answers are generated in the selected language.

---

## ⚡ 5. Semantic Retrieval (Advanced Feature)

Uses:
- `text-embedding-3-small`
- Cosine similarity
- Top-k chunk retrieval

This makes Q&A context-aware and accurate.

---

## 🛡 6. Transcript Caching

If multiple users send the same video:
- Transcript is cached
- Avoids refetching
- Reduces API cost

---

## 🚦 7. Rate Limiting

- 1 request per 3 seconds per user
- Protects API usage
- Prevents spam

---

# 🏗 Project Structure



Clean modular backend architecture.

---

# 🧠 How It Works (RAG Flow)

1. User sends YouTube link  
2. Bot fetches transcript  
3. Transcript is chunked  
4. Each chunk gets embedding  
5. Question embedding generated  
6. Cosine similarity finds relevant chunks  
7. AI answers using only retrieved context  

This is a Retrieval-Augmented Generation (RAG) system.

---

#images :

<img width="1160" height="784" alt="image" src="https://github.com/user-attachments/assets/60aadb99-873e-4f4b-89f9-16bbb4af2d17" />

<img width="1169" height="695" alt="image" src="https://github.com/user-attachments/assets/55719623-7a68-46b7-83ac-66d49e3fd90a" />

<img width="1174" height="672" alt="image" src="https://github.com/user-attachments/assets/39dc746c-16a4-4a98-a9ee-b783dd7f03de" />

<img width="1174" height="848" alt="image" src="https://github.com/user-attachments/assets/10c91764-2c07-438e-b0f8-ce1a8e82438b" />

<img width="1175" height="563" alt="image" src="https://github.com/user-attachments/assets/c0f87110-841b-4773-ab3e-6d0985d42682" />


# 🛠 Tech Stack

- Node.js
- Express.js
- Telegram Bot API
- OpenRouter API
- GPT-4o-mini
- text-embedding-3-small
- Custom cosine similarity
- Modular backend architecture

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/youtube-ai-telegram-bot.git
cd youtube-ai-telegram-bot

2️⃣ Install Dependencies

npm install

3️⃣ Create .env File

Create a .env file in root directory:

BOT_TOKEN=your_telegram_bot_token
OPENROUTER_API_KEY=your_openrouter_api_key
PORT=3000

4️⃣ Start Server

For development:
npm run dev

or
node src/server.js

```

🔗 Connecting Telegram Webhook (Local Testing)

1.If running locally:

Start ngrok:

ngrok http 3000

Set webhook:

https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook?url=https://your-ngrok-url/webhook

2.Now your Telegram bot is connected.

📌 Example Usage

3.Send a YouTube link:

https://youtu.be/examplevideo

Bot replies with structured summary.

4.Then ask a sample question:

What did he say about Python ?

->Bot answers from transcript context.

📈 Future Improvements

->Add more Indian languages (Marathi, Tamil, Telugu, Kannada)

->Add Redis session storage

->Add persistent embedding cache

->Deploy to Render / Railway

->Add vector database for large-scale usage

👨‍💻 Author

Piyush Sutar

CSE(AI & ML) 
