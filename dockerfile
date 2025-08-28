# Etapa 1: build
FROM node:22.18.0-alpine AS builder

WORKDIR /usr/src/app

# Solo copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias incluyendo dev para build
RUN npm install

# Copiar el resto del código
COPY . .

# Build de NestJS
RUN npm run build

# Etapa 2: producción
FROM node:22.18.0-alpine

WORKDIR /usr/src/app

# Copiar solo los archivos necesarios desde builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Instalar solo production dependencies
RUN npm install --omit=dev

# Exponer puerto
EXPOSE 3000

CMD ["node", "dist/main"]


# --------- Deploy:
# docker container stop second-brain-backend
# docker container rm second-brain-backend
# docker image rm second-brain-backend
# docker compose up -d