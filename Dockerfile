FROM node:24.15.0-alpine3.23@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json tsconfig.test.json eslint.config.js ./
COPY src ./src
RUN npm run build

FROM nginx:1.30.4-alpine3.24@sha256:97d490c12ba55b4946b01546d1c3ed324e8d41ab1c9fcb2a616aa470620e5b46 AS runtime

RUN apk add --no-cache \
      libcap-setcap=2.78-r0 \
      libcap-utils=2.78-r0 \
  && setcap 'cap_net_bind_service=+ep' /usr/sbin/nginx \
  && getcap /usr/sbin/nginx | grep -F 'cap_net_bind_service=ep' \
  && mkdir -p \
      /tmp/client_temp \
      /tmp/proxy_temp \
      /tmp/fastcgi_temp \
      /tmp/uwsgi_temp \
      /tmp/scgi_temp \
  && chown -R nginx:nginx \
      /tmp/client_temp \
      /tmp/proxy_temp \
      /tmp/fastcgi_temp \
      /tmp/uwsgi_temp \
      /tmp/scgi_temp \
  && rm -f /etc/nginx/conf.d/default.conf \
  && apk del libcap-setcap libcap-utils

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O - http://127.0.0.1/healthz | grep -qx ok

USER nginx

CMD ["nginx", "-g", "daemon off;"]
