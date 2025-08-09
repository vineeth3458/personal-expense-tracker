# personal-expense-tracker
This Personal Expense Tracker project is built using Node.js, Express, and MongoDB, with a user-friendly  frontend and features for tracking, categorizing, and analyzing daily expenses.  

📌 Overview
This is a full-stack personal expense tracker that allows users to:

Track their expenses with category tagging

Set and monitor a monthly budget

View expense summaries (total spent, categories used, budget status)

Get automatic category suggestions using a Naive Bayes ML model based on expense description

Store all expense data in a MongoDB database

The backend is built with Node.js (Express) and integrates with Python ML scripts for predictions. The frontend is built using HTML, CSS, and JavaScript.

🛠️ Tech Stack
Frontend
HTML5, CSS3, JavaScript

Responsive design

LocalStorage for budget persistence

Backend
Node.js + Express.js

MongoDB (Mongoose for schema management)

PythonShell for running Python ML models

Machine Learning
Category Prediction: Naive Bayes (scikit-learn) trained on sample expense descriptions

Budget Overuse Prediction: Simple neural network (TensorFlow) to detect if a new expense exceeds the budget

📂 Project Structure
bash
Copy
Edit
.
├── ml_model.py           # Python ML script for category prediction
├── predict_budget.py     # Python ML script for budget overuse prediction
├── model.pkl             # (Optional) Saved ML model
├── server.js             # Node.js backend server
├── package.json          # Node.js dependencies
├── index.html            # Frontend HTML file
├── script.js             # Frontend JS logic
├── styles.css            # Stylesheets
├── styles2.css
├── styles3.css
└── README.md             # Project documentation
⚙️ Installation & Setup
1️⃣ Prerequisites
Make sure you have installed:

Node.js (v18+ recommended)

Python 3 (with pip)

MongoDB (running locally on mongodb://127.0.0.1:27017)

2️⃣ Install Backend Dependencies
bash
Copy
Edit
npm install
3️⃣ Install Python Dependencies
bash
Copy
Edit
pip install pandas scikit-learn tensorflow
4️⃣ Start MongoDB
Make sure MongoDB is running locally:

bash
Copy
Edit
mongod
5️⃣ Run the Server
bash
Copy
Edit
node server.js
Server runs on:
📍 http://localhost:5000

🚀 Features
Expense Management
Add expenses with amount, category, date, description

Store expenses in MongoDB

Delete expenses dynamically

Budget Tracking
Set a monthly budget

See real-time budget usage in percentage

Get alerts when budget is exceeded

ML Category Prediction
When typing a description, the system predicts the most likely category automatically

🔍 API Endpoints
Method	Endpoint	Description
POST	/add-expense	Saves a new expense to MongoDB
POST	/predict-category	Predicts expense category from description

💡 How It Works
Frontend (index.html & script.js)

Displays budget, expenses, categories

Sends data to backend for saving & prediction

Backend (server.js)

Connects to MongoDB

Provides API for expense saving and ML predictions

Runs Python scripts for predictions using python-shell

Machine Learning

ml_model.py → Uses TfidfVectorizer + Naive Bayes to classify expense category

predict_budget.py → Uses TensorFlow to determine if the new expense will exceed the budget

🖥️ Running the App
Open your browser and go to:

arduino
Copy
Edit
http://localhost:5000
Set your monthly budget.

Add expenses — categories may be predicted automatically.

Watch the budget usage update live.

📌 Future Improvements
Persist expense history in MongoDB and display past records

Train ML model with user-specific historical data

Add authentication for multiple users

Deploy to cloud (AWS, Heroku, Render)

