FROM node:12

RUN apk add --no-cache git tini

RUN mkdir /app
WORKDIR /app

RUN yarn install

CMD ["bin/boot.sh"]
