Berikut adalah panduan lengkap untuk deploy ke Ubuntu server:

## 📋 **Deployment Prerequisites**

### **1. Setup Ubuntu Server**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js & pnpm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g pnpm

# Install Nginx (untuk reverse proxy)
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

---

## 🚀 **Deployment Steps**

### **Step 1: Clone & Setup Project**

```bash
# SSH ke server
ssh user@your-ubuntu-server

# Clone project (atau upload via SCP)
git clone <your-repo-url> /home/user/foodtrip-ui
cd /home/user/foodtrip-ui

# Install dependencies
pnpm install
```

---

### **Step 2: Build for Production**

```bash
# Build semua packages
pnpm build

# Hasil build ada di:
# - apps/admin/dist/
# - apps/client/dist/
```

---

### **Step 3: Setup Nginx**

**Create Admin Config** (`/etc/nginx/sites-available/admin.conf`):

```nginx
server {
    listen 80;
    server_name admin.yourdomain.com;  # Ganti domain

    root /home/user/foodtrip-ui/apps/admin/dist;
    index index.html;

    location / {
        try_files $uri /index.html;  # SPA routing
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|gif|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Create Client Config** (`/etc/nginx/sites-available/client.conf`):

```nginx
server {
    listen 80;
    server_name yourdomain.com;  # Ganti domain

    root /home/user/foodtrip-ui/apps/client/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location ~* \.(js|css|png|jpg|gif|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Enable Sites:**

```bash
sudo ln -s /etc/nginx/sites-available/admin.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/client.conf /etc/nginx/sites-enabled/

# Test & Restart
sudo nginx -t
sudo systemctl restart nginx
```

---

### **Step 4: Setup SSL (Let's Encrypt)**

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Generate certificates
sudo certbot --nginx -d yourdomain.com -d admin.yourdomain.com

# Auto-renewal (already enabled)
sudo systemctl enable certbot.timer
```

---

### **Step 5: Setup Auto-Redeploy (Optional)**

**Create Deploy Script** (`/home/user/deploy.sh`):

```bash
#!/bin/bash

cd /home/user/foodtrip-ui

# Pull latest code
git pull origin main

# Install & build
pnpm install
pnpm build

# Restart Nginx
sudo systemctl restart nginx

echo "✅ Deploy completed!"
```

**Make executable:**

```bash
chmod +x /home/user/deploy.sh
```

**Setup GitHub Webhook (optional):**

- Go to GitHub repo → Settings → Webhooks
- Add webhook to trigger the deploy script on push

---

## 📂 **Directory Structure on Server**

```
/home/user/
├── foodtrip-ui/
│   ├── apps/
│   │   ├── admin/dist/  ← Admin production build
│   │   └── client/dist/ ← Client production build
│   ├── packages/
│   ├── pnpm-lock.yaml
│   └── ...
└── deploy.sh
```

---

## 🔐 **Environment Variables**

**Create `.env.production`** (jika butuh):

```bash
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=FoodTrip
```

**Build dengan env:**

```bash
# Vite otomatis load .env.production
pnpm build
```

---

## ✅ **Verification Checklist**

```bash
# Check Nginx status
sudo systemctl status nginx

# Check domains resolving
curl -I http://yourdomain.com
curl -I http://admin.yourdomain.com

# Check SSL certificate
sudo certbot certificates

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🛠️ **Maintenance Commands**

```bash
# Manual redeploy
cd /home/user/foodtrip-ui
git pull
pnpm build
sudo systemctl restart nginx

# View Nginx config
sudo nginx -T

# Reload config (tanpa restart)
sudo systemctl reload nginx

# Check disk usage
du -sh /home/user/foodtrip-ui
```

---

## 📊 **Deployment Architecture**

```
┌─────────────────────────────────────┐
│     Visitors Browser                │
└──────────────┬──────────────────────┘
               │
        ┌──────▼──────┐
        │   Nginx     │
        │ Reverse     │
        │  Proxy      │
        └──────┬──────┘
        ┌──────┴──────┐
        │             │
   ┌────▼────┐  ┌────▼────┐
   │  Admin  │  │ Client   │
   │  (SPA)  │  │  (SPA)   │
   └─────────┘  └──────────┘
```

---

## 🎯 **Production Checklist**

- [ ] Domain & DNS configured
- [ ] SSL certificate installed
- [ ] Nginx config optimized
- [ ] Build tested locally
- [ ] Environment variables set
- [ ] Logs monitoring setup
- [ ] Backup strategy defined
- [ ] Auto-renewal configured
- [ ] Firewall rules set (`sudo ufw allow 80,443`)

---

## 💡 **Tips**

✅ **Static hosting** - Cocok untuk SPA (Admin & Client)
✅ **CDN** - Optional untuk faster asset delivery
✅ **Monitoring** - Setup uptime monitoring
✅ **Backups** - Regular git pull + database backup

Mana aspek yang ingin dijelaskan lebih detail? 🚀You've used 56% of your weekly rate limit. Your weekly rate limit will reset on May 11 at 7:00 AM. [Learn More](https://aka.ms/github-copilot-rate-limit-error)
