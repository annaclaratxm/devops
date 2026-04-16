FROM node:20-alpine
WORKDIR /app
COPY . .
WORKDIR /app/front
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]