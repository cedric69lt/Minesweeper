# Build stage 
FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Final stage
FROM node:lts-alpine as final
EXPOSE 3000

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build .

RUN npm i -g serve

CMD serve