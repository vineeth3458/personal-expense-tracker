document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.querySelector(".expense-form");
    const expenseTableBody = document.querySelector(".expense-table tbody");
    const totalExpenses = document.querySelector(".summary-section .summary-card:nth-child(1) .summary-amount");
    const totalCategories = document.querySelector(".summary-section .summary-card:nth-child(2) .summary-amount");
    const budgetStatus = document.querySelector(".summary-section .summary-card:nth-child(3) .summary-amount");
    const budgetForm = document.querySelector(".budget-section form");
    const budgetInput = document.getElementById("monthly-budget");

    const descriptionInput = document.getElementById("expense-description");
    const categorySelect = document.getElementById("expense-category");

    let maxBudget = localStorage.getItem("monthlyBudget") ? parseFloat(localStorage.getItem("monthlyBudget")) : 3000;
    budgetInput.value = maxBudget;

    let categories = new Set();

    function updateSummary() {
        let total = 0;
        categories.clear();
        document.querySelectorAll(".expense-table tbody tr").forEach(row => {
            const amount = parseFloat(row.querySelector(".amount").textContent.replace("₹", "")) || 0;
            total += amount;
            const category = row.querySelector(".category-tag").textContent.trim();
            categories.add(category);
        });

        totalExpenses.textContent = `₹${total.toFixed(2)}`;
        totalCategories.textContent = categories.size;
        let budgetUsed = ((total / maxBudget) * 100).toFixed(0);
        budgetStatus.textContent = `${budgetUsed}%`;
        budgetStatus.classList.toggle("warning", budgetUsed > 80);

        if (budgetUsed >= 100) {
            alert("Warning: You have reached your monthly budget limit!");
        }
    }

    budgetForm.addEventListener("submit", function (event) {
        event.preventDefault();
        maxBudget = parseFloat(budgetInput.value);
        localStorage.setItem("monthlyBudget", maxBudget);
        updateSummary();
    });

    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const amount = document.getElementById("expense-amount").value;
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;
        const description = document.getElementById("expense-description").value;

        if (!amount || !category || !date || !description) {
            alert("Please fill in all fields.");
            return;
        }

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${date}</td>
            <td>${description}</td>
            <td><span class="category-tag ${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</span></td>
            <td class="amount">₹${parseFloat(amount).toFixed(2)}</td>
            <td><button class="delete-btn">❌</button></td>
        `;

        expenseTableBody.appendChild(newRow);
        updateSummary();
        expenseForm.reset();

        // ✅ Backend connection - Save to MongoDB
        fetch("/add-expense", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: parseFloat(amount),
                category,
                date,
                description
            })
        });
    });

    expenseTableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            event.target.closest("tr").remove();
            updateSummary();
        }
    });

    // ✅ Predict category on description blur
    descriptionInput.addEventListener("blur", async () => {
        const desc = descriptionInput.value;
        if (!desc || categorySelect.value) return;

        try {
            const response = await fetch("/predict-category", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description: desc }),
            });

            const data = await response.json();
            const predicted = data.predictedCategory;

            if (predicted) {
                categorySelect.value = predicted.toLowerCase();
            }
        } catch (err) {
            console.error("Prediction request failed:", err);
        }
    });

    // Clear expenses on page refresh
    expenseTableBody.innerHTML = "";
    updateSummary();
});
