let Timeout;
let DataArray = [];



// Call Data From Json Using FETCH API
async function DataFromdatabase() {
    try {
        let Data = await fetch(`http://127.0.0.1:5500/data.json`)
        let response = await Data.json();
        DataArray.push(response)
    } catch (error) {
        console.log(error)
    }


}


// HTML CARD RENDER 
function HTML_Render(e) {
    return (
        `
        <div class="col-md-4 ">
        <div class="mb-3 border p-2 rounded">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title display-5">${e.Name}</h5>
                    <p class="card-text">${e.Fname}</p>
                    <p class="card-text">${e.age}</p>
                    <p class="card-text">${e.email}</p>
                    <p class="card-text">${e.location}</p>
                </div>
            </div>
        </div>
    </div>
        `
    )
}

//* Display Array Data
async function DisplayData(data) {
    let html = '';
    await DataFromdatabase() // Call Async Function

    // If data is an array and you want to process the first element
    if (Array.isArray(data[0])) {
        data = data[0]; // Assign the first element if it's an array
    }

    // Now, data could be either an array or an object
    if (Array.isArray(data)) {
        // If it's still an array, iterate over it
        data.forEach(e => {
            html += HTML_Render(e) // call a HTML CARD FUNCTION
        });

    }
    else if (typeof data === "object") {
        // If it's an object (not an array), handle it accordingly
        html += HTML_Render(e) //call a HTML CARD FUNCTION

    }

    // Update the inner HTML of the Database_Data container
    document.querySelector(".Database_Data").innerHTML = html;




}




//* Spinner Loader
function Spinner() {
    document.querySelector(".Database_Data").innerHTML =
        `
     <div class="spinner-grow text-light" role="status">
     <span class="visually-hidden">Loading...</span>
     </div>     
    `
}


//* Find Data Usign Keyup
document.querySelector(".SearchBar").addEventListener("keyup", (e) => {

    let FilteredData = DataArray[0].filter(elem => {
        return (
            elem.Fname.toLowerCase().includes(e.target.value) || elem.Name.toLowerCase().includes(e.target.value)
        )
    })


    Spinner(); // When Data Not Display Show Spinner
    //* Show Result After 1 Second
    Timeout = setTimeout(() => {
        if (Object.keys(FilteredData).length == 0) {
            document.querySelector(".Database_Data").innerHTML = "<h3 class='text-center text-light display-5'>No Data Found</h3>";
        } else {
            DisplayData(FilteredData)
        }
        console.log()

    }, 1000);

})



DisplayData(DataArray)