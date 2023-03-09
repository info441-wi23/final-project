function handleAddLocation() {
  let callToAction = document.getElementById("add-card");
  callToAction.appendChild(

  );
  console.log(callToAction)
}

function hideForm() {
  var x = document.getElementById("handle-spot");
  if (x.style.display == "none") {
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

  let postsHtml = (await Promise.all(spotsJson.map(async spotsInfo => {
    const ratings = await fetchJSON(`/reviews?spotID=${spotsInfo._id}`)

    return `
        <div class="card" style="width: 18rem;" onclick="onClick('${encodeURIComponent(JSON.stringify(spotsInfo))}')">
          <img 
            class="card-img-top" src='https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png' 
            alt='study spot location placeholder'
          >
        <div class="card-body">
        <h5 class="card-title">${spotsInfo.name}</h5>
        <p>Rating: ${average(spotsInfo.initialRating, ratings)} / 5</p>
        </div>
    </div>`
  }))).join("\n");

  document.getElementById("posts_box").innerHTML = postsHtml;
}

async function postUrl() {
  document.getElementById("postStatus").innerHTML = "sending data..."
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let review = document.getElementById("review").value;
  let rating = document.getElementById("rating").value;

  try {
    await fetchJSON(`/studyspots`, {
      method: "POST",
      body: { name: name, address: address, review: review, rating: rating }
    })
  } catch (error) {
    document.getElementById("postStatus").innerText = "Error"
    throw (error)
  }
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("review").innerHTML = "";
  document.getElementById("rating").innerHTML = "";
  document.getElementById("postStatus").innerHTML = "successfully uploaded"
  loadPosts();
}

function onClick(spotsInfo) {
  const location = `/studySpot.html?spotID=${JSON.parse(decodeURIComponent(spotsInfo))._id}`
  window.location = location
}