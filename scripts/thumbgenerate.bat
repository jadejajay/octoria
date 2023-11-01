@echo off
setlocal enabledelayedexpansion

rem Input directory containing video files
set "inputDir=C:\Users\aa\Desktop\project1\inputVideos"

rem Output directory for thumbnail images
set "outputDir=C:\Users\aa\Desktop\project1\thumbnailImages"

rem FFmpeg executable path (replace with your actual FFmpeg path)
set "ffmpegPath=ffmpeg"

rem Loop through each video file in the input directory
for %%i in ("%inputDir%\*.mp4") do (
    rem Extract the filename without extension
    set "inputFile=%%~ni"
    
    rem Define the output image file path
    set "outputFile=!outputDir!\!inputFile!.jpg"
    
    rem Use FFmpeg to generate a thumbnail image
    "%ffmpegPath%" -i "%%i" -ss 00:00:03 -vframes 1 "!outputFile!"
    
    echo Thumbnail created for "%%i"
)

echo Thumbnails generation complete.

endlocal
