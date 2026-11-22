@echo off
REM Run this ONCE from inside the opal-site folder (double-click). Needs internet. Windows 10/11.
cd /d "%~dp0"
set B=https://invitima.com/templates/opal-romance
echo Downloading the desktop pictures...
curl -L --fail -o "templates\opal-romance\gate\landscape.webp"          "%B%/gate/landscape.webp"
curl -L --fail -o "templates\opal-romance\gate\landscape-left.webp"     "%B%/gate/landscape-left.webp"
curl -L --fail -o "templates\opal-romance\gate\landscape-right.webp"    "%B%/gate/landscape-right.webp"
curl -L --fail -o "templates\opal-romance\gate\landscape-opening.png"   "%B%/gate/landscape-opening.png"
curl -L --fail -o "templates\opal-romance\hero\landscape.webp"          "%B%/hero/landscape.webp"
curl -L --fail -o "templates\opal-romance\backdrop\sky-wide.webp"       "%B%/backdrop/sky-wide.webp"
curl -L --fail -o "templates\opal-romance\couple\frame-arabesque.webp"  "%B%/couple/frame-arabesque.webp"
curl -L --fail -o "templates\opal-romance\couple\frame-arabesque-mask.png" "%B%/couple/frame-arabesque-mask.png"
echo.
echo Done. If any line above says "error", send me that line.
echo Now run preview.bat, press Ctrl+F5 in the browser, and check the gate and first screen.
pause
