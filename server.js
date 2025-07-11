const { PythonShell } = require("python-shell");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static frontend files

// Connect to local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/expense-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Mongoose schema
const expenseSchema = new mongoose.Schema({
    amount: Number,
    category: String,
    date: String,
    description: String,
});

const Expense = mongoose.model("Expense", expenseSchema);

// Route to handle saving expenses
app.post("/add-expense", async (req, res) => {
    try {
        console.log("📥 Received expense:", req.body);
        const { amount, category, date, description } = req.body;

        if (!amount || !category || !date || !description) {
            return res.status(400).send("❌ Missing fields");
        }

        const newExpense = new Expense({ amount, category, date, description });
        await newExpense.save();

        res.status(200).send("✅ Expense saved");
    } catch (err) {
        console.error("❌ Error saving expense:", err);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ ML route to predict category from description
app.post("/predict-category", (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).send("❌ Description required");
    }

    const options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: __dirname,
        args: [],
    };

    const pyshell = new PythonShell("ml_model.py", options);

    let result = "";
    pyshell.stdin.write(JSON.stringify({ description }));
    pyshell.stdin.end();

    pyshell.stdout.on("data", (data) => {
        result += data;
    });

    pyshell.on("close", () => {
        res.json({ predictedCategory: result.trim() });
    });

    pyshell.on("error", (err) => {
        console.error("PythonShell error:", err);
        res.status(500).send("Prediction error");
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
