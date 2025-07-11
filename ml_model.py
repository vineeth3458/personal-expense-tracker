# ml_model.py
import sys
import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Example training data (extend this with real user data for better results)
training_data = [
    {"description": "grocery shopping", "amount": 150, "category": "groceries"},
    {"description": "bus fare", "amount": 20, "category": "transport"},
    {"description": "electric bill", "amount": 120, "category": "utilities"},
    {"description": "movie ticket", "amount": 300, "category": "entertainment"},
    {"description": "gym membership", "amount": 500, "category": "health"},
    {"description": "home needs", "amount": 1500, "category": "groceries"},
    {"description": "bus ticket", "amount": 2000, "category": "transport"},
    {"description": "electricity", "amount": 890, "category": "utilities"},
    {"description": "games", "amount": 300, "category": "entertainment"},
    {"description": "hospital", "amount": 5000, "category": "health"},
]

df = pd.DataFrame(training_data)

# Prepare features and labels
X = df['description']
y = df['category']

vectorizer = TfidfVectorizer()
X_vec = vectorizer.fit_transform(X)

model = MultinomialNB()
model.fit(X_vec, y)

# Get input from Node.js
input_data = json.loads(sys.stdin.read())
input_description = input_data["description"]

# Predict category
input_vec = vectorizer.transform([input_description])
predicted_category = model.predict(input_vec)[0]

# Output result
print(predicted_category)
