#!/bin/bash

# Prompt the user for a commit message
read -p "Enter commit message: " commit_message

# Check if the user provided a message
if [ -z "$commit_message" ]; then
  echo "Error: Commit message cannot be empty."
  exit 1
fi

# Add all changes to staging
git add .

# Commit with the user's message
git commit -m "$commit_message"

# Push changes to the remote repository
git push origin main

echo "Changes pushed successfully!"
