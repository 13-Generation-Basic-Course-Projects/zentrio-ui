# Production Deployment Guide for Zentrio Frontend (Docker + Nginx)

## Prerequisites

1. **Domain**: `kshrd.zentrio.pro` (already configured in Google OAuth)
2. **Backend API**: Should be accessible at `https://kshrd.zentrio.pro/api/v1`
3. **Server**: Linux server with Docker and Docker Compose installed
4. **SSL Certificate**: Required for HTTPS (handled by Nginx)

## Environment Variables

Create a `.env.production` file with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://kshrd.zentrio.pro/api/v1

# NextAuth Configuration
NEXTAUTH_URL=https://kshrd.zentrio.pro
NEXTAUTH_SECRET=FVPr6Q/fVlHGZkElZubC0Zaxv657dPUfDQ4o9DADjSin7+uST1d2A5klMWrMK8fmSl3doyf2wn5zj56VC+qqCg==

# Google OAuth Configuration
GOOGLE_CLIENT_ID=512720315813-t8pf1ac1rcrsgqamcr1eagmjjaf5ak09.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# OneSignal Configuration
NEXT_PUBLIC_ONESIGNAL_APP_ID=eb585bc8-4e85-4114-8bbd-43d138858043

# Production Settings
NODE_ENV=production
```

## Deployment Steps

### Step 1: SSL Certificate Setup

1. **Run the SSL setup script:**
   ```bash
   chmod +x setup-ssl.sh
   ./setup-ssl.sh
   ```

2. **Choose your SSL method:**
   - **Let's Encrypt** (recommended): Automatic, free SSL certificates
   - **Self-signed**: For testing only
   - **Upload existing**: If you have certificates from another provider

### Step 2: Environment Configuration

1. **Copy environment template:**
   ```bash
   cp env.production.template .env.production
   ```

2. **Edit the file with your actual values:**
   ```bash
   nano .env.production
   ```

### Step 3: Deploy with Docker + Nginx

1. **Deploy using Docker Compose:**
   ```bash
   docker-compose -f docker-compose.nginx.yml up -d
   ```

2. **Check container status:**
   ```bash
   docker-compose -f docker-compose.nginx.yml ps
   ```

3. **View logs:**
   ```bash
   # Frontend logs
   docker logs zentrio-frontend
   
   # Nginx logs
   docker logs zentrio-nginx
   ```

## Alternative Deployment Methods

### Option 1: Frontend Only (if you have separate Nginx)

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Option 2: Manual Docker Build

```bash
# Build the image
docker build -t zentrio-frontend:latest .

# Run with Nginx
docker run -d \
  --name zentrio-frontend \
  --network zentrio-network \
  --env-file .env.production \
  zentrio-frontend:latest
```

## Verification

1. **Check if containers are running:**
   ```bash
   docker ps
   ```

2. **Test the application:**
   - Visit: `https://kshrd.zentrio.pro`
   - Verify Google OAuth login works
   - Check if API calls are successful

3. **Check health endpoints:**
   ```bash
   # Frontend health
   curl https://kshrd.zentrio.pro/api/health
   
   # Direct container health
   curl http://localhost:3000/api/health
   ```

## Nginx Configuration Features

The Nginx configuration includes:

- **SSL/TLS termination** with modern security settings
- **HTTP to HTTPS redirect**
- **Rate limiting** for API and auth endpoints
- **Gzip compression** for better performance
- **Security headers** (CSP, X-Frame-Options, etc.)
- **Static file caching** for better performance
- **WebSocket support** for real-time features
- **OneSignal service worker** support

## Troubleshooting

### Common Issues:

1. **SSL Certificate Issues:**
   ```bash
   # Check certificate validity
   openssl x509 -in ssl/kshrd.zentrio.pro.crt -text -noout
   
   # Test Nginx configuration
   docker exec zentrio-nginx nginx -t
   ```

2. **Container Communication Issues:**
   ```bash
   # Check network connectivity
   docker network ls
   docker network inspect zentrio-network
   
   # Test container communication
   docker exec zentrio-nginx ping zentrio-frontend
   ```

3. **Environment Variable Issues:**
   ```bash
   # Check environment variables in container
   docker exec zentrio-frontend env | grep -E "(NEXT|GOOGLE|NEXTAUTH)"
   ```

4. **Port Conflicts:**
   ```bash
   # Check if ports are in use
   sudo netstat -tlnp | grep -E ":80|:443|:3000"
   ```

### Debug Commands:

```bash
# View real-time logs
docker-compose -f docker-compose.nginx.yml logs -f

# Access container shells
docker exec -it zentrio-frontend sh
docker exec -it zentrio-nginx sh

# Check Nginx configuration
docker exec zentrio-nginx nginx -T

# Test SSL certificate
curl -I https://kshrd.zentrio.pro
```

## Monitoring and Maintenance

### Log Monitoring:
```bash
# View Nginx access logs
docker exec zentrio-nginx tail -f /var/log/nginx/access.log

# View Nginx error logs
docker exec zentrio-nginx tail -f /var/log/nginx/error.log

# View application logs
docker logs -f zentrio-frontend
```

### SSL Certificate Renewal (Let's Encrypt):
```bash
# Create renewal script
cat > renew-ssl.sh << 'EOF'
#!/bin/bash
sudo certbot renew
sudo cp /etc/letsencrypt/live/kshrd.zentrio.pro/fullchain.pem ssl/kshrd.zentrio.pro.crt
sudo cp /etc/letsencrypt/live/kshrd.zentrio.pro/privkey.pem ssl/kshrd.zentrio.pro.key
sudo chown $USER:$USER ssl/kshrd.zentrio.pro.*
docker restart zentrio-nginx
EOF

chmod +x renew-ssl.sh

# Add to crontab for automatic renewal
echo "0 12 * * * /path/to/your/project/renew-ssl.sh" | crontab -
```

### Backup and Recovery:

```bash
# Backup environment variables
cp .env.production .env.production.backup

# Backup SSL certificates
cp -r ssl ssl.backup

# Backup Docker images
docker save zentrio-frontend:latest > zentrio-frontend-backup.tar

# Restore
docker load < zentrio-frontend-backup.tar
```

## Performance Optimization

1. **Enable Nginx caching** (already configured)
2. **Monitor resource usage:**
   ```bash
   docker stats zentrio-frontend zentrio-nginx
   ```
3. **Scale if needed:**
   ```bash
   # Add more frontend instances
   docker-compose -f docker-compose.nginx.yml up -d --scale zentrio-frontend=2
   ```

## Security Considerations

- SSL certificates are automatically renewed (Let's Encrypt)
- Rate limiting prevents abuse
- Security headers protect against common attacks
- Container isolation with Docker networks
- Non-root user in containers
- Regular security updates for base images 