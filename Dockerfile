FROM node

RUN mkdir /usr/src/metricas

COPY ["package.json", "package-lock.json", "/usr/src/metricas/"]

WORKDIR /usr/src/metricas

RUN npm install -g @angular/cli

RUN npm install

COPY . .

EXPOSE 4300
