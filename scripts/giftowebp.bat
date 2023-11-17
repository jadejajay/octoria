@echo off
setlocal enabledelayedexpansion

REM Set the paths to your input and output folders
set "inputFolder=C:\Users\aa\Desktop\asteroid\outputGIFs"
set "outputFolder=C:\Users\aa\Desktop\asteroid\outputFolder"

REM Ensure the output folder exists
if not exist "%outputFolder%" mkdir "%outputFolder%"

REM Set the path to ffmpeg executable
set "ffmpegPath=ffmpeg"

REM Set additional FFmpeg options, adjust the quality factor as needed
set "ffmpegOptions=-c:v libwebp -lossless 0 -q:v 80"

REM Loop through each GIF file in the input folder
for %%i in ("%inputFolder%\*.gif") do (
    set "inputFile=%%i"
    
    REM Extract the file name and extension
    set "fileName=%%~ni"
    
    REM Construct the output file path with the same name and a WebP extension
    set "outputFile=%outputFolder%\!fileName!.webp"

    REM Use FFmpeg to convert the GIF to WebP Animation format
    "%ffmpegPath%" -i "!inputFile!" %ffmpegOptions% "!outputFile!"

    echo "Converted: !inputFile!" 
)

echo "Conversion complete."
pause
