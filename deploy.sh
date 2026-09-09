#!/bin/bash
set -e

git push

ssh apps.home "cd tv-remote && git pull && docker compose up -d --build"
