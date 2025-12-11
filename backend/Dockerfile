# Base image with Python
FROM python:3.11-slim

# Install basic dependencies
RUN apt-get update && apt-get install -y \
    curl wget git ffmpeg libsm6 libxext6 \
    && rm -rf /var/lib/apt/lists/*

# Install Ollama (CPU mode)
RUN curl -fsSL https://ollama.com/install.sh | OLLAMA_SKIP_GPU=true sh

# Create working directory
WORKDIR /app

# Copy backend files
COPY . .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install openai-whisper

# Make start script executable
RUN chmod +x /app/start.sh

EXPOSE 8000

CMD ["./start.sh"]
