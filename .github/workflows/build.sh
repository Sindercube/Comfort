if [ -d "build/" ]; then
  rm -rf build/
fi
mkdir build

packwiz cf export -o build/client.zip
packwiz cf export -s server -o build/server.zip

#cp build/client.zip build/multimc.zip
#cd multimc
#zip ../build/multimc.zip ./*
#cd ..