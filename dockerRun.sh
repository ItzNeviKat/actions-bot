docker stop actions-bot
docker rm actions-bot
docker build -t actions-bot .
docker run -d -p3030:3030 --name actions-bot -e PORT=3030 actions-bot