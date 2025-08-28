FROM public.ecr.aws/docker/library/node:18.19.0-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3002

CMD ["npm", "start"]
