FROM node
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .-
ENV REACT_APP_DEV=yes
EXPOSE 3000
RUN npm run build
CMD ["npm","start"]