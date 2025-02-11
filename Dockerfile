FROM node:20 AS builder

WORKDIR /app

COPY . ./

RUN npm ci --legacy-peer-deps\
  && npm install typescript -g
RUN npm run build
FROM nginx:1.16.0-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY deployment/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 5001
CMD ["nginx", "-g", "daemon off;"]