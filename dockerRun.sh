docker stop actions-bot
docker rm actions-bot
docker build -t actions-bot .
docker run -d -p3020:3020 --name actions-bot -e PORT=3030 actions-bot