echo "Enter the folder name"
(date +"%Y-%m-%d_%H-%M-%S")
tar -czf "$folder_backup_$timestamp.tar.gz" "$folder"
echo "Backup created successfully!"
else
echo "Folder  Does not exist!"
fi
