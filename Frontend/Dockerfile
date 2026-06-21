FROM node:24-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Estágio de produção (Nginx)
FROM nginx:alpine

COPY --from=build /usr/src/app/dist/desafio-estagio-app/browser /usr/share/nginx/html

# Configuração para o Nginx redirecionar as rotas para o index.html (SPA)
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
