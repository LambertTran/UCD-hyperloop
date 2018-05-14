#!/bin/bash

git status

echo "-------------------"

git add .

git status

echo "-------------------"

read -p "Enter message: " MESSAGE 

git commit -m "$MESSAGE"

git push origin master 
