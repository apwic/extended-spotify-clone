FROM node:16

WORKDIR /app

COPY package.json .

COPY package-lock.json .

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ADD . .

RUN npm config set unsafe-perm true

RUN npm install

RUN chown -R node:node /app/node_modules

USER node

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev", "--host"]

EXPOSE 3000