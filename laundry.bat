@echo off
cd /d "%~dp0"

echo Starting Laundry (backend + frontend)...

REM Start dev servers in a new window so the script can continue
start "Laundry Dev" cmd /k "npm run dev"

REM Wait a bit for Vite to boot up (3 seconds)
timeout /t 3 /nobreak >nul

REM Open frontend in default browser
start "" "http://localhost:5173"

echo.
echo ==============================
echo  Frontend opened in browser.
echo  You can close this window.
echo ==============================
pause >nul
