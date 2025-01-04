FROM node:lts-alpine
WORKDIR /invoicer

COPY app/ ./app/
COPY package*.json ./

EXPOSE 4971

RUN npm install --omit=dev

CMD [ "npm", "start" ]
