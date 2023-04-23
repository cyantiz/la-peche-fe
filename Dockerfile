FROM node:18-bullseye-slim
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production
ENV NUXT_PUBLIC_API_BASE_URL=https://lapeche.date/api/
ENV VITE_API_BASE_URL=https://lapeche.date/api

RUN NODE_OPTIONS="--max-old-space-size=8192" npm run build

ENTRYPOINT ["npm", "run", "start"]
