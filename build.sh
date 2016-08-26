filename=$(date +%Y%m%d%H%M%S)
server_path="/alidata/www/ygl/"
meteor build --server-only --server="http://m.yigonglue.com" ~/workplace/meteor_output/${filename}
cp main.json ~/workplace/meteor_output/${filename}/
cp server_build.sh ~/workplace/meteor_output/${filename}/
cd ~/workplace/meteor_output
scp -r ${filename} yjl:${server_path}
ssh yjl "cd ${server_path}${filename};/bin/bash ${server_path}${filename}/server_build.sh"