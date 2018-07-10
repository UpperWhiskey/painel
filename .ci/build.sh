#!/bin/bash
echo "Running 'npm install'"
npm install
if [ "$?" -eq 0 ];
then
    echo "'npm install' successfull."
fi
echo "Running 'ng build --progress=false --prod --env=$1'"
node_modules/.bin/ng build --progress=false --prod --aot=false --env=$1
if [ "$?" -eq 0 ];
then
    echo "'build for prod finished' successfull."
fi
