FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/dist/00_Angular ./dist/00_Angular
COPY --from=build /app/package*.json ./

RUN npm ci --omit=dev

ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/00_Angular/server/server.mjs"]
