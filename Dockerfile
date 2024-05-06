# build
FROM node:18 as builder

WORKDIR /build

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

# production 

FROM node:18 as productionco

WORKDIR /app

COPY --from=builder /build/dist/ /app/dist/
EXPOSE 8080

COPY package*.json .
COPY vite.config.js .
COPY vercel.json .

RUN npm install

CMD [ "npm","run","preview"]