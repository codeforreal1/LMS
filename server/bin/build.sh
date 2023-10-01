echo $(pwd);
echo -e "\e[1;32m> Generating a production build...\e[0m"
rm -rf ./dist/*;
tsc --build;