#!/bin/bash

display_menu() {
    echo "Select the type of branch you want to create:"
    echo "1) Feature (feat/)"
    echo "2) Chore (chore/)"
    echo "3) Fix (fix/)"
    echo "4) Test (test/)"
    echo ""
    echo "Enter your choice (1-4):"
}

display_menu
read -p "Your choice: " choice

read -p "Enter the branch name: " branch_name

read -p "Enter the issue id: " issue_id

case $choice in
    1)
        prefix="feat"
        ;;
    2)
        prefix="chore"
        ;;
    3)
        prefix="fix"
        ;;
    4)
        prefix="test"
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

branch_name_with_hyphen=$(echo "$branch_name" | sed 's/ /-/g')

full_branch_name="${prefix}/${branch_name_with_hyphen}-${issue_id}"

git checkout -b "$full_branch_name"

if [ $? -eq 0 ]; then
    echo "Branch '$full_branch_name' created successfully."
else
    echo "Failed to create branch '$full_branch_name'."
fi
