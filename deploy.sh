#!/bin/bash

# Production Deployment Script for Zentrio Frontend

echo "🚀 Starting Zentrio Frontend Production Deployment..."

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production file not found!"
    echo "Please create .env.production with your production environment variables"
    exit 1
fi

# Load environment variables
source .env.production

# Validate required environment variables
required_vars=(
    "NEXT_PUBLIC_API_URL"
    "NEXTAUTH_URL"
    "NEXTAUTH_SECRET"
    "GOOGLE_CLIENT_ID"
    "GOOGLE_CLIENT_SECRET"
    "NEXT_PUBLIC_ONESIGNAL_APP_ID"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: $var is not set in .env.production"
        exit 1
    fi
done

echo "✅ Environment variables validated"

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -t zentrio-frontend:latest .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed"
    exit 1
fi

echo "✅ Docker image built successfully"

# Run the container
echo "🚀 Starting container..."
docker-compose -f docker-compose.prod.yml up -d

if [ $? -ne 0 ]; then
    echo "❌ Container startup failed"
    exit 1
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Your application should be available at: $NEXTAUTH_URL" 