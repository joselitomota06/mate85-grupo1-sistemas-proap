#!/usr/bin/env bash
set -e

# Função para repassar o sinal ao Java
term_handler() {
  echo "Recebido SIGTERM, repassando para PID $SPRING_PID"
  kill -TERM "$SPRING_PID" 2>/dev/null
  wait "$SPRING_PID"
  exit 0
}

# Captura SIGTERM e SIGINT
trap 'term_handler' SIGTERM SIGINT

# 1) inicia Spring em background
java -jar /app/app.jar --server.port="$API_PORT" &
SPRING_PID=$!

# 2) gera nginx.conf substituindo variáveis do template
envsubst '${PORT} ${API_PORT}' \
  < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/default.conf

# 3) Nginx em foreground (vira PID 1)
exec nginx -g "daemon off;"