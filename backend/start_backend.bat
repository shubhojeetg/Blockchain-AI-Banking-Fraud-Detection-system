@echo off

cd /d "C:\Blockchain Banking app project\backend"

echo Starting FastAPI Backend...

uvicorn main:app --reload

pause