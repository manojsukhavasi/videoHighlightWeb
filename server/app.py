# http://flask.pocoo.org/docs/1.0/quickstart/#routing
from flask import Flask
from flask import jsonify
from flask import request
from highlights import highlightsFunction
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/")
def hello():
    return "Serve HTML file from here"


@app.route("/highlights", methods=["POST"])
@cross_origin()
def login():
    if request.method == "POST":
        param = request.json["parameters"]
        # param.batsman, bowler, shot, ball_type, runs, wicket
        url = highlightsFunction(
            param["batsman"],
            param["bowler"],
            param["shot"],
            param["ball_type"],
            param["runs"],
            param["wicket"],
        )
        return jsonify({"url": url})
    else:
        return "Please POST"
