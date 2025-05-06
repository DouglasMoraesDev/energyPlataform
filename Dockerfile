FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

# Gera o client Prism a partir do schema.prisma
COPY prisma ./prisma
RUN npx prisma generate

# Copia o restante do código
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
