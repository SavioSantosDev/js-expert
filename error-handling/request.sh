echo $'\n\n[requesting: normal request]\n\n'
curl -i localhost:3000 -X POST --data '{ "name": "Vingador", "age": 58 }'

echo $'\n\n[requesting: wrong age]\n\n'
curl -i localhost:3000 -X POST --data '{ "name": "Vingador", "age": 18 }'

echo $'\n\n[requesting: wrong name]\n\n'
curl -i localhost:3000 -X POST --data '{ "name": "Foo", "age": 25 }'

echo $'\n\n[requesting: all invalid]\n\n'
curl -i localhost:3000 -X POST --data '{ "name": "Foo", "age": 18 }'
