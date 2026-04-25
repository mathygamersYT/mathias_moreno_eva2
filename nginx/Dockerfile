FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY index.html ./index.html
COPY css ./css
COPY js ./js
COPY images ./images
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
