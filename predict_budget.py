# predict_budget.py
import sys
import json
import numpy as np
import tensorflow as tf

# Read input from JS
data = json.loads(sys.argv[1])
amount = data["amount"]
total_spent = data["total_spent"]
budget = data["budget"]

# Simple logic: [amount, total_so_far, budget]
X = np.array([
    [100, 1000, 3000],
    [200, 2800, 3000],
    [500, 2500, 3000],
    [700, 2200, 3000],
    [1000, 1500, 3000],
])
y = np.array([
    0,  # safe
    1,  # over
    1,  # over
    1,  # over
    0,  # safe
])

model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(10, activation='relu', input_shape=(3,)),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X, y, epochs=10, verbose=0)

prediction = model.predict(np.array([[amount, total_spent, budget]]))[0][0]
result = "over" if prediction > 0.5 else "safe"
print(json.dumps({"prediction": result}))
