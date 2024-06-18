var state = false;
var aboutContentText = document.getElementById("aboutContent");
var contactContentText = document.getElementById("contactContent");

function setState() {
    let checkBox = document.getElementById("myCheck");
    if (checkBox.checked) state = true;
    else {
        state = false;
    }
}

var input = document.getElementById("urlInput");
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        fetchData();
    }
});

async function fetchData() {
    const urlInput = document.getElementById("urlInput").value;

    // Validate the URL using a simple pattern
    const urlPattern = /^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    if (!urlPattern.test(urlInput)) {
        alert("Please enter a valid URL.");
        return;
    }

    aboutContentText.innerHTML = '<h3>Please wait...</h3>';
    contactContentText.innerHTML = '<h3>Please wait...</h3>';

    try {
        let response = await fetch(`/module1/getdata?url=${urlInput}&state=${state}`);
        if (response.status == 400) {
            console.log('Status 400');
            aboutContentText.innerHTML = "<b>the website may not exist or may not be responding</b>";
            return contactContentText.innerHTML = "<b>the website may not exist or may not be responding</b>";
            
        }

        const data = await response.json();
        if (data.aboutLinks.length === 0) {
            aboutContentText.innerHTML = "<b>No data found</b>";
        } else {
            aboutContentText.innerHTML = "";
            data.aboutLinks.forEach(element => {
                aboutContentText.innerHTML += `<li><a href="${element}" rel="noopener noreferrer" target="_blank">${element}</a>`;
            });
        }

        if (data.contactLinks.length === 0) {
            contactContentText.innerHTML = "<b>No data found</b>";
        } else {
            contactContentText.innerHTML = "";
            data.contactLinks.forEach(element => {
                contactContentText.innerHTML += `<li><a href="${element}" rel="noopener noreferrer" target="_blank">${element}</a>`;
            });
        }
    } catch (err) {
        console.error(err);
        aboutContentText.innerHTML = "<b>Something went wrong with the Server</b>";
        contactContentText.innerHTML = "<b>Something went wrong with the Server</b>";
    }
};