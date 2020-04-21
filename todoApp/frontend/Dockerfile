FROM mhart/alpine-node:12

RUN apk add --no-cache git tini

RUN mkdir /app
WORKDIR /app

CMD ["bin/boot.sh"]
