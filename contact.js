const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});


if(localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
}


const consultationForm = document.getElementById("consultation-form");
const consultationsList = document.getElementById("consultations-list");


let consultations = JSON.parse(localStorage.getItem("consultations")) || [];

function renderConsultations() {
    consultationsList.innerHTML = "";
    consultations.forEach((c, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <span>${c.name} | ${c.phone} | ${c.procedure} | ${c.date}</span>
            <button class="btn btn-sm btn-danger delete-btn">Delete</button>
        `;
        consultationsList.appendChild(li);

        li.querySelector(".delete-btn").addEventListener("click", () => {
            consultations.splice(index, 1); 
            localStorage.setItem("consultations", JSON.stringify(consultations)); 
            renderConsultations(); 
        });
    });
}

renderConsultations();


consultationForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const procedure = document.getElementById("procedure").value;
    const date = document.getElementById("date").value;

    if(!name || !phone || !procedure || !date){
        alert("Please fill in all required fields.");
        return;
    }

    const newConsultation = {name, phone, procedure, date};
    consultations.push(newConsultation);

    localStorage.setItem("consultations", JSON.stringify(consultations));

    renderConsultations();
    consultationForm.reset();
    alert("Consultation scheduled successfully!");
});
