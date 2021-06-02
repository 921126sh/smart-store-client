#!/bin/bash

npm run build:prod

SUCCESS=$?
if [ $SUCCESS != 0 ];
then
    echo -e '\n======================================\n'
    echo 'BUILD FAILED : deploying is cancelled'
    echo -e '\n======================================\n'
    exit 1;
fi
