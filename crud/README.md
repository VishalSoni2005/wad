curl commands to test server:
1: test

- crul http://localhost:5000/

2: create user

- curl -X POST http://localhost:5000/user/create \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Soni",
  "email": "soni@gmail.com",
  "role": "admin"
  }'

3: Get All users

- curl -X GET http://localhost:5000/users

4: update based on email

- curl -X PUT http://localhost:5000/user/update \
  -H "Content-Type: application/json" \
  -d '{
  "email": "soni@gmail.com",
  "name": "Updated Soni",
  "role": "user"
  }'

5: DELETE user

- curl -X DELETE http://localhost:5000/user/delete \
  -H "Content-Type: application/json" \
  -d '{
  "email": "soni@gmail.com"
  }'

## Docker command:

1; docker build -t crud .
2: docker run -p 5000:5000 crud or docker run --network=host wad_cc_crud

docker run --network=host wad_cc_crud

## ssh -i "wad-cc.pem" ubuntu@ec2-16-170-172-189.eu-north-1.compute.amazonaws.com

## EC2 Instance Commands:

1: sudo apt update && sudo apt upgrade -y
2: sudo apt-get install npm -y
3: sudo npm install -g n
4: sudo n lts

- installing nginx
  5: sudo apt install nginx -y
  6: sudo systemctl start nginx
  7: sudo systemctl enable nginx
  8: sudo systemctl status nginx

- Nginx configuration
  sudo mkdir -p /var/www/wad-cc-practical
  cd /var/www/wad-cc-practical
  sudo nano /etc/nginx/sites-available/wad-cc-practical

  server {
  listen 80;
  server_name 16.170.172.189;

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

- createing symbol link
  Enable the Configuration

sudo ln -s /etc/nginx/sites-available/wad-cc-practical /etc/nginx/sites-enabled/

sudo rm /etc/nginx/sites-enabled/default

sudo nginx -t

sudo systemctl restart nginx
