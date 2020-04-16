FROM mhart/alpine-node:12

RUN apk add --no-cache git tini

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --force

CMD ["bin/boot.sh"]
