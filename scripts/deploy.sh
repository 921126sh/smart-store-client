#!/bin/bash

SKIP_BUILD=${4:-true}

if [ "$SKIP_BUILD" != true ]; then
    . ./scripts/build-check.sh
fi

HOST=${2:-"webhooks.thecloudgate.io"}
USER=${3:-"sh"}

SERVER=$USER@$HOST

DEPLOY_PATH=/opt/cloud-gate-smart-store-front

REMOTE_PATH=$SERVER:$DEPLOY_PATH

ssh $SERVER "rm -rf $DEPLOY_PATH/*"

/usr/bin/rsync -rave "ssh" \
       --exclude=src \
       --exclude=\.git \
       --exclude=\.env \
       --exclude node_modules \
       -av . $REMOTE_PATH

ssh $SERVER "npm install --prefix $DEPLOY_PATH"
ssh $SERVER "npm run --prefix $DEPLOY_PATH build:prod"
ssh $SERVER "sudo docker-compose -f $DEPLOY_PATH/docker-compose.yml down"
ssh $SERVER "sudo docker-compose -f $DEPLOY_PATH/docker-compose.yml up -d"
