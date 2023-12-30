// var selectedType = document.getElementById("types").value;
// var selectedPrice = document.getElementById("prices").value;
// let stocks = getData();
// async function getData() {
//     return new Promise((resolve) => {
//         axios.get("http://localhost:5005/stocks").then(res => {
//             stocks = res.data 
//             resolve();
//         })
//     })
// }
// async function mount() {
//     await getData()
// }
// mount();
//     //displayData([selectedType][selectedPrice]);

// function displayData(result) {
//     var resultDiv = document.getElementById("result");
//     resultDiv.innerHTML = result;
// }
// console.log(stocks);

const optionsForm = document.getElementById("optionsForm");
let stocks;
async function getData() {
    const selectedType = document.getElementById("types").value;
    const selectedPrice = document.getElementById("prices").value;
    try {
        const response = await axios.get(`http://localhost:5005/stocks/${selectedType}/${selectedPrice}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

async function mount(e) {
    if(e) e.preventDefault();
    stocks = await getData();
    console.log(stocks); // Move the console.log here to ensure it runs after data is fetched.
    displayData(stocks);
}

function displayData(result) {
    var resultDiv = document.getElementById("result");
    result.forEach(e => {
        let companyType = e.company_type
        let companyName = e.company_name
        let yield  = +e.yield * 100
        let cost = e.cost
    })
    //resultDiv.innerHTML = result;
}

mount();
optionsForm.addEventListener("submit", mount);