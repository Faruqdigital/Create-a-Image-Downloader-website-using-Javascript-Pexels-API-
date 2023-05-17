const auth =
    'ci9ft5ZOQB7lYFAL4XZmv3iyBLAzwDD1Mv2Lv8K5iNUu94Rnb4EmXk7T'

const gallery = document.querySelector(".gallery")
const searchInput = document.querySelector(".search-input")
const form = document.querySelector(".search-form")
let searchValue;

function curatedPhoto() {
    fetch("https://api.pexels.com/v1/curated?per_page=20", {
        method: "GET",
        headers: {
            Accept: "Application/json",
            Authorization: auth
        }
    })
        .then(res => res.json())
        .then(data => displayPhoto(data))
}

curatedPhoto()

function displayPhoto(photos) {
    let allPhotos = photos.photos

    allPhotos.forEach(photo => {
        // console.log(photo);
        const gallerImage = document.createElement("div")
        gallerImage.classList.add("gallery-img")
        gallerImage.innerHTML = `
        
        <img src="${photo.src.large}" alt="">
        <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href="${photo.src.original}">Download</a>
        </div>

        `
        gallery.appendChild(gallerImage)
    });
}

function searchPhotos(query) {
    fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=5`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
        .then(res => res.json())
        .then(data => displaySearch(data))
}

// searchPhotos()

function displaySearch(query) {
    let allphotos = query.photos
    console.log(allphotos)

    allphotos.forEach(photo => {
        // console.log(photo);
        const gallerImage = document.createElement("div")
        gallerImage.classList.add("gallery-img")
        gallerImage.innerHTML = `
        
        <img src="${photo.src.large}" alt="">
        <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href="${photo.src.original}">Download</a>
        </div>

        `
        gallery.appendChild(gallerImage)
    });

}
searchInput.addEventListener("input", updateSearch)

function updateSearch(e) {
    searchValue = e.target.value
}

form.addEventListener("submit", (e) => {
    gallery.innerHTML = ""
    e.preventDefault()
    searchPhotos(searchValue)
    searchInput.value = ""
})


