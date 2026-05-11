## Deploy the Node.js backend to an EC2 instance using an automated GitHub Actions CI/CD workflow

After setting up the EC2 instance and configuring security groups, follow these steps to deploy the application:

#### Setp 1: First update & upgrade the packages on your EC2 instance:

```bash
sudo apt update && sudo apt upgrade -y
```

#### Step 2: Install Node.js and npm on your EC2 instance:

```bash
sudo apt-get install npm -y
sudo npm i -g n
sudo n lts # sudo n 22.0.1
```

**After that exit your instance and relogin to check the new node js version**

#### Step 3: Now Install the Nginx server on your EC2 instance:

```bash
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx

```

#### Step 4: Setup Deployment Directory Structure

```bash
# Create app directory
sudo mkdir -p /var/www/express-app
# If you want to set ownership to ubuntu user
# sudo chown -R ubuntu:ubuntu /var/www/express-app
cd /var/www/express-app
```

#### Step 5: Configure Nginx as Reverse Proxy

```bash
# Create Nginx configuration file
sudo nano /etc/nginx/sites-available/express-app
```

##### Paste the following configuration:

```nginx
server {
    listen 80;
    server_name 51.21.253.24;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

```

##### Enable the Configuration

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/express-app /etc/nginx/sites-enabled/

# Remove default configuration
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Step 6: install PM2 to manage the Node.js application

```bash
sudo npm install -g pm2

## Generate the start script using PM2
sudo pm2 startup
```

After this run your application using PM2 in the deployment script and use this command to start the server with PM2:

```bash
sudo pm2 start ecosystem.config.js

## Save the PM2
sudo pm2 save
```
