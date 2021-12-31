FROM node:lts AS builder

RUN npm i -g @nestjs/cli@^8.0.0

WORKDIR /usr/src/app

COPY ./ /usr/src/app/

RUN npm i

RUN nest build

FROM node:lts-alpine

WORKDIR /usr/src/app/

RUN mkdir -p /usr/src/app/

COPY --from=builder /usr/src/app/package.json /usr/src/app/package-lock.json ./

COPY --from=builder /usr/src/app/dist ./dist/

RUN npm ci --only=production

ENTRYPOINT [ "npm" ]

CMD [ "run", "start:prod" ]