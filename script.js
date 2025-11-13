
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

const feedbackForm = document.getElementById("feedback-form");
if(feedbackForm) {
    feedbackForm.addEventListener("submit", function(e){
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const role = document.getElementById("role").value;
        const like = document.querySelector('input[name="like"]:checked')?.value;
        const comments = document.getElementById("comments").value.trim();

        if(!name || !email || !like){
            alert("Please fill in all required fields and select Yes or No.");
            return;
        }

        const feedback = {name, email, role, like, comments};
        let feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];
        feedbackData.push(feedback);
        localStorage.setItem("feedbackData", JSON.stringify(feedbackData));

        alert("Feedback submitted successfully!");
        feedbackForm.reset();
    });
}
