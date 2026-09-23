#!/bin/bash
echo "Enter the folder name"
read folder
if [ -d "$folder" ]; then
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")
tar -czf "${folder}_backup_${timestamp}.tar.gz" "$folder"
echo "Backup created successfully!"
else
echo "Folder  Does not exist!"
fi
