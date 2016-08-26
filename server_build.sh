tar zxvf ygl_admin.tar.gz
cp main.json bundle/
cd bundle/programs/server
nvm use 4.4.7
npm i
cd ../../
pm2 start main.json