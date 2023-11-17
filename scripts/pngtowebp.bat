@echo off
setlocal enabledelayedexpansion

REM Set the paths to your input and output folders

REM Ensure the output folder exists
set outputFolder=C:\Users\aa\Desktop\asteroid\outputFolder
if not exist "%outputFolder%" mkdir "%outputFolder%"

REM Set the path to ffmpeg executable
set "ffmpegPath=ffmpeg"

REM Set additional FFmpeg options if needed
set "ffmpegOptions=-q:v 70 -compression_level 6"

REM Loop through each image file in the input folder
for %%i in ("C:\Users\aa\Desktop\asteroid\inpImages\*.png") do (
    set "inputFile=%%i"
    
    REM Extract the file name and extension
    set "fileName=%%~ni"
    set "fileExtension=%%~xi"

    REM Construct the output file path with the same name and a WebP extension
    set "outputFile=%outputFolder%\!fileName!.webp"

    REM Use FFmpeg to convert the image to WebP format
    "%ffmpegPath%" -i "!inputFile!" %ffmpegOptions% "!outputFile!"

    echo "Converted: !inputFile!" 
)

echo "Conversion complete."
pause
