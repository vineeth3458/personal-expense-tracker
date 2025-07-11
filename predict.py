import sys
import joblib

# Get the input
if len(sys.argv) < 2:
    print("No input")
    sys.exit()

description = sys.argv[1]
print(f"📥 Description received: {description}", file=sys.stderr)

# Load model
with open("ml/model.pkl", "rb") as f:
    model = joblib.load(f)

# Predict
predicted = model.predict([description])[0]
print(predicted)
