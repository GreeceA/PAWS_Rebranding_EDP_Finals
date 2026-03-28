# rename-to-kebab.ps1
# PowerShell script to rename all project files to kebab-case using git mv
# Place this in your project root and run with: powershell -ExecutionPolicy Bypass -File .\rename-to-kebab.ps1

$ErrorActionPreference = "Stop"

function To-KebabCase($name) {
    $name = $name -replace '([a-z0-9])([A-Z])', '$1-$2'
    $name = $name -replace '([A-Z]+)([A-Z][a-z])', '$1-$2'
    $name = $name -replace '_', '-'
    $name = $name -replace '\s+', '-'
    $name = $name.ToLower()
    return $name
}

$extensions = @("*.html", "*.css", "*.js", "*.png", "*.jpg", "*.jpeg", "*.gif", "*.webp")
$dirs = @(".", "css", "js", "assets/images")

foreach ($dir in $dirs) {
    if (Test-Path $dir) {
        Get-ChildItem -Path $dir -Recurse -File | Where-Object {
            $extensions -contains "*${($_.Extension)}"
        } | ForEach-Object {
            $oldPath = $_.FullName
            $newName = To-KebabCase $_.Name
            if ($_.Name -ne $newName) {
                $newPath = Join-Path $_.DirectoryName $newName
                Write-Host "Renaming $oldPath -> $newPath"
                git mv "$oldPath" "$newPath"
            }
        }
    }
}
