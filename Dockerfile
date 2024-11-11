FROM node:20-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . .

# ENV VITE_API_URL http://luris-inventory-order.duckdns.org
RUN npm run build

FROM nginx:latest
COPY default.conf ./etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80