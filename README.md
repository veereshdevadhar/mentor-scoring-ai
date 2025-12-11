🧠 Mentor Scoring AI
AI-Powered Video Analysis & Teaching Performance Evaluation

FastAPI Backend • React Frontend • Whisper • LLaMA • MediaPipe • MongoDB

🚀 Overview

Mentor Scoring AI is a full-stack AI system designed to evaluate teaching performance from uploaded videos.
The system automatically analyzes:

🎤 Voice clarity & audio quality

🎭 Facial expressions & engagement (MediaPipe)

📝 Speech transcription (Whisper)

🧠 NLP-based insights & teaching quality scoring (LLaMA)

📊 Performance scoring dashboard

📈 Leaderboard & mentor comparison analytics

Mentors upload a video → AI pipeline processes → Results are shown in a clean, interactive frontend dashboard.

📁 Project Structure
mentor-scoring-ai/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   ├── uploads/
│   ├── requirements.txt
│   └── .env.example
│
├── frontendorg/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
│
└── README.md

⚙️ Backend Setup (FastAPI)
✔ Requires Python 3.11

(Whisper & scipy do NOT work properly on Python 3.12/3.13)

1️⃣ Create Virtual Environment
cd backend
py -3.11 -m venv venv
venv\Scripts\activate

2️⃣ Install Dependencies
pip install --upgrade pip
pip install -r requirements.txt
pip install openai-whisper
pip install python-dotenv
pip insatll MediaPipe

🔐 Environment Variables (Backend .env)

Create a .env file inside backend/ with EXACTLY these contents:

# Application
APP_NAME=Mentor Scoring AI
APP_VERSION=1.0.0
DEBUG=True
HOST=0.0.0.0
PORT=8000

# MongoDB Atlas
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
DATABASE_NAME=mentor_scoring

# File Upload
MAX_FILE_SIZE=524288000
UPLOAD_DIR=uploads
ALLOWED_EXTENSIONS=["mp4", "avi", "mov", "mkv", "webm"]

# AI Models
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
WHISPER_MODEL=base
WHISPER_DEVICE=cpu

# CORS
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]

# Security
SECRET_KEY=Shivarajnc189723056.189723056.
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

Notes:

Your MongoDB URL does NOT need URL encoding unless username/password contains special characters.

Whisper model can be tiny, base, small, etc.

Ollama must be installed locally to run LLaMA3.1 8B.

Download Ollama:
https://ollama.com/download

Start Ollama server:

ollama serve
ollama pull llama3.1:8b

▶️ Run Backend
uvicorn app.main:app --reload --port 8000


Runs at:
👉 http://localhost:8000

Swagger Docs:
👉 http://localhost:8000/docs

🎨 Frontend Setup (React + Vite + Tailwind + shadcn/ui)
1️⃣ Install Node.js LTS

https://nodejs.org

2️⃣ Install Frontend Dependencies
cd frontendorg
npm install

3️⃣ Create .env inside frontendorg/
VITE_API_URL=http://localhost:8000

▶️ Run Frontend
npm run dev


Frontend runs at:
👉 http://localhost:5173

🤖 AI Pipeline Architecture
Video Upload
    ↓
Frame Extraction (OpenCV)
    ↓
Facial & Pose Analysis (MediaPipe)
    ↓
Audio Feature Extraction (Librosa)
    ↓
Whisper Speech Transcription
    ↓
NLP Evaluation (LLaMA through Ollama)
    ↓
Scoring Engine (Weighted metrics)
    ↓
MongoDB Storage
    ↓
Frontend Dashboard (Charts, Insights, Leaderboard)

📡 API Endpoints
POST /upload

Upload video for analysis.

GET /analysis/{id}

Fetch specific analysis with transcript, scores & insights.

GET /analysis

List all analyses (pagination supported).

🏆 Hackathon-Ready Features

✔ Fully modular backend
✔ Modern frontend with Tailwind + shadcn
✔ Real AI models integrated
✔ Whisper transcription
✔ LLaMA NLP scoring
✔ Scoring engine with insights
✔ MongoDB Atlas cloud storage
✔ Production-level code structure
✔ Professional documentation (this README)

🤝 Contributors

Veeresh Devadhar — Full-stack development, AI pipeline, system design
Shivukumar Naik - frontend development
Shivarajgouda N C - Testing and validation
Tharungowda K - Planning

📄 License

MIT License

