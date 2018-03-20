from flask import render_template
# A very simple Flask Hello World app for you to get started with...

from flask import Flask

app = Flask(__name__)

@app.route('/', methods=["GET"])
def index():
    return render_template("main_page.html")

@app.route('/buys', methods=["GET"])
def buys():
    return render_template("gainers_page.html")

@app.route('/sells', methods=["GET"])
def sells():
    return render_template("losers_page.html")

@app.route('/contact', methods=["GET"])
def contact():
    return render_template("contact_page.html")

@app.route('/search/<symbol>', methods=["GET"])
def searchpage(symbol):
    return render_template("search_page.html")
    return "this is for the symbol %s" % symbol
