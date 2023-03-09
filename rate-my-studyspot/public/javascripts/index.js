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
async function init() {
  await loadIdentity();
  loadPosts();
}


async function loadPosts() {
  document.getElementById("posts_box").innerText = "Loading...";
  let spotsJson = await fetchJSON(`/studyspots`)

  console.log(spotsJson)

  let postsHtml = spotsJson.map(spotsInfo => {
    return `
        <div class="card" style="width: 18rem;" onclick="onClick('${encodeURIComponent(JSON.stringify(spotsInfo))}')">
          <img 
            class="card-img-top" src='https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png' 
            alt='study spot location placeholder'
          >
        <div class="card-body">
          <h5 class="card-title">${spotsInfo.name}</h5>
          <p>Rating: ${spotsInfo.initialRating}/5</p>
        </div>
    </div>`
  }).join("\n");
  document.getElementById("posts_box").innerHTML = postsHtml;
}

function onClick(spotsInfo) {
  window.location = `/location/${JSON.parse(decodeURIComponent(spotsInfo))._id}`
}