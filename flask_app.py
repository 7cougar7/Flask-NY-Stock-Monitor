from flask import render_template
# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="7cougar7",
    password="TiloSQLDB",
    hostname="7cougar7.mysql.pythonanywhere-services.com",
    databasename="7cougar7$symbols",
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class Symbol(db.Model):

    __tablename__ = "symbols"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(4096))

symbols= []

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
