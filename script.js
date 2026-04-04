// Initial activity data
let activities = [
    { name: "HTML Practice", description: "Learn HTML basics", status: "Pending" },
    { name: "CSS Styling", description: "Design webpage", status: "Pending" },
    { name: "JavaScript Task", description: "Build small JS project", status: "Pending" },
    { name: "Seminar Preparation", description: "Prepare seminar slides", status: "Pending" },
    { name: "Project Research", description: "Collect project information", status: "Pending" },
    { name: "Coding Practice", description: "Solve coding problems", status: "Pending" }
];

// Load from Local Storage if exists
if(localStorage.getItem("activities")){
    activities = JSON.parse(localStorage.getItem("activities"));
}

// Show selected section
function showSection(section){
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(section).classList.add("active");
}

// Render activities dynamically
function loadActivities(){
    let container = document.getElementById("activityContainer");
    container.innerHTML = "";

    activities.forEach((act,index)=>{
        let div = document.createElement("div");
        div.className = "activity" + (act.status==="Completed" ? " completed" : "");

        div.innerHTML = `
            <div class="activity-details">
                <h3>${act.name}</h3>
                <p>${act.description}</p>
            </div>
            <div>
                <input type="checkbox" ${act.status==="Completed" ? "checked" : ""} onchange="toggleActivity(${index}, this)">
            </div>
        `;
        container.appendChild(div);
    });

    updateProgress();
}

// Toggle activity Pending ↔ Completed
function toggleActivity(index, checkbox){
    activities[index].status = checkbox.checked ? "Completed" : "Pending";
    localStorage.setItem("activities", JSON.stringify(activities));
    loadActivities();
}

// Update progress bar and text
function updateProgress(){
    let completed = activities.filter(a => a.status==="Completed").length;
    let total = activities.length;
    let percent = (completed/total)*100;

    document.getElementById("progressFill").style.width = percent + "%";
    document.getElementById("progressText").innerText =
        completed===total ? "All activities completed! 🎉" : `${completed} out of ${total} activities completed`;
}

// Initial load
loadActivities();