Write-Host "Creating directory for puppeteer"
New-Item -Name browser_files -ItemType Directory

Write-Host "Installing Node Modules..."
npm install

Write-Host "Installing Python requests library..."
pip install requests