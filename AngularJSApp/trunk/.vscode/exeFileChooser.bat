<# : exeFileChooser.bat

:: Open file chooser and outputs choice(s) to the console
:: https://stackoverflow.com/a/15885133/1683264

@echo off
setlocal
set arg1 = %0
set filepaths=
for /f "delims=" %%I in ('powershell -noprofile "iex (
    echo %%I
)
goto :EOF

: end Batch portion / begin PowerShell hybrid chimera #>

Add-Type -AssemblyName System.Windows.Forms





[void]
if (
