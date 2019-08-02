# http://flask.pocoo.org/docs/1.0/quickstart/#routing
from flask import Flask, render_template
from flask import jsonify
from flask import request
from highlights import badmintonHighlightsFunction
from highlights import tennisHighlightsFunction
from highlights import get_highlights 
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_url_path="")

cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/")
def root():
    return app.send_static_file("index.html")


@app.route("/<path:path>")
def static_file(path):
    return app.send_static_file(path)


@app.route("/highlights", methods=["POST"])
@cross_origin()
def cricket():
    if request.method == "POST":
        param = request.json["parameters"]
        # param.batsman, bowler, shot, ball_type, runs, wicket
        url = get_highlights(
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


@app.route("/baddyhighlights", methods=["POST"])
@cross_origin()
def badminton():
    if request.method == "POST":
        if request.args['inputUrl'] and request.args['email']:
            param = request.args
            url = badmintonHighlightsFunction(
                    param["inputUrl"], param['email']
                )
            return "Success"
        else:
            return "Bad Request"
    else:
        return "Please POST"


@app.route("/tennishighlights", methods=["POST"])
@cross_origin()
def tennis():
    if request.method == "POST":
        if request.args['inputUrl'] and request.args['email']:
            param = request.args
            url = tennisHighlightsFunction(
                param["inputUrl"], param['email']
            )
            return "Success"
        else:
            return "Bad Request"
    else:
        return "Please POST"



