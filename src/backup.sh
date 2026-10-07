#!/bin/bash

echo "Enter the folder name"
read folder

if [ ! -d "$folder" ]; then
    echo "Error: folder '$folder' does not exist."
    echo "Please check the folder name and try again."
    exit 1
fi

timestamp=$(date +"%Y-%m-%d_%H-%M-%S")
backup="${folder}_backup_${timestamp}.tar.gz"

if tar -czf "$backup" "$folder"; then
    echo "Backup created successfully: $backup"
else
    echo "Error: backup could not be created."
    exit 1
fi
