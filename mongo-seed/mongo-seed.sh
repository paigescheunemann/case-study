#! /bin/bash
mongoimport --host mongodb --db test --collection prices --drop --type json --file /mongo-seed/mongo-seed.json --jsonArray
