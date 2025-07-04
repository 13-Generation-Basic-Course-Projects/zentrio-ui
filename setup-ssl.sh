#!/bin/bash

# SSL Certificate Setup Script for Zentrio Frontend
# This script helps you set up SSL certificates for kshrd.zentrio.pro

echo "🔐 SSL Certificate Setup for Zentrio Frontend"
echo "Domain: kshrd.zentrio.pro"
echo ""

# Create SSL directory
mkdir -p ssl

echo "Choose your SSL certificate method:"
echo "1. Let's Encrypt (recommended - automatic)"
echo "2. Self-signed certificate (for testing)"
echo "3. Upload existing certificate"
echo "4. Skip SSL setup (manual setup later)"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "📋 Let's Encrypt Setup"
        echo "Prerequisites:"
        echo "- Domain kshrd.zentrio.pro must point to this server"
        echo "- Ports 80 and 443 must be open"
        echo "- certbot must be installed"
        echo ""
        
        read -p "Do you have certbot installed? (y/n): " certbot_installed
        
        if [[ $certbot_installed == "y" || $certbot_installed == "Y" ]]; then
            echo "🔍 Obtaining SSL certificate from Let's Encrypt..."
            sudo certbot certonly --standalone -d kshrd.zentrio.pro --email your-email@example.com --agree-tos --non-interactive
            
            if [ $? -eq 0 ]; then
                echo "✅ Certificate obtained successfully!"
                echo "📁 Copying certificates to ssl directory..."
                sudo cp /etc/letsencrypt/live/kshrd.zentrio.pro/fullchain.pem ssl/kshrd.zentrio.pro.crt
                sudo cp /etc/letsencrypt/live/kshrd.zentrio.pro/privkey.pem ssl/kshrd.zentrio.pro.key
                sudo chown $USER:$USER ssl/kshrd.zentrio.pro.*
                echo "✅ SSL certificates are ready!"
            else
                echo "❌ Failed to obtain certificate. Please check your domain configuration."
                exit 1
            fi
        else
            echo "📦 Installing certbot..."
            if command -v apt-get &> /dev/null; then
                sudo apt-get update
                sudo apt-get install -y certbot
            elif command -v yum &> /dev/null; then
                sudo yum install -y certbot
            else
                echo "❌ Unsupported package manager. Please install certbot manually."
                exit 1
            fi
        fi
        ;;
    2)
        echo "🔧 Creating self-signed certificate..."
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout ssl/kshrd.zentrio.pro.key \
            -out ssl/kshrd.zentrio.pro.crt \
            -subj "/C=KH/ST=Phnom Penh/L=Phnom Penh/O=Zentrio/OU=IT/CN=kshrd.zentrio.pro"
        echo "✅ Self-signed certificate created!"
        echo "⚠️  Note: Browsers will show security warnings for self-signed certificates."
        ;;
    3)
        echo "📁 Upload existing certificate"
        echo "Please place your certificate files in the ssl directory:"
        echo "- Certificate: ssl/kshrd.zentrio.pro.crt"
        echo "- Private key: ssl/kshrd.zentrio.pro.key"
        echo ""
        read -p "Press Enter when you've placed the files..."
        
        if [[ -f "ssl/kshrd.zentrio.pro.crt" && -f "ssl/kshrd.zentrio.pro.key" ]]; then
            echo "✅ Certificate files found!"
        else
            echo "❌ Certificate files not found in ssl directory."
            exit 1
        fi
        ;;
    4)
        echo "⏭️  Skipping SSL setup. You can set up certificates manually later."
        echo "⚠️  Make sure to update nginx/nginx.conf to remove SSL configuration."
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "🎉 SSL setup completed!"
echo ""
echo "Next steps:"
echo "1. Update your .env.production file with the correct environment variables"
echo "2. Run: docker-compose -f docker-compose.nginx.yml up -d"
echo "3. Test your application at: https://kshrd.zentrio.pro" 