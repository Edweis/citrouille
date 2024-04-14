set -e

USER=edweis
SERVER=lipp.igw.world
DIR=/home/edweis/Documents/citrouille


echo "\n🚀 Send to server"
rsync -ravzh --exclude='node_modules' --exclude='.git' --exclude='database.db'  . $USER@$SERVER:$DIR 

echo "\n🚀 Download dependencies"
ssh -t $USER@$SERVER "cd $DIR ; sudo pnpm install --prod"

echo "\n🏃🏻‍♂️ Restart nginx" # sudo ln -s /home/edweis/Documents/citrouille/nginx.conf /etc/nginx/conf.d/citrouille.conf # Make sure the symlink exists 
ssh $USER@$SERVER "sudo nginx -t && sudo nginx -s reload"

echo "\n🏃🏻‍♂️ Restart citrouille"
ssh $USER@$SERVER pm2 reload citrouille 

echo "🎉 https://citrouille.kapochamo.com"

# View logs with
# ssh ubuntu@ssh.garnet.center tail -f /home/edweis/.pm2/logs/api2-logs.log


## Starting  pm2 for the first time
# NODE_ENV=production pm2 start ./src/index.js \
#     --name citrouille --time \
#     -o $HOME/.pm2/logs/citrouille-logs.log -e $HOME/.pm2/logs/citrouille-logs.log
# pm2 save