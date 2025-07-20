from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import pandas as pd
from chatbot import query_transactions
import openai
import os
from werkzeug.security import generate_password_hash, check_password_hash

# initialize flask app
app = Flask(__name__)
# enable cross-origin resource sharing
CORS(app)

# database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///project.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# initialize sqlalchemy
db = SQLAlchemy(app)
# initialize marshmallow
ma = Marshmallow(app)

# define transaction model
class Transaction(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, default=datetime.date.today)
    category = db.Column(db.String(100))
    type = db.Column(db.String(10))
    amount = db.Column(db.Float)
    description = db.Column(db.String(200))

    def __init__(self, date, category, type, amount, description):
        self.date = date
        self.category = category
        self.type = type
        self.amount = amount
        self.description = description

# define transaction schema
class TransactionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'date', 'category', 'type', 'amount', 'description')

# initialize transaction schema instances
transaction_schema = TransactionSchema()
transactions_schema = TransactionSchema(many=True)

# define mastery model
class Mastery(db.Model):
    __tablename__ = "mastery"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, default=datetime.date.today)
    budget = db.Column(db.Float)
    income_goal = db.Column(db.Float)
    budget_date = db.Column(db.Date, default=datetime.date.today)
    income_goal_date = db.Column(db.Date, nullable=True)

    def __init__(self, date, budget, income_goal, budget_date, income_goal_date):
        self.date = date
        self.budget = budget
        self.income_goal = income_goal
        self.budget_date = budget_date
        self.income_goal_date = income_goal_date

# define mastery schema
class MasterySchema(ma.Schema):
    class Meta:
        fields = ('id', 'date', 'budget', 'income_goal', 'budget_date', 'income_goal_date')

# initialize mastery schema instances
mastery_schema = MasterySchema()
masteries_schema = MasterySchema(many=True)

# define user model
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, email, password, type):
        self.email = email
        self.password = generate_password_hash(password)
        self.type = type

# define user schema
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email', 'type', 'created_at')

# initialize user schema instances
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# create tables if not already created
with app.app_context():

    #Mastery.__table__.drop(db.engine)
    db.create_all()  # Creates the tables if not already created

    """if not Transaction.query.filter_by(id="1").first():
        sample_transaction = Transaction(date=datetime.date.today(), category="Travel", type="Expense", amount=-100.0, description="Flight to New York")
        db.session.add(sample_transaction)
        db.session.commit()"""
    
    if not Mastery.query.filter_by(id="1").first():
        sample_mastery = Mastery(date=datetime.date.today(), budget=200.00, income_goal=5000.00, budget_date=datetime.date.today(), income_goal_date=datetime.date.today())
        db.session.add(sample_mastery)
        db.session.commit()

    # Initialize base user if not exists
    if not User.query.filter_by(email="aaravkothari155@gmail.com").first():
        base_user = User(email="aaravkothari155@gmail.com", password="minty", type="student")
        db.session.add(base_user)
        db.session.commit()

# define route for home page
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# define route to list all transactions
@app.route('/listtransactions', methods=['GET'])
def listtransactions():
    all_transactions = Transaction.query.all()
    results = transactions_schema.dump(all_transactions)
    return jsonify(results)

# define route to get details of a specific transaction
@app.route('/transactiondetails/<id>', methods=['GET'])
def transactiondetails(id):
    transaction = Transaction.query.get(id)
    return transaction_schema.jsonify(transaction)

# define route to update a specific transaction
@app.route('/transactionupdate/<id>', methods=['PUT'])
def transactionupdate(id):
    transaction = Transaction.query.get(id)

    # parse the request data
    date = datetime.datetime.strptime(request.json['date'], '%Y-%m-%d').date()
    category = request.json['category']
    type = request.json['type']
    amount = request.json['amount']
    description = request.json['description']

    # update the transaction
    transaction.date = date
    transaction.category = category
    transaction.type = type
    transaction.amount = amount
    transaction.description = description

    # commit the changes
    db.session.commit()
    return transaction_schema.jsonify(transaction)

