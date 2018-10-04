FROM node:8

RUN mkdir -p /usr/src/app
RUN npm i -g nodemon

COPY ./package.json /usr/src/package.json
# COPY ./package-lock.json /usr/src/package-lock.json
RUN npm install --silent

WORKDIR /usr/src

CMD ["npm", "start"]
