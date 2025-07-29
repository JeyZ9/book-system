# --- Build Stage ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# --- Production Stage ---
FROM node:22-alpine AS prod
WORKDIR /app

# ติดตั้ง static server
RUN npm install -g serve

# คัดลอกไฟล์ที่ build แล้วมาจาก build stage
COPY --from=build /app/dist ./dist

EXPOSE 4173

# ใช้ serve เปิด static site บน port 4173
CMD ["serve", "-s", "dist", "-l", "4173"]
