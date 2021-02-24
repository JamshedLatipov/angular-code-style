FROM node:14 AS compile-image
RUN npm install -g nx
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY ./tools .
COPY . /app
RUN npm run build --prod


FROM nginx:alpine as telemetry
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY generate-setting-json.sh /docker-entrypoint.d/generate-setting-json.sh
RUN mkdir -p /usr/share/nginx/html/settings && chmod +x /docker-entrypoint.d/generate-setting-json.sh
COPY --from=compile-image /dist/telemetry /usr/share/nginx/html
