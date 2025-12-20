# ---------- STAGE 1: BUILD ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copia apenas arquivos de dependência
COPY package*.json ./

# Instala TODAS as deps (inclui dev)
RUN npm ci

# Copia o resto do código
COPY . .

# Build do NestJS (gera dist/)
RUN npm run build


# ---------- STAGE 2: RUNTIME ----------
FROM node:22-alpine

WORKDIR /app

# Copia apenas o necessário para produção
COPY package*.json ./
RUN npm ci --omit=dev

# Copia o build gerado
COPY --from=builder /app/dist ./dist

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Roda JS compilado
CMD ["node", "dist/main.js"]
