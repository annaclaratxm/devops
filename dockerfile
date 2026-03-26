from node:20-alpine
workdir /app
COPY . .
WORKDIR /app/devops-front
RUN npm install
run npm run build
Expose 4173
CMD ["npm", "run", "preview"]