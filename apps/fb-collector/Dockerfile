FROM node:22-alpine AS alpine
WORKDIR /app
COPY apps/fb-collector/package*.json ./
RUN npm install
COPY apps/fb-collector ./
COPY apps/common ./common
RUN npm run build
EXPOSE 3000
CMD ["node", "apps/fb-collector/dist/main.js"]