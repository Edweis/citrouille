set -e

# Sync nginx conf
sudo ln -fs \
  /Users/francoisrulliere/Documents/edweis/citrouille/nginx.local.conf \
  /opt/homebrew/etc/nginx/servers/citrouille.conf || true;
sudo nginx -t; sudo nginx -s reload;


pnpm nodemon -e hbs,js --watch src src/index.js &
pnpm tailwindcss -i ./src/tailwind-styles.css -o ./src/assets/styles.css --watch

wait