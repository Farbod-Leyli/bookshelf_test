

*** to run server on Windows server do these steps:

    1. install nodejs 11.2 or higher

    2. install mongoDb 4.0 or higher

    3. copy 'testDB.config' from config folder and paste it in 
        C:\Program Files\MongoDB\Server\4.0\bin

    4. create a folder on desktop for storing database and name it 'testDB'
        make sure you typed the letters correctly

    5. to start database processing, run the 'testDB.bat' in config folder
        it is necessary to run databse before running server
        and make sure it will be always up while server is running
        database will running on port 27017 locally

    6. to start the application run 'Windows PowerShell'
        and cd to server main folder '_newtest'
        then type this line:
            forever -e err.log -o out.log server.js

        or paste the folder '_newtest' on desktop and run '_start_server.bat'
        the server will running on port 8080

    7. to stop server process in background run '_stop_server.bat'
        if you have any problem on port conflicts you can run this before running server

    8. make sure the port 8080 is not blocked in firewall on both inbound and outbound
        and there is no other process on this port

    9. to monitor database simply, install Robo3T from mongoDb website or better tools

    10. if you do these steps carefully you won't have any problem with this application on its service
