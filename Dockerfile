# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm config set strict-ssl false
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build --prod

# Establece la imagen base para el servidor web
FROM nginx:1.21.3-alpine

# Copia los archivos necesarios
COPY --from=0 /app/dist/sakai-ng /usr/share/nginx/html

# Expone el puerto 80
#EXPOSE 80

#Using host timezone in linux
#VOLUME ["/etc/localtime:/etc/localtime:ro"]

#Using host timezone in Windows
VOLUME ["/etc/timezone:/etc/timezone:ro"]
ENV TZ=Cuba

# Inicia el servidor web de Nginx
CMD ["nginx", "-g", "daemon off;"]

## Expose port 4200 for the container
EXPOSE 80
#
## Set NG_CLI_ANALYTICS to false to disable usage data collection by Angular
#ENV NG_CLI_ANALYTICS=false
#
## Start the application when the container starts
#CMD ["npm", "start"]
#
## Add this line to allow Angular to listen on all IP addresses
##CMD ["ng", "serve", "--host", "0.0.0.0"]
