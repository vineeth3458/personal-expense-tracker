import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib

# Sample training data — you can expand this
data = pd.DataFrame({
    "description": [
        "Bought rice and vegetables",
        "Movie night with friends",
        "Electricity bill payment",
        "Dinner at a restaurant",
        "Monthly bus pass",
        "Online course subscription"
    ],
    "category": [
        "groceries",
        "entertainment",
        "utilities",
        "dining",
        "transport",
        "education"
    ]
})

# Train model
model = make_pipeline(
    TfidfVectorizer(),
    MultinomialNB()
)

model.fit(data["description"], data["category"])

# Save the model
joblib.dump(model, "ml/model.pkl")
print("✅ Model trained and saved as model.pkl")
