FROM node:18-slim

WORKDIR /oei

COPY . .

RUN yarn install

RUN yarn build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE 3002

CMD ["sh", "-c", "/wait && yarn start"]