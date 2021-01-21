import os
import flask
import json

app = flask.Flask(__name__, static_folder='build/', static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/login')
def login():
    return json.dumps({'id': '1232132149999'})

@app.route('/logout')
def logout():
    return json.dumps({})
