import json
import requests
import flask
import flask_login
import oauthlib.oauth2

from db import user_db, MongoJSONEncoder
from models.user import User

auth_api = flask.Blueprint('auth_api', __name__)

# Google Client Info
with open('secret/google_client_info.txt', 'r') as fin:
    GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET = tuple(fin.read().splitlines())
GOOGLE_DISCOVERY_URL = 'https://accounts.google.com/.well-known/openid-configuration'
GOOGLE_PROVIDER_CFG = requests.get(GOOGLE_DISCOVERY_URL).json()

client = oauthlib.oauth2.WebApplicationClient(GOOGLE_CLIENT_ID)


@auth_api.route("/whoami")
def loggedin():
    ret = {}
    if flask_login.current_user.is_authenticated:
        ret = flask_login.current_user.query_user()
    return flask.jsonify(MongoJSONEncoder().encode(ret))


@auth_api.route("/login")
def login():
    # Find out what URL to hit for Google login
    authorization_endpoint = GOOGLE_PROVIDER_CFG["authorization_endpoint"]

    # Use library to construct the request for Google login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=flask.request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return flask.redirect(request_uri)


@auth_api.route("/login/callback")
def callback():
    # Get authorization code Google sent back to you and request user info
    code = flask.request.args.get("code")
    token_endpoint = GOOGLE_PROVIDER_CFG["token_endpoint"]
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=flask.request.url,
        redirect_url=flask.request.base_url,
        code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )
    client.parse_request_body_response(json.dumps(token_response.json()))

    # Get user information once authorized
    userinfo_endpoint = GOOGLE_PROVIDER_CFG["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body).json()

    if userinfo_response.get("email_verified"):
        id = userinfo_response["sub"]
        name = userinfo_response["given_name"]
        email = userinfo_response["email"]
        picture = userinfo_response["picture"]
    else:
        return 'User email not available or not verified by Google.', 400

    # Create user, maintain user db, and begin session
    user = User(id=id, name=name, email=email, picture=picture)
    if not user_db.find_one({'id': id}):
        user_db.insert_one(user.create_user())
    flask_login.login_user(user)

    return flask.redirect(flask.url_for("index"))


@auth_api.route("/logout")
@flask_login.login_required
def logout():
    flask_login.logout_user()
    return flask.redirect(flask.url_for("index"))
