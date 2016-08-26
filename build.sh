filename=$(date +%Y%m%d%H%M%S)
meteor build --server-only --server="http://m.yigonglue.com" ~/workplace/meteor_output/${filename}
cp main.json ~/workplace/meteor_output/${filename}/
cp server_build.sh ~/workplace/meteor_output/${filename}/
cd ~/workplace/meteor_output
scp -r ${filename} yjl:/alidata/www/ygl/
ssh yjl "cd /alidata/www/ygl/${filename};/bin/bash /alidata/www/ygl/${filename}/server_build.sh"