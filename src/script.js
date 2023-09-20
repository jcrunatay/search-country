//GLOBALSs
const region_dropdown = document.getElementById('region-dropdown');
const region_filter_btn = document.getElementById('region-filter-btn');
const card_container = document.getElementById('card-container');
const selected_region_text = document.getElementById('selected-region-text')
const searched_country_input = document.getElementById('searched-country-input');
const regionBtns = document.querySelectorAll('.region-btn');
const caret_down = document.querySelector('.caret-down');
const dark_light_mode_text = document.getElementById('dark-light-mode-text');



const regionFilteBtnHandler = () =>{
    region_dropdown.classList.toggle('hidden');
    caret_down.classList.toggle('-rotate-180');
}
region_filter_btn.addEventListener('click',regionFilteBtnHandler)


const renderCountryItem = (countryItems) =>{
    let card_container_content = "";
    countryItems.forEach(country => {
        card_container_content += `<div class="card overflow-hidden shadow-[0px_0px_10px_1px_rgba(0,0,0,0.20)] rounded-md max-w-xs cursor-pointer hover:scale-105 transition-[all_linear] duration-[0.3s] h-[370px]">
                                        <img class="h-3/6 w-[320px] pointer-events-none" src="${country['flags']['png']}" alt="${country['name']} flag image">
                                        <div class="px-4 py-8 dark:bg-darkBlue h-3/6 pointer-events-none">
                                            <p id="country-name" class="text-lg mb-5 font-extrabold">${country['name']['common']}</p>
                                            <p class="font-semibold">Population: <span class="font-light">${country['population']}</span></p>
                                            <p class="font-semibold">Region: <span class="font-light">${country['region']}</span></p>
                                            <p class="font-semibold">Capital: <span class="font-light">${country['capital']}</span></p>
                                        </div>
                                    </div>`;
    });

    card_container.innerHTML = card_container_content;
}


//display all countries
const displayAllCountries = async () => {

    const allCountries = await countries();
    renderCountryItem(allCountries);

}

document.addEventListener('DOMContentLoaded',displayAllCountries);

const regionBtnClickHandler = async (region) =>{
    //get all countries
    const allCountries = await countries();

    //get all countries according to region
    const countriesAccdgRegion = allCountries.filter(element => element['region'] === region);

    //change the text of select button
    selected_region_text.textContent = region;

    //check the clicked region
    if(region === "All"){ 
        displayAllCountries();
        return;
    }

    //render Cards
    renderCountryItem(countriesAccdgRegion);
}

regionBtns.forEach(regionBtn => {
    regionBtn.addEventListener('click',()=>{
        regionBtnClickHandler(regionBtn.textContent);
    })

});

const inputHandler = async (input) =>{

    //get all countries
    const allCountries = await countries();

    //get all countries according to region
    const countriesAccdgInput = allCountries.filter(element => element['name']['common'].toLowerCase().includes(input.toLowerCase()));

    //render Cards
    renderCountryItem(countriesAccdgInput);

}
searched_country_input.addEventListener('input', () => {
    inputHandler(searched_country_input.value);
});


const cardClickHandler = async (e) =>{

    //get all countries
    const allCountries = await countries();

    //get clicked element
    const clickedEl = e.target;

    //check if clicked element is a card(country)
    const isCountry = e.target.className.includes('card');

    //if not a country then end the fnction
    if(!isCountry) return;

    //declare a var and save the object here and send it to single page 
    let countryDetails = {};

    //name of the country that was clicked
    const clickedCountryName = clickedEl.querySelector('#country-name').textContent
    
    allCountries.forEach(country => {
        if(country["name"]['common'] === clickedCountryName){
            countryDetails = country;
        }
    });

    
    //save the item before changing
    localStorage.setItem('country', JSON.stringify(countryDetails));

    window.location.href = './country_single_page.html';
}

card_container.addEventListener('click',cardClickHandler);


