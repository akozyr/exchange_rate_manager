FROM node:8

RUN npm i -g nodemon

CMD ["npm", "start"]