# define route to delete a specific transaction
@app.route('/transactiondelete/<id>', methods=['DELETE'])
def transactiondelete(id):
    # get the transaction by id
    transaction = Transaction.query.get(id)
    # delete the transaction
    db.session.delete(transaction)
    db.session.commit()
    return transaction_schema.jsonify(transaction)

# define route to add a new transaction
@app.route('/transactionadd', methods=['POST'])
def transactionadd():
    # parse the request data to add transaction
    date = datetime.datetime.strptime(request.json['date'], '%Y-%m-%d').date()
    category = request.json['category']
    type = request.json['type']
    amount = request.json['amount']
    description = request.json['description']

    # create a new transaction using transation model
    transaction = Transaction(date, category, type, amount, description)
    db.session.add(transaction)
    db.session.commit() # commit the transaction to the database

    return transaction_schema.jsonify(transaction)

# define route for chatbot interaction
@app.route('/chatbot', methods=['POST'])
def chatbot():
    message = request.json['message'] # get the message from the request
    print(f"Received message: {message}")
    res = query_transactions(db.engine, message) # query mintyAI RAG agent
    response = {"response": str(res)} # prepare the response
    return jsonify(response) # return the response

# define route to list all masteries
@app.route('/listmasteries', methods=['GET'])
def listmasteries():
    all_masteries = Mastery.query.all()
    results = masteries_schema.dump(all_masteries)
    return jsonify(results)

# define route to get details of a specific mastery
@app.route('/masterydetails/<id>', methods=['GET'])
def masterydetails(id):
    mastery = Mastery.query.get(id)
    return mastery_schema.jsonify(mastery)

# define route to update a specific mastery
@app.route('/masteryupdate/<id>', methods=['PUT'])
def masteryupdate(id):
    mastery = Mastery.query.get(id)

    date = datetime.datetime.strptime(request.json['date'], '%Y-%m-%d').date()
    budget = request.json['budget']
    income_goal = request.json['income_goal']
    budget_date = datetime.datetime.strptime(request.json['budget_date'], '%Y-%m-%d').date()
    income_goal_date = request.json.get('income_goal_date')
    if income_goal_date:
        income_goal_date = datetime.datetime.strptime(income_goal_date, '%Y-%m-%d').date()

    mastery.date = date
    mastery.budget = budget
    mastery.income_goal = income_goal
    mastery.budget_date = budget_date
    mastery.income_goal_date = income_goal_date

    db.session.commit()
    return mastery_schema.jsonify(mastery)

# define route to delete a specific mastery
@app.route('/masterydelete/<id>', methods=['DELETE'])
def masterydelete(id):
    mastery = Mastery.query.get(id)
    db.session.delete(mastery)
    db.session.commit()
    return mastery_schema.jsonify(mastery)

# define route to add a new mastery
@app.route('/masteryadd', methods=['POST'])
def masteryadd():
    date = datetime.datetime.strptime(request.json['date'], '%Y-%m-%d').date()
    budget = request.json['budget']
    income_goal = request.json['income_goal']
    budget_date = datetime.datetime.strptime(request.json['budget_date'], '%Y-%m-%d').date()
    income_goal_date = request.json.get('income_goal_date')
    if income_goal_date:
        income_goal_date = datetime.datetime.strptime(income_goal_date, '%Y-%m-%d').date()

    mastery = Mastery(date, budget, income_goal, budget_date, income_goal_date)
    db.session.add(mastery)
    db.session.commit()

    return mastery_schema.jsonify(mastery)

# define route to reset mastery table
@app.route('/resetmastery', methods=['POST'])
def reset_mastery():
    db.drop_all(bind=None, tables=[Mastery.__table__])
    db.create_all(bind=None, tables=[Mastery.__table__])
    return jsonify({"message": "Mastery table has been reset."})

# run the flask app
if __name__ == "__main__":
    app.run(debug=True, port=8080)