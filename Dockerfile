# Usamos una imagen oficial de Node para construir la app
FROM node:18-alpine AS build

# Creamos directorio de trabajo
WORKDIR /app

# Copiamos dependencias y las instalamos
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Construimos la aplicación para producción
RUN npm run build

# Usamos una imagen ligera de Nginx para servir la app
FROM nginx:alpine

# Copiamos los archivos generados al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]