set -e

PROJECT=citrouille
USER=edweis
SERVER=lipp.igw.world 



echo "\n🚀 Send to server"
rsync -ravzh --filter=':- .gitignore'  . $USER@$SERVER:/home/$USER/Documents/$PROJECT/

echo "\n🚀 Download dependencies"
ssh -t $USER@$SERVER "cd Documents/$PROJECT ; pnpm install --prod"

echo "\n🏃🏻‍♂️ Restart nginx" # sudo ln -s /home/ubuntu/kobe/nginx.conf /etc/nginx/conf.d/kobe.conf # Make sure the symlink exists 
ssh $USER@$SERVER "sudo nginx -t && sudo nginx -s reload"

echo "\n🏃🏻‍♂️ Restart kobe"
ssh $USER@$SERVER pm2 reload $PROJECT 



## Starting  pm2 for the first time
# NODE_ENV=production pm2 start ./src/index.js \
#     --name kobe --time \
#     -o $HOME/.pm2/logs/kobe-logs.log -e $HOME/.pm2/logs/kobe-logs.log
# pm2 save