---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🧠 Mentor Scoring AI

AI-Powered Video Analysis & Teaching Performance Evaluation

FastAPI Backend • React (Vite) Frontend • Whisper • LLaMA (Ollama) • MediaPipe • MongoDB

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🚀 Overview

Mentor Scoring AI is a full-stack application that automatically evaluates teaching/mentoring videos.
It processes uploaded videos through an AI pipeline and returns:

🎤 Speech transcription & voice clarity metrics (Whisper)

🎭 Visual engagement metrics (MediaPipe)

🧠 NLP insights & scoring (LLaMA via Ollama)

📊 Final scores, insights and an interactive dashboard

Flow: Upload video → AI pipeline → Scores & Insights → Dashboard

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

⚙️ Prerequisites

Windows / macOS / Linux

Python 3.11 (recommended) — Whisper & some audio libs are problematic on Python 3.12+

Node.js (LTS, e.g. 18+) — for frontend

MongoDB Atlas or local MongoDB

FFmpeg (required for Whisper audio processing)

Ollama (optional — required if you want local LLaMA scoring)

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🔧 Backend Setup (FastAPI)
1.Open a terminal / PowerShell, then:
  cd backend

2.Create & activate virtual environment (Windows PowerShell example)
  py -3.11 -m venv venv
  venv\Scripts\activate
(Use python3 -m venv venv && source venv/bin/activate on macOS/Linux)

3.Upgrade pip and install dependencies
  python -m pip install --upgrade pip
  pip install -r requirements.txt
  pip install openai-whisper
  pip install python-dotenv

4.Install FFmpeg(optional)

Download (Windows): https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip

Extract to C:\ffmpeg then add C:\ffmpeg\bin to your PATH.

On macOS: brew install ffmpeg

On Linux: use your package manager apt, dnf, etc.

5.Create .env file
Create backend/.env with these exact contents (replace placeholders):
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
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

Notes

If your MongoDB username or password contains special characters (e.g. @, :), percent-encode them (URL encoding) or use a connection string that avoids placing credentials in the URI.

WHISPER_DEVICE=cpu ensures Whisper runs on CPU. Use cuda if you have a GPU and the proper PyTorch GPU build.

OLLAMA_BASE_URL + OLLAMA_MODEL are used if you run Ollama locally for LLaMA scoring.

6.Create uploads folders
  mkdir uploads
  mkdir uploads\videos

7.Run backend
  uvicorn app.main:app --reload --port 8000
Open API docs: http://localhost:8000/docs

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🌐 Frontend Setup (React + Vite)
1.Install Node.js (LTS): https://nodejs.org
2.Install & run frontend

  cd frontendorg
npm install
# create .env file (frontendorg/.env)
# VITE_API_URL=http://localhost:8000
npm run dev

Frontend dev server default: http://localhost:5173
If it opens on port 3000 use that — the backend CORS list includes both.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🧠 AI Components
Whisper: speech-to-text transcription (installed via openai-whisper)

Librosa / soundfile: audio features (MFCC, pitch, energy)

OpenCV + MediaPipe: frame processing and pose/facial landmarks

Ollama + LLaMA (optional): local LLM scoring — requires Ollama installed and relevant model pulled

Ollama quick start (if using LLaMA locally)
# Install Ollama (follow https://ollama.com/download)
# Start Ollama
ollama serve
# Pull model (example)
ollama pull llama3.1:8b

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📡 API Endpoints (summary)
POST /api/analysis/upload — Upload a video (form-data: video, mentor_name, subject, optional mentor_id)

GET /api/analysis/{analysis_id} — Fetch results for an analysis

GET /api/analysis?skip=0&limit=10 — List analyses (pagination)
(Use /docs for full interactive Swagger)

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🛠 Troubleshooting
NumPy/Scipy build errors: ensure Python 3.11 and use wheels — do not use Python 3.13+.

Whisper errors / ffmpeg not found: install FFmpeg and add to PATH.

MongoDB TLS / SSL errors: try adding tls=true or tlsAllowInvalidCertificates=true to the connection string for local testing only; prefer fixing network/SSL trust in production.

Ollama errors: ensure ollama binary is installed and ollama serve running before calling model endpoints.

✅ install.ps1 (Automated PowerShell installer)-> (if you get any trouble in installation use this script)
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
SECRET_KEY=Shivarajnc189723056.189723056.
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

🧪 How Judges Use This Script
Step 1 — Extract project
mentor-scoring-ai/

Step 2 — Run script
Right-click → Run with PowerShell, or:
powershell -ExecutionPolicy Bypass -File install.ps1

Everything installs automatically.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🤖 AI Pipeline Architecture

🤖 AI Pipeline Architecture Video Upload -> Frame Extraction (OpenCV) -> Facial & Pose Analysis (MediaPipe) -> Audio Feature Extraction (Librosa) -> Whisper Speech Transcription -> NLP Evaluation (LLaMA through Ollama) -> Scoring Engine (Weighted metrics) -> MongoDB Storage -> Frontend Dashboard (Charts, Insights, Leaderboard)

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🏁 Final Notes
This project is designed for production-level AI processing with clean modular architecture. If judges or users follow this README, they can run the entire system end-to-end smoothly.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------









