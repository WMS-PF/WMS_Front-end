#!/bin/bash
cd /home/ubuntu/WMS_LogixPro
npm install && npx next build
PORT=80 npx next start > log.txt &
