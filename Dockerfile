FROM node:lts-alpine
WORKDIR /app

COPY src/ ./src/
COPY package* ./

EXPOSE 3000

RUN npm install --omit=dev

CMD [ "npm", "start" ]
