tar zxvf ygl_admin.tar.gz
cp main.json bundle/
cd bundle/programs/server
/root/.nvm/v0.10.45/bin/nvm use v4.4.7
cnpm i
cd ../../
/root/.nvm/v0.10.45/bin/nvm use v4.4.7
/root/.nvm/versions/node/v4.4.7/bin/pm2 delete admin2
/root/.nvm/versions/node/v4.4.7/bin/pm2 start main.json
/root/.nvm/versions/node/v4.4.7/bin/pm2 show admin2