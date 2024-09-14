const mode = document.querySelector(".mode");
const body = document.querySelector("body");
const dark = document.querySelector(".fa-regular");
const cards = document.querySelector(".cards");
const loader = document.querySelector(".loader");
const input = document.querySelector("input");
const select = document.querySelector("select");


const apiLink = "https://restcountries.com/v3.1/all";

const getData = async (link) => {
    loader.classList.add("active")
    const req = await fetch(link);
    const data = await req.json();
    writeData(data)
    loader.classList.remove("active")
};
getData(apiLink);


const writeData = (data)=>{
    data.forEach((item) => {
       cards.innerHTML += `
       <div class="card">
                              <img src="${item.flags.png}" alt="">
                              <div class="card_content">
                                   <h3>${item.name.common}</h3>
                                   <p><b>Population:</b> ${item.population}</p>
                                   <p><b>Region:</b> <span class="region">${item.region}</span></p>
                                   <p><b>Capital:</b> ${item.capital}</p>
                              </div>
                         </div> 
       `
        
    });
}

input.addEventListener("input", () => {
    const countries = document.querySelectorAll(".card");
    
    countries.forEach((item) => {
        if (!item.querySelector("h3").textContent.toLocaleLowerCase().includes(input.value.toLocaleLowerCase())) {
            item.classList.add("hidden")
        }else{
            item.classList.remove("hidden")
        }
    })
    
    
})



// dark mode
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark");
    dark.classList.remove("fa-moon");
    dark.classList.add("fa-sun");
}
mode.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
        dark.classList.remove("fa-moon");
        dark.classList.add("fa-sun");
    } else {
        localStorage.setItem("darkMode", "disabled");
        dark.classList.remove("fa-sun");
        dark.classList.add("fa-moon");
    }
});


select.addEventListener("change", () => {
    const countries = document.querySelectorAll(".card");
    
    countries.forEach((item) => {
        if (select.value != "All") {
            if (!item.querySelector(".region").textContent.toLocaleLowerCase().includes(select.value.toLocaleLowerCase()))
                {
                    item.classList.add("hidden")
                }else{
                    item.classList.remove("hidden")
                }
        }else{
            item.classList.remove("hidden")
        }
    })
    
    
})
