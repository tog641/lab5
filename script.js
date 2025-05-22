window.onload = () => {
    const localdata = localStorage.getItem("profileData");

    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const profileData = localdata ? JSON.parse(localdata) : data;
    document.getElementById("save-profile").addEventListener("click", () => {
        if (document.getElementById("contact-form").checkValidity()) {
            profileData.fullName = document.getElementById("name").value;
            profileData.contacts[1].value = document.getElementById("email").value;
            profileData.contacts[0].value = document.getElementById("phone").value;
            profileData.contacts[2].value = document.getElementById("location").value;
            localStorage.setItem("profileData", JSON.stringify(profileData));
        } else {
            alert("Email or phone number format is not correct!");
        }
    });

    // Fill data into HTML
    document.getElementById("name").value = profileData.fullName;
    document.getElementById("email").value = profileData.contacts[1].value;
    document.getElementById("phone").value = profileData.contacts[0].value;
    console.log(profileData.contacts[0].value);
    console.log(document.getElementById("phone").value);
    document.getElementById("location").value = profileData.contacts[2].value;
    document.getElementById("position").innerText = profileData.position;
    document.getElementById("summary").innerHTML = `<p>${profileData.summary}</p><button id="profile-edit">Edit</button>`;

    document.getElementById("profile-edit").addEventListener("click", () => {
        const profile_summary = prompt("Profile summary:");
        if (profile_summary) {
            document.getElementById("summary").innerHTML = `<p>${profile_summary}</p><button id="profile-edit">Edit</button>`;
            profileData.summary = profile_summary;
            localStorage.setItem("profileData", JSON.stringify(profileData));
        }
    });

    document.getElementById("socials").innerHTML = profileData.socials
        .map(item => `<p><img src="photos/${item.icon}" class="icon"> <a href="#" id="${item.icon.split(".")[0]}">${item.handle}</a></p><button id="${item.icon.split(".")[0]}-edit">Edit</button>`)
        .join("");

    document.getElementById("instagram-edit").addEventListener("click", () => {
        const instagram_handle = prompt("Instagram handle:");
        if (instagram_handle) {
            document.getElementById("instagram").textContent = instagram_handle;
            profileData.socials[0].handle = instagram_handle;
            localStorage.setItem("profileData", JSON.stringify(profileData));
        }
    });
    
    document.getElementById('reset-default').addEventListener('click', () => {
        localStorage.removeItem('profileData');
        location.reload();
    })

    document.getElementById("tik-tok-edit").addEventListener("click", () => {
        const tiktok_handle = prompt("TikTok handle:");
        if (tiktok_handle) {
            document.getElementById("tik-tok").textContent = tiktok_handle;
            profileData.socials[1].handle = tiktok_handle;
            localStorage.setItem("profileData", JSON.stringify(profileData));
        }
    });

    document.getElementById("github-edit").addEventListener("click", () => {
        const github_handle = prompt("GitHub handle:");
        if (github_handle) {
            document.getElementById("github").textContent = github_handle;
            profileData.socials[2].handle = github_handle;
            localStorage.setItem("profileData", JSON.stringify(profileData));
        }
    });
   

    document.getElementById("education").innerHTML = profileData.educationHistory
        .map(item => `<p><strong>${item.duration}</strong><br>${item.institution}</p>`)
        .join("");

    document.getElementById("skill-list").innerHTML = profileData.skills
        .map(skill => `<li>${skill}</li>`)
        .join("");

    document.getElementById("language-list").innerHTML = profileData.languages
        .map(lang => `<li>${lang}</li>`)
        .join("");

    document.getElementById("work-history").innerHTML = profileData.workHistory
        .map(job => `
            <p><strong>${job.role}</strong></p>
            <ul>${job.responsibilities.map(task => `<li>${task}</li>`).join("")}</ul>
        `)
        .join("");

    document.getElementById("certifications").innerHTML = profileData.certifications
        .map(cert => `<p><strong>${cert.title}</strong><br>${cert.detail}</p>`)
        .join("");

    document.getElementById("projects").innerHTML = profileData.projects
        .map(project => `<p><strong>${project.name}</strong><br>${project.description}</p>`)
        .join("");

    document.getElementById("reference").innerHTML = `<p>${profileData.reference}</p>`;

    // Add new skill
    document.getElementById("add-skill").addEventListener("click", () => {
        const skillInput = document.getElementById("skill-input");
        const skill = skillInput.value.trim();
        if (skill !== "") {
            const li = document.createElement("li");
            li.textContent = skill;
            document.getElementById("skill-list").appendChild(li);
            skillInput.value = "";
        }
    });

    // Add new language
    document.getElementById("add-language").addEventListener("click", () => {
        const langInput = document.getElementById("language-input");
        const lang = langInput.value.trim();
        if (lang !== "") {
            const li = document.createElement("li");
            li.textContent = lang;
            document.getElementById("language-list").appendChild(li);
            langInput.value = "";
        }
    });

    // Accordion toggle
    document.querySelectorAll(".accordion-btn").forEach(button => {
        button.addEventListener("click", () => {
            const panel = button.nextElementSibling;
            panel.classList.toggle("active");
            panel.style.display = panel.style.display === "block" ? "none" : "block";
        });
    });
    })
}