from flask import render_template
# A very simple Flask Hello World app for you to get started with...

from flask import Flask

app = Flask(__name__)

@app.route('/', methods=["GET"])
def index():
    return render_template("main_page.html")

@app.route('/menu2', methods=["GET"])
def menu2():
    return render_template("menu2_page.html")

@app.route('/menu3', methods=["GET"])
def menu3():
    return render_template("menu3_page.html")