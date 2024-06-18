var aboutContentText = document.getElementById("aboutContent");
var contactContentText = document.getElementById("contactContent");

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

    aboutContentText.innerHTML = '';
    aboutContentText.innerHTML = '<h3>Please wait...</h3>';
    contactContentText.innerHTML = '';
    contactContentText.innerHTML = '<h3>Please wait...</h3>';

    fetch(`/module3/getdatapython?url=${encodeURIComponent(urlInput)}`)
        .then(response => response.json())
        .then(data => {
            console.log('res --> ' + data);
            if (data.aboutLinks.length === 0) {
                aboutContentText.innerHTML = "<b>No data found</b>"
            } else {
                aboutContentText.innerHTML = "";
                data.aboutLinks.forEach(element => {
                    aboutContentText.innerHTML += `<li><a href="${element}" rel="noopener noreferrer" target="_blank">${element}</a>`;
                });
            }

            if (data.contactLinks.length === 0) {
                contactContentText.innerHTML = "<b>No data found</b>"
            } else {
                contactContentText.innerHTML = "";
                data.contactLinks.forEach(element => {
                    contactContentText.innerHTML += `<li><a href="${element}" rel="noopener noreferrer" target="_blank">${element}</a>`;
                });
            }
        }).catch(error => {

            console.error('Error \n' + error);
            aboutContentText.innerHTML = 'Something went wrong';
            contactContentText.innerHTML = 'Something went wrong';
        });
};