#!/bin/bash

# Quick Deployment Script for Zentrio Frontend with Docker + Nginx

echo "🚀 Zentrio Frontend Production Deployment (Docker + Nginx)"
echo "Domain: kshrd.zentrio.pro"
echo ""

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production file not found!"
    echo "Please create .env.production with your production environment variables"
    echo "You can copy from env.production.template"
    exit 1
fi

# Check if SSL certificates exist
if [ ! -f "ssl/kshrd.zentrio.pro.crt" ] || [ ! -f "ssl/kshrd.zentrio.pro.key" ]; then
    echo "⚠️  SSL certificates not found!"
    echo "Running SSL setup..."
    if [ -f "setup-ssl.sh" ]; then
        chmod +x setup-ssl.sh
        ./setup-ssl.sh
    else
        echo "❌ setup-ssl.sh not found. Please set up SSL certificates manually."
        exit 1
    fi
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

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.nginx.yml down

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose -f docker-compose.nginx.yml up -d --build

if [ $? -ne 0 ]; then
    echo "❌ Container startup failed"
    exit 1
fi

echo "✅ Containers started successfully!"

# Wait for containers to be healthy
echo "⏳ Waiting for containers to be healthy..."
sleep 10

# Check container status
echo "📊 Container status:"
docker-compose -f docker-compose.nginx.yml ps

# Test health endpoints
echo "🏥 Testing health endpoints..."
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Frontend health check passed"
else
    echo "⚠️  Frontend health check failed (this might be normal during startup)"
fi

if curl -f https://kshrd.zentrio.pro/api/health > /dev/null 2>&1; then
    echo "✅ Nginx proxy health check passed"
else
    echo "⚠️  Nginx proxy health check failed (check SSL configuration)"
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "🌐 Your application should be available at:"
echo "   https://kshrd.zentrio.pro"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker-compose -f docker-compose.nginx.yml logs -f"
echo "   Stop: docker-compose -f docker-compose.nginx.yml down"
echo "   Restart: docker-compose -f docker-compose.nginx.yml restart"
echo "   Update: docker-compose -f docker-compose.nginx.yml up -d --build" 