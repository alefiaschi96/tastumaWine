@echo off

start "backend" cmd /k "git pull && npm install && cd core && node .\index.js"
start "frontend" cmd /k "git pull && npm install && npm start"