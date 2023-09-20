
const darkmodeContainerBtnEl = document.getElementById('darkmode-container-btn');
const darkLightModeTextEl = document.getElementById('dark-light-mode-text');
const sunIconEl = document.getElementById('sun-icon');
const moonIconEl = document.getElementById('moon-icon');

//theme variables
const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches;

//icon toggling
const iconToggle = () =>{
    sunIconEl.classList.toggle('hidden');
    moonIconEl.classList.toggle('hidden');
}

//Initial theme check
const themeCheck = () =>{
    if(userTheme === "dark" || (!userTheme && systemTheme)){
        document.documentElement.classList.add('dark');
        moonIconEl.classList.add('hidden'); 
        darkLightModeTextEl.innerHTML = "Light Mode"; 
        sunIconEl.classList.remove('hidden');
        return
    } 

    sunIconEl.classList.add('hidden');
    moonIconEl.classList.remove('hidden'); 
    darkLightModeTextEl.innerHTML = "Dark Mode"; 
    
}

//manual theme switch
const themeSwitch = () => {
    if(document.documentElement.classList.contains('dark')){
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme','light');
        darkLightModeTextEl.innerHTML = "Dark Mode"; 
        iconToggle();
        return;
    } 

    darkLightModeTextEl.innerHTML = "Light Mode";
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme','dark');
    iconToggle();
}

//call theme switch on clicking buttons
darkmodeContainerBtnEl.addEventListener('click',() => {
    themeSwitch();
});


//invoke theme check  on initial load
themeCheck();




//get all the countries from a local file
const countries = async () =>{

    try {
        const response = await fetch('https://restcountries.com/v3.1/all ');
        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            console.log(response.status)
        }
    } catch (error) {
        console.log(error)
    }

}