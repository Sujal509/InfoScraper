const aboutContentText = document.getElementById("aboutContent");
const contactContentText = document.getElementById("contactContent");
const fetchButton = document.getElementById("fetch-button");
const myCheck = document.getElementById('myCheck');
const urlInput = document.getElementById('urlInput');

fetchButton.addEventListener("click", fetchData);
urlInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        fetchData();
    }
});

async function fetchData() {
    const url = urlInput.value;
    const re = new RegExp("^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}");
    if (!re.test(url)) {
        return alert("Please enter a valid url");
    }
    let liveCrawl = (myCheck.checked) ? true : false;

    aboutContentText.innerHTML = "<b>Please wait...</b>";
    contactContentText.innerHTML = "<b>Please wait...</b>";

    try {
        let response = await fetch(`/module2/geturl?url=${url}&state=${liveCrawl}`);
        if (response.status == 400) {
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
}