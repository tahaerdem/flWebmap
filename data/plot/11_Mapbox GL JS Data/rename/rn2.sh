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

# Print current directory
echo "Current directory: $(pwd)"

# Loop through all files in the directory
for file in *; do
  echo "Processing file: $file" # Debug statement
  
  # Extract the base name up to the second "-"
  if [[ $file =~ ^(([^-]+-){2}) ]]; then
    base_name="${BASH_REMATCH[1]%?}"
    
    # Initialize counter for unique naming
    counter=1
    new_name="$base_name"
    
    # Add the original extension back to the new name
    extension="${file##*.}"
    new_name="$new_name.$extension"
    
    # Check if the new name already exists
    while [[ -e "$new_name" ]]; do
      new_name="${base_name}-${counter}.$extension"
      ((counter++))
    done
    
    echo "Renaming $file to $new_name" # Debug statement
    # Rename the file
    mv "$file" "$new_name"
  else
    echo "File $file does not match the expected pattern" # Debug statement
  fi
done

echo "Renaming completed."