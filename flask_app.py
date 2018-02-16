from flask import render_template
# A very simple Flask Hello World app for you to get started with...

from flask import Flask

app = Flask(__name__)

@app.route('/', methods=["GET"])
def index():
    return render_template("main_page.html")