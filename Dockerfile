FROM node:18-slim

# 1. Atualiza repositórios e instala as libs SSL necessárias
RUN apt-get update -y && \
    apt-get install -y openssl libssl1.1 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 2. Copia apenas package.json e instala dependências
COPY package*.json ./
RUN npm install

# 3. Copia o schema e gera o Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

# 4. Copia todo o restante do código
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
