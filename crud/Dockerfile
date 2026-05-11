FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]

docker build -t crud .
docker ps
docker run -p 5000:5000 crud
docker stop <container_id>