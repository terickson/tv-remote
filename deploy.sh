#!/bin/bash
set -e

rsync -avz --exclude node_modules --exclude dist --exclude .git \
  . pi@media-server:/usr/apps/tv-remote/

ssh pi@media-server "cd /usr/apps/tv-remote && docker compose up -d --build"
