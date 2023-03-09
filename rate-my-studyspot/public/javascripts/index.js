function handleAddLocation() {
    let callToAction = document.getElementById("add-card");
    callToAction.appendChild(
        
    );
    console.log(callToAction)
}

function hideForm() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
async function init(){
    loadPosts();
}

async function fetchJSON(route, options){
    let response
    try{
        response = await fetch(route, {
            method: options && options.method ? options.method : "GET",
            body: options && options.body ? JSON.stringify(options.body) : undefined,
            headers: options && options.body ? {'Content-Type': 'application/json'}: undefined
        })
    }catch(error){
        displayError()
        throw new Error(
            `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
             No response from server (failed to fetch)`)
    }
    let responseJson;
    try{
        responseJson = await response.json();
    }catch(error){
        let responseText = await response.text();
        displayError()
        throw new Error(
            `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
            Status: ${response.status}
            Response wasn't json: ${responseText ? JSON.stringify(responseText) : responseText}`)
    }
    if(response.status < 200 || response.status >= 300 || responseJson.status == "error"){
        displayError()
        throw new Error(
            `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
            Status: ${response.status}
            Response: ${responseJson ? JSON.stringify(responseJson) : responseJson}`)
    }
    return responseJson
}
async function loadPosts(){
    document.getElementById("posts_box").innerText = "Loading...";
    let spotsJson = await fetchJSON(`/studyspots`)
    
    let postsHtml = spotsJson.map(spotsInfo => {
        return `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src='https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png' 
        alt='study spot location placeholder'>
        <div class="card-body">
        <p class="card-title">${spotsInfo.name}</p>
        </div>
    </div>`
    }).join("\n");
    document.getElementById("posts_box").innerHTML = postsHtml;
}