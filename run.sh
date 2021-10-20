#!/bin/sh

installServer (){
        echo "install Server"
        cd ./backend
        yarn
        cd ..
        echo "Finished"
}
installClient (){
        echo "install Client"
        cd ./frontend
        yarn
        cd ..
        echo "Finished"
}

RunDev (){
        echo "Running Dev"
        cd ./frontend
        yarn craco start
}



installServer
installClient
RunDev