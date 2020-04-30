FROM node:14.0 AS compile-image

ENV PATH="./node_modules/.bin:$PATH"


COPY . /app
WORKDIR /app
RUN npm install

RUN ng build --prod

FROM nginx:1.18
ENV HTML_DIR=/usr/share/nginx/html

#COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /app/dist/de4l-start-app $HTML_DIR
COPY docker/entrypoint.sh /tmp/
COPY docker/config.template.json /tmp/

RUN chmod +x /tmp/entrypoint.sh

ENTRYPOINT ["/tmp/entrypoint.sh"]
