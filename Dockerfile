FROM node:lts-alpine
WORKDIR /invoicer

COPY app/ ./app/
COPY migrations/ ./migrations/
COPY package* ./

EXPOSE 4971

RUN npm install --omit=dev

CMD [ "npm", "start" ]
