# Server
1. install python if not already
2. install flask
    - http://flask.pocoo.org/docs/1.0/installation/
    - Install flask-cors: `pip install flask-cors`
3. cd server
4. replace `highlightsFunction` function with actual one in highlights.py 
4. flask run

# Client
1. install nodejs (latest 10.15.3 is suggested)
2. cd client
3. npm install

# Deploy
1. Check values in client\src\constant.tsx and udpate if required, change IP to where server is deployed
2. Production way (suggested)
    1. cd client
    2. npm run build
    2. cd build
    3. copy all files to server/static/ folder
    - Server will be live on default port, mostly 80


2. Development way ()
    1. npm start
    2. live on 3000 probably

