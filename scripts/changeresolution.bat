@echo off
setlocal enabledelayedexpansion

set "inputFolder=inputVideos"
set "outputFolder=outputVideos"
set "ffmpeg=ffmpeg"

if not exist "%outputFolder%" mkdir "%outputFolder%"

for %%i in ("%inputFolder%\*.*") do (
    if "%%~xi" == ".mp4" (
        set "inputFile=%%i"
        set "outputFile=%outputFolder%\%%~nxi"
        !ffmpeg! -i "!inputFile!" -vf "scale=1024:1024" -c:v libx264 -preset medium -crf 23 -c:a copy "!outputFile!"
    )
)

echo All videos processed.
pause
