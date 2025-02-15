FROM node:22.14.0

EXPOSE 3000

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

CMD npm run register && npm run start
