URL=localhost:3000
npx autocannon $URL -m POST \
  --warmup [-c 1 -d 3] \
  --connections 500 \
  --pipeline 10 \
  --renderStatusCodes

# --warmup [-c 1 -d 3] = significa que vai rodar com um cliente simultaneo durante 3 segundos.

# cat log.txt| grep 12345 | wc -l