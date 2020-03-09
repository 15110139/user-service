FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG MONGODB_HOST=localhost
ARG MONGODB_PORT=27017
ARG MONGODB_DB_NAME=user-service
ARG GRPC_SERVER_HOST_ORDER_SERVICE=0.0.0.0:53001
ARG ZOOKEEPER_HOST=0.0.0.0:2181

ENV MONGODB_HOST=${MONGODB_HOST}
ENV MONGODB_PORT=${MONGODB_PORT}
ENV MONGODB_DB_NAME=${MONGODB_DB_NAME}
ENV GRPC_SERVER_HOST_ORDER_SERVICE=${GRPC_SERVER_HOST_ORDER_SERVICE}
ENV ZOOKEEPER_HOST=${ZOOKEEPER_HOST}

EXPOSE 53000

CMD [ "npm", "run","grpc" ]