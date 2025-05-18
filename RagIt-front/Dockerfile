# frontend/Dockerfile
FROM node:24-alpine AS build

WORKDIR /app
COPY rag-app .

RUN npm ci
RUN npm run build

# Serve with nginx
FROM nginx:latest as prod

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]