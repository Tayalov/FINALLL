
const themeToggleButton = document.getElementById("theme-toggle");

themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
});

if(localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
} else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
}

const reviewsContainer = document.getElementById("reviews-container");

if (reviewsContainer) {
   
    let feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];

    feedbackData.forEach(feedback => {
        const div = document.createElement("div");
        div.className = "col-md-4";

        div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${feedback.name} (${feedback.role})</h5>
                    <p class="card-text"><strong>Recommendation:</strong> ${feedback.like}</p>
                    <p class="card-text">${feedback.comments || ''}</p>
                </div>
            </div>
        `;
        reviewsContainer.appendChild(div);
    });
}
