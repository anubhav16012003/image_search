const accessKey = "jJA9IIvB-KbY9pMIXgojl-ZNl4mjaYqn_KDimd5RgSQ";

const title = document.querySelector('#title');
const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const searchResults = document.querySelector('.search-results');
const showMore = document.querySelector('#show-more-button');

let page=1;
let userInput = "";

title.addEventListener('click', (e) => {
    e.preventDefault();
    resetPage();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchImages();
});

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("butoon clicked");
    searchImages();
    page=1;
});

showMore.addEventListener('click', () => {
    searchImages();
});

function resetPage() {
    searchInput.value = "";
    searchResults.innerHTML = "";
    addDefaultImage();
};

function addDefaultImage() {
    for(let i=0; i<3; i++){
        const defaultImageWrapper = document.createElement('div');
        defaultImageWrapper.classList.add('search-result');
        const defaultImageLink = document.createElement('a');
        defaultImageLink.href = "https://unsplash.com/photos/a-woman-standing-on-a-balcony-holding-a-skateboard-gs3rJQUa86k";
        defaultImageLink.target = "_blank";
        const defaultImage = document.createElement('img');
        defaultImage.src = "https://images.unsplash.com/photo-1704165873660-884ac0494138?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8";
        defaultImage.alt = "A Girl With Jar";
        const defaultTextBelowImage = document.createElement('p');
        defaultTextBelowImage.textContent = "A Girl With Jar";

        searchResults.appendChild(defaultImageWrapper);
        defaultImageWrapper.appendChild(defaultImageLink);
        defaultImageLink.appendChild(defaultImage);
        defaultImageLink.appendChild(defaultTextBelowImage);
    }
    showMore.style.display = "none";
};

async function searchImages() {
    userInput = searchInput.value.toLowerCase();
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${userInput}&client_id=${accessKey}`;

    const response = await fetch (url);
    const data = await response.json();
    const results = data.results;

    if(page === 1){
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const textBelowImage = document.createElement('p');
        textBelowImage.textContent = userInput === "" ? "Default text" : result.alt_description;

        searchResults.appendChild(imageWrapper);
        imageWrapper.appendChild(imageLink);
        imageLink.appendChild(image);
        imageLink.appendChild(textBelowImage);
    });

    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
};