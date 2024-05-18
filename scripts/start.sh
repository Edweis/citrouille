set -e

pnpm nodemon -e hbs,js --watch src src/index.js &
pnpm tailwindcss -i ./src/tailwind-styles.css -o ./src/assets/styles.css --watch

wait