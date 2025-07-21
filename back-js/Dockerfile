FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 4000
CMD ["sh", "-c", "npx sequelize-cli db:migrate && node index.js"]