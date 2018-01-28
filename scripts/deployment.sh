#!/bin/bash

rm -rf node_modules
npm i --production
rsync -ravz --delete --rsh=ssh --include-from './scripts/include-filelist.txt' ./ pi:/home/pi/fhem_api
npm i
