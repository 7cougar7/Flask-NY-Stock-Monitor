from __future__ import print_function
from flask import render_template
# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import request
from flask import jsonify
from sqlalchemy import create_engine
import json
import sys

app = Flask(__name__)

symbol_data = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="7cougar7",
    password="SQLDBTILO",
    hostname="7cougar7.mysql.pythonanywhere-services.com",
    databasename="7cougar7$symbols")

engine = create_engine(symbol_data)

@app.route('/', methods=["GET"])

def index():
    return render_template("main_page.html")
    results=engine.execute("SELECT * FROM symbol_source LIMIT 5;")
    return json.dumps([(dict(row.items())) for row in results])

@app.route('/buys', methods=["GET"])
def buys():
    return render_template("gainers_page.html")

@app.route('/terms', methods=["GET"])
def terms():
    return render_template("terms.html")

@app.route('/sells', methods=["GET"])
def sells():
    return render_template("losers_page.html")

@app.route('/contact', methods=["GET"])
def contact():
    return render_template("contact_page.html")

@app.route('/about', methods=["GET"])
def about():
    return render_template("about_page.html")

@app.route('/search/<symbol>', methods=["GET"])
def search(symbol):
    print(symbol)
    return render_template("search_page.html")

@app.route('/content', methods=["GET"])
def searchpage():
    symbol = request.args.get("symbol")
    print("request recieved: search:{0}".format(symbol), file=sys.stderr)
    # below is a good debug line, but will probably remove once debugging is complete
    sql_query_string, params = create_query(symbol)
    print("sql_query_string: {0} params: {1}".format(sql_query_string, params), file=sys.stderr)
    #print("this is for the search %s" % symbol)
    results = engine.execute(sql_query_string, params)
    results = [dict(row.items()) for row in results]
    print(json.dumps(results))
    return jsonify(results)

def create_query(search):
    query_string = "SELECT symbol, name, isenabled FROM symbol_source"
    params = ()
    # we will set convention to always add a space at the BEGINNING of the sql chunk we're adding
    if search != "":
        query_string += " WHERE symbol = %s OR name LIKE %s AND isenabled = 1 ORDER BY symbol=%s DESC"
        params+=(search.upper(),)
        params+=("%"+search+"%",)
        params+=(search.upper(),)
    # we're adding this limit to cover the scenario the user didn't supply any
    # paramters. We don't want to return ALL the rows in our DB!
    query_string += " limit 20"
    return query_string, params

