docker run \
    --name express-boilerplate-service \
    --rm \
    --env-file .env.prod \
    -p 3000:3000 \
    express-boilerplate-service
