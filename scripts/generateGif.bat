@echo off
setlocal enabledelayedexpansion

rem Input directory containing video files
set "inputDir=C:\Users\aa\Desktop\project1\inputVideos"

rem Output directory for GIFs
set "outputDir=C:\Users\aa\Desktop\project1\outputGIFs"

rem FFmpeg executable path (replace with your actual FFmpeg path)
set "ffmpegPath=ffmpeg"

rem Loop through each video file in the input directory
for %%i in ("%inputDir%\*.mp4") do (
    rem Extract the filename without extension
    set "inputFile=%%~ni"
    
    rem Define the output GIF file path
    set "outputFile=!outputDir!\!inputFile!.gif"
    
    rem Use FFmpeg to generate a 2-second GIF
    "%ffmpegPath%" -t 2 -i "%%i" -vf "fps=10,scale=320:-1:flags=lanczos" "!outputFile!"
    
    echo GIF created for "%%i"
)

echo GIF generation complete.

endlocal
