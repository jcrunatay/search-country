//Globalss
const flag_container = document.getElementById('flag-container');
const country_details_container = document.getElementById('country-details-container');


const displayCountryDetails = async () =>{

    const storageItem = localStorage.getItem('country');
    const country = JSON.parse(storageItem);

    //get all countries
    const allCountries = await countries();

    //change flag image
    flag_container.innerHTML = `<img src="${country['flags']['png']}" class="w-screen max-w-lg shadow-[0px_0px_10px_1px_rgba(0,0,0,0.30)] rounded-sm" alt="${country['name']}">    `

    //edit the text for languages (for multiple language)
    const languages = Object.values(country['languages']);

    //get currencies
    let currencies = ""; /* country['currencies'] ? country['currencies'][0]['name'] : "" */
    
    if(country['currencies']){
        const keyArrs = Object.keys(country['currencies']);
        currencies = country['currencies'][keyArrs]['name'];
    }

    //get native name
    let nativeName = [];
    if(country['name']['nativeName']){
        const keyArrs = Object.keys(country['name']['nativeName']);
        for (let j = 0; j < keyArrs.length; j++) {
            nativeName.push(country['name']['nativeName'][keyArrs[j]]['common'])
        }
    }


    //edit borders
    let borders = '';
    if (country['borders']){
        for (let i = 0; i < country['borders'].length; i++) {
            allCountries.forEach( singleCountry => {
                if(singleCountry['cca3'] === country['borders'][i]){
                    borders += `<button class="country-border outline-none border-0 bg-transparent dark:bg-darkBlue font-semibold shadow-[0px_0px_10px_1px_rgba(0,0,0,0.20)] py-1 rounded-sm px-[10px] me-2 mb-2">${singleCountry['name']['common']}</button> `
                }
            });
        }
    }else{
        borders += `<a href="#" class="dark:bg-darkBlue font-semibold shadow-[0px_0px_10px_1px_rgba(0,0,0,0.20)] py-1 rounded-sm px-[10px] me-2 mb-2">No Border</a> `
    }

    


    //update country details
    country_details_container.innerHTML = 
        `<p class="text-2xl mb-5 mt-10 lg:mt-0 font-extrabold">${country['name']['common']}</p>
        <div class="flex flex-col sm:flex-row">
            <div class="sm:max-content sm:me-10 lg:me-0 lg:w-1/2">
                <p class="font-semibold mb-2">Native Name: <span class="font-light">${nativeName}</span></p>
                <p class="font-semibold mb-2">Population: <span class="font-light">${new Intl.NumberFormat().format(country['population'])}</span></p>
                <p class="font-semibold mb-2">Region: <span class="font-light">${country['region']}</span></p>
                <p class="font-semibold mb-2">Sub Region: <span class="font-light">${country['subregion']}</span></p>
                <p class="font-semibold mb-2">Capital: <span class="font-light">${country['capital'] ?? ""}</span></p>
            </div>
            <div class="mt-5 sm:mt-0 sm:max-content lg:w-1/2">
                <p class="font-semibold mb-2">Top Level Domain: <span class="font-light">${country['tld'].join("")}</span></p>
                <p class="font-semibold mb-2">Currencies: <span class="font-light"></span>${currencies}</p>
                <p class="font-semibold mb-2">Languages: <span class="font-light">${languages}</span></p>
            </div>
        </div>
        <!-- Borders -->
        <div class="mt-5 flex flex-col lg:flex-row">
            <div class="lg:w-max whitespace-nowrap">
                <p class="font-semibold text-lg mb-2 lg:me-5 ">Border Countries:</p>
            </div>
            <div class="flex flex-wrap text-xs lg:text-sm ">${borders}</div>
        </div>`

}

document.addEventListener('DOMContentLoaded',displayCountryDetails);


//make an action when user exit page
/* window.addEventListener('beforeunload',() =>{
    localStorage.removeItem("country");
}); */


const borderClickedHandler = async (e) => {



    //get clicked EL
    const clickEl = e.target;

    //check if a border country is clicked
    const isBorderCountry = clickEl.className.includes('country-border');

    if(!isBorderCountry) return;

    //get all countries
    const allCountries = await countries();

    //get the country that was clicked and save in a variable
    let clickedBorderCountry = allCountries.filter((singleCountry) => clickEl.textContent === singleCountry['name']['common']);

    //save the item before changing
    localStorage.setItem('country', JSON.stringify(clickedBorderCountry[0]));

    displayCountryDetails();

}

country_details_container.addEventListener('click',borderClickedHandler);
