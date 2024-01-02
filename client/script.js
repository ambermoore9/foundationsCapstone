const optionsForm = document.getElementById("optionsForm");
const resultDiv = document.getElementById("result");
let stocks;
async function getData() {
    const selectedType = document.getElementById("types").value;
    const selectedPrice = document.getElementById("prices").value;
    let selectedCost;

    switch (selectedPrice) {
        case "0-50":
            selectedCost = 50;
            break;
        case "51-100":
            selectedCost = 100;
            break;
        case "101+":
            selectedCost = Infinity;
            break;
        default:
            selectedCost = Infinity; 
    }
    try {
        const response = await axios.get(`http://localhost:5005/stocks/${selectedType}/${selectedPrice}`);
        const data = response.data;

        const filteredData = data.filter(e => {
            const entryType = e.company_type.trim().toLowerCase();
            const entryCost = parseFloat(e.cost);

            let result;

            if (selectedCost === Infinity) {
                result = entryType === selectedType;
            } else {

                result = entryType === selectedType && entryCost <= selectedCost;
            }
            return result;
        });

        return filteredData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

async function mount(e) {
    if(e) e.preventDefault();
    stocks = await getData();

    let htmlString = "<ul class = 'larger-font'>";
    stocks.forEach(e => {
        let companyType = e.company_type
        let companyName = e.company_name
        let yield  = (parseFloat(e.yield) * 100).toFixed(2);
        let cost = e.cost

        htmlString += `<li>Company: ${companyName}, Yield: ${yield}%, Cost: $${cost}</li>`;
    });
    htmlString += "</ul>";

    if (resultDiv) {
        resultDiv.innerHTML = htmlString;
    }
    console.log(stocks); 
}

function displayData(result) {
    if (resultDiv) {
        resultDiv.innerHTML = "";
    }
}
optionsForm.addEventListener("submit", mount);