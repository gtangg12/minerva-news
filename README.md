# minerva
Using AI to revolutionize how we browse and comprehend news

## Development Notes
React frontend, Python/Flask backend, and MongoDB

npm & create-react-app is used in the development process for frontend.

When first cloning repo, make sure to run
```
npm install
```
which will create a node_modules folder with the dependencies specified in package.json. Also run
```
pip3 install -r requirements.txt
```
for the necessary Python libs

### Frontend
To start the development server, which enables hotloading on http://localhost:3000
```
npm start
```

### App
First set env variables in env.txt, specifically
```
{YOUR_GOOGLE_CLIENT_ID}
{YOUR_GOOGLE_CLIENT_SECRET}
{YOUR_MONGO_ATLAS_SRV}
```
To test frontend + backend, we first need a production build for frontend (only build if frontend changes)
```
npm run build
```
Then to launch the app run
```
python3 app.py
```
The app will be hosted on http://localhost:5000. To run both at once do (recommended since one often forgets to build)
```
sh run.txt
```
If some components exhibit weird behavior after correct bugs, try clearing browser cache etc...

**Important: Please do not attempt to set up a proxy for the npm dev server. Authentication won't work unless frontend/backend are on same port.**

## Heroku Deployment
Make sure you have Heroku CLI installed. We will be using gunicorn, python WSGI HTTP server,
to serve the Flask application (specified in Procfile).

First change os.environ['GUNICORN'] in app.py to True.

Next create the app on Heroku. Then run
```
heroku git:remote -a {YOUR_APP_NAME}
heroku buildpacks:set heroku/python
heroku buildpacks:add --index 1 heroku/nodejs
```
to set up the Heroku build environment. Next, set the environmental variables on Heroku.
```
heroku config:set GOOGLE_CLIENT_ID={YOUR_GOOGLE_CLIENT_ID}
heroku config:set GOOGLE_CLIENT_SECRET={YOUR_GOOGLE_CLIENT_SECRET}
heroku config:set MONGO_ATLAS_SRV={YOUR_MONGO_ATLAS_SRV}
```
Finally commit to Heroku (repeat for subsequent deploys)
```
git add .
git commit -m {COMMIT_MESSAGE}
git push heroku master
```
Make sure to wait a little bit before accessing the website. Otherwise 1) it might not update or 2) freeze.
