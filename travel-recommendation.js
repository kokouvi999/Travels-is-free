let input_search = document.getElementById('input-search')
const btn_search = document.querySelector('.btn-search')
const btn_clear = document.querySelector('.btn-clear')

const search_responses = document.querySelector('.search-responses')
// async function searchAll(){

//     try {
//         const response = await fetch('travel-recommendation-api.json')
//         const data = response.json()
//         console.log(data)
//         // console.log(response.json())
//     } catch (error) {
//         console.error(error)
//     }
    
// }
// searchAll()

fetch('travel-recommendation-api.json')
.then(response => response.json())
.then(data =>{
    console.log(data)

    const countries = data.countries
    const beaches = data.beaches
    const temples = data.temples

    function responseData(data){
            const resultAll = document.createElement('div')
            resultAll.classList = "result-all"

            data.forEach(element => {
            
                const citiesAll = document.createElement("div")
                citiesAll.classList = 'cities-all'

                const title_image = document.createElement('h3')
                title_image.innerHTML = element.name
                title_image.classList = "title-response"

                const images_box = document.createElement('div')
                images_box.classList = "image-box"

                const images = document.createElement('img')
                images.classList = 'images-cities'

                const image_description = document.createElement('p')
                image_description.innerHTML = element.description

                images.src = element.imageUrl
                console.log(element.name)
            
                citiesAll.appendChild(title_image)
                images_box.appendChild(images)
                citiesAll.appendChild(images_box)
                citiesAll.appendChild(image_description)
                resultAll.appendChild(citiesAll)
        });
        search_responses.appendChild(resultAll)
    }

    responseData(beaches)
    responseData(temples)
    
    countries.forEach(element => {
        responseData(element.cities)
    });

    let response_image_all = document.querySelectorAll('.cities-all')
    btn_search.addEventListener('click', ()=>{

        // console.log(title_response)
        const search = input_search.value.toUpperCase()
        console.log(search)
        const response_all = Array.from(response_image_all).filter(element =>{
            return element.innerHTML.toUpperCase().includes(search)
        })
        console.log(response_all)
        response_image_all.forEach(element => {
            if (response_all.includes(element) && search.trim() != '') {
                element.style.display = 'block'
                console.log(element.innerHTML)
            } else {
                element.style.display = 'none'
                // console.log(element)
            }
        });
    })

    function clearSearchResult() {
        response_image_all.forEach(element => {
            element.style.display = 'none'
            input_search.value = ''
        });
    }
    btn_clear.addEventListener('click', clearSearchResult)
    
})

.catch(error =>{
    console.error("error :", error)
})

const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in New York:", newYorkTime);