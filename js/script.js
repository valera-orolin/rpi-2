document.addEventListener('DOMContentLoaded', function(event) {
    console.log('DOM fully loaded and parsed')
    date.value = localStorage.getItem('nasaDate')
    if (localStorage.getItem('nasaDate') == undefined) {
        sendApiRequestDOM()   
    } else {
        sendApiRequestButton()
    }
})

document.querySelector('#search').addEventListener('click', () => {
    console.log('button pressed')
    sendApiRequestButton(date.value)
})

document.querySelector('#date').addEventListener('change', () => {
    document.getElementById('date').style.border='transparent'
})

document.addEventListener('keydown', function(event) {
    if (event.code == 'Enter') {
        sendApiRequestButton(date.value)
    }
})

async function sendApiRequestButton() {
    let API_KEY = 'zc0DtfhAUvX74FbVHY1VHoMwOIKIQLdhWT9gb7aH';
    document.getElementById('spinner').style.visibility = 'visible'
    let response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date.value}&api_key=${API_KEY}`);
    if (response.status == 200) {
        let data = response.json()
        localStorage.setItem('nasaDate', date.value)
        useApiData(data)
    } else {
        document.getElementById('date').style.border = '.3vh solid #aa3a3a'
        document.getElementById('spinner').style.visibility = 'hidden'
    }
}

async function sendApiRequestDOM(){
    let API_KEY = 'zc0DtfhAUvX74FbVHY1VHoMwOIKIQLdhWT9gb7aH';
    document.getElementById('spinner').style.visibility = 'visible'
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
    if (response.status == 200) {
        let data = response.json()
        localStorage.setItem('nasaDate', date.value)
        useApiData(data)
    } else {
        document.getElementById('date').style.border = '.3vh solid #aa3a3a'
        document.getElementById('spinner').style.visibility = 'hidden'
    }
}

function useApiData(data){ 
    let text = document.getElementById('text')
    let date = document.getElementById('date')
    let title = document.getElementById('title')
    let pic = document.getElementById('picture')
    let vid = document.getElementById('vid')
    data.then(function(value){
        date.value = value.date;
        if (typeof title.innerText !== 'undefined') {
            title.innerText = value.title
        } else {
            title.textContent = value.title
        }
        if (typeof text.innerText !== 'undefined') {
            text.innerText = value.explanation;
        } else {
            text.textContent = value.explanation
        }
        console.log(value)
        if (value.media_type == 'image') {
            pic.src = value.url
            pic.style.display = 'inline'
            vid.style.display = 'none'
        } 
        if (value.media_type == 'video') {
            vid.src = value.url
            vid.style.display = 'inline'
            pic.style.display = 'none'
        }
    })
    data.finally(() => {
        document.getElementById('spinner').style.visibility = 'hidden'
    })
}


























