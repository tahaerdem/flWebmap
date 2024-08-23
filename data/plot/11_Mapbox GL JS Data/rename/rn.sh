#!/bin/bash

# Set the absolute path to the directory containing the files
directory="/Users/taha/Desktop/rename/combined"

# Check if the directory exists
if [[ ! -d "$directory" ]]; then
  echo "Directory $directory does not exist."
  exit 1
fi

# Change to the specified directory
cd "$directory" || exit

# Loop through all files in the directory
for file in *; do
  # Check if the file name matches the pattern
  if [[ $file =~ ^(SVI-[^-]+)-[^-]+-(4.*)$ ]]; then
    # Extract the parts of the file name
    new_name="${BASH_REMATCH[1]}-${BASH_REMATCH[2]}"
    # Rename the file
    mv "$file" "$new_name"
  fi
done

echo "Renaming completed."