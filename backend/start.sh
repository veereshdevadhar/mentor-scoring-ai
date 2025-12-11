#!/bin/bash

echo "🚀 Starting Ollama in CPU mode..."
ollama serve &

echo "⬇ Pulling LLaMA model..."
ollama pull llama3.1:8b

echo "🚀 Starting FastAPI server..."
uvicorn app.main:app --host 0.0.0.0 --port 8000