🛠 Troubleshooting
if you get any errors in installation then try this powershell installation script
✅ PowerShell Installation Script
Create a file named install.ps1 in the root of your project, and paste this:

Write-Host "🚀 Mentor Scoring AI – Automated Installation Script" -ForegroundColor Cyan

# -----------------------------
# CHECK PYTHON VERSION
# -----------------------------
Write-Host "`n🔍 Checking Python version..."
$pythonVersion = py -3.11 --version 2>$null

if (-not $pythonVersion) {
    Write-Host "❌ Python 3.11 not found. Please install Python 3.11 first." -ForegroundColor Red
    exit
}
Write-Host "✔ Python 3.11 detected: $pythonVersion" -ForegroundColor Green

# -----------------------------
# BACKEND SETUP
# -----------------------------
Write-Host "`n📦 Setting up Backend..."

Set-Location backend

# Create venv
Write-Host "🔧 Creating virtual environment..."
py -3.11 -m venv venv

Write-Host "🔧 Activating venv..."
./venv/Scripts/Activate.ps1

# Upgrade pip
Write-Host "⬆ Updating pip..."
python -m pip install --upgrade pip

# Install backend packages
Write-Host "📦 Installing backend dependencies..."
pip install -r requirements.txt

# Install whisper
Write-Host "🎤 Installing Whisper..."
pip install openai-whisper

# Create uploads folders
if (-not (Test-Path "uploads/videos")) {
    New-Item -ItemType Directory -Path "uploads/videos" | Out-Null
    Write-Host "📁 Created uploads/videos folder"
}

# Create .env file
Write-Host "📝 Creating .env file..."

@"
# Application
APP_NAME=Mentor Scoring AI
APP_VERSION=1.0.0
DEBUG=True
HOST=0.0.0.0
PORT=8000

# MongoDB Atlas (SET YOUR OWN)
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
DATABASE_NAME=mentor_scoring

# File Upload
MAX_FILE_SIZE=524288000
UPLOAD_DIR=uploads
ALLOWED_EXTENSIONS=["mp4", "avi", "mov", "mkv", "webm"]

# AI Models
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
WHISPER_MODEL=base
WHISPER_DEVICE=cpu

# CORS
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]

# Security
SECRET_KEY=your_secret_key.
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
"@ | Set-Content ".env"

Write-Host "✔ Backend .env created!" -ForegroundColor Green

# Go back to root
Set-Location ..

# -----------------------------
# INSTALL OLLAMA & MODEL
# -----------------------------
Write-Host "`n🤖 Setting up Ollama..."

$ollama = Get-Command ollama -ErrorAction SilentlyContinue

if (-not $ollama) {
    Write-Host "⚠ Ollama not installed. Please download it manually from https://ollama.com/download" -ForegroundColor Yellow
} else {
    Write-Host "✔ Ollama detected. Pulling model llama3.1:8b..."
    ollama pull llama3.1:8b
}

# -----------------------------
# FRONTEND SETUP
# -----------------------------
Write-Host "`n🌐 Setting up Frontend..."

Set-Location frontendorg

Write-Host "📦 Installing Node dependencies..."
npm install

Write-Host "📝 Creating frontend .env..."

@"
VITE_API_URL=http://localhost:8000
"@ | Set-Content ".env"

Write-Host "✔ Frontend .env created!" -ForegroundColor Green

Set-Location ..

# -----------------------------
# INSTALLATION COMPLETE
# -----------------------------
Write-Host "`n🎉 Installation completed successfully!" -ForegroundColor Green
Write-Host "`nTo RUN the project:" -ForegroundColor Cyan

Write-Host "Backend:" -ForegroundColor Yellow
Write-Host "  cd backend"
Write-Host "  venv\\Scripts\\activate"
Write-Host "  uvicorn app.main:app --reload --port 8000"

Write-Host "`nFrontend:" -ForegroundColor Yellow
Write-Host "  cd frontendorg"
Write-Host "  npm run dev"

Write-Host "`n✨ Mentor Scoring AI is ready to run!"

How to Use This Script?
Step 1 — Extract project
mentor-scoring-ai/

Step 2 — Run script

Right-click → Run with PowerShell, or:

powershell -ExecutionPolicy Bypass -File install.ps1


Everything installs automatically.

🏁 Final Notes

This project is designed for production-level AI processing with clean modular architecture. If judges or users follow this README, they can run the entire system end-to-end smoothly.
