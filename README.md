# P2P Energy Platform

## Descrição
Troca de créditos de energia solar entre residências, com ledger simulado (blockchain leve).

## Tecnologias
- Node.js, Express.js
- MySQL + Prisma
- JWT para autenticação
- Web3.js / módulo JS para blockchain
- Nodemailer para e-mail
- Joi para validação
- Winston para logs
- Jest + Supertest para testes

## Setup
1. Copie `.env.example` para `.env` e ajuste variáveis.
2. `npm install`
3. `npx prisma migrate dev --name init`
4. `npm run seed`
5. `npm run dev`

## Uso em Produção
- Configure variáveis de ambiente
- `npm run build` (se aplicável)
- `npm start`
- Ou via Docker:  
  ```bash
  docker build -t p2p-energy .
  docker run -p 3000:3000 --env-file .env p2p-energy
# energyPlataform
