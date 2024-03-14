FROM node:18-alpine
WORKDIR /countries-and-states-app-typescript
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]