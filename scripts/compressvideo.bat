@echo off
setlocal enabledelayedexpansion

REM Set the paths to your input and output folders
set "inputFolder=C:\Users\aa\Desktop\asteroid\inpImages"
set "outputFolder=C:\Users\aa\Desktop\asteroid\outputFolder"

REM Ensure the output folder exists
if not exist "%outputFolder%" mkdir "%outputFolder%"

REM Set the path to ffmpeg executable
set "ffmpegPath=ffmpeg"

REM Set the desired video codec (h.264 is used in this example)
set "videoCodec=h264"

REM Set the desired bitrate (adjust as needed)
set "bitrate=1000k"

REM Loop through each video file in the input folder
for %%i in ("%inputFolder%\*.mp4") do (
    set "inputFile=%%i"

   REM Extract the file name and extension
    set "fileName=%%~ni"
    
    REM Construct the output file path in the same folder with the same name
    set "outputFile=%outputFolder%\!fileName!.mp4"

    REM Use FFmpeg to compress the video
    "%ffmpegPath%" -i "!inputFile!" -c:v !videoCodec! -b:v !bitrate! -c:a copy "!outputFile!"

    echo "Compressed: !inputFile!" 
)

echo "Compression complete."
pause
