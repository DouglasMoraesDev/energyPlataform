FROM node:18-slim

WORKDIR /app
COPY package*.json ./
RUN npm install

# gera o client do Prisma
RUN npx prisma generate

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
