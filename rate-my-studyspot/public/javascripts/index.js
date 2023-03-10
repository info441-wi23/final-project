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
  const bookmarks = await getBookmark()
  loadPosts(bookmarks);
}

async function loadPosts(bookmarks) {
  document.getElementById("posts_box").innerText = "Loading...";
  let spotsJson = await fetchJSON(`/studyspots`)

  console.log(bookmarks)

  let postsHtml = (await Promise.all(spotsJson.map(async spotsInfo => {
    const ratings = await fetchJSON(`/reviews?spotID=${spotsInfo._id}`)
    console.log('spot info: ', spotsInfo._id)
    console.log('bookmark id: ', bookmarks)
    let icon;
    if (!bookmarks.includes('none')) {
      if (bookmarks.includes(spotsInfo._id)) {
        icon = `
          <i class="icon fa-solid fa-bookmark" 
          onclick="manageBookmark('${encodeURIComponent(JSON.stringify(spotsInfo._id))}')">
          </i>`
      } else {
        icon = `
          <i class="icon fa-regular fa-bookmark" 
          onclick="manageBookmark('${encodeURIComponent(JSON.stringify(spotsInfo._id))}')">
          </i>`
      }
    } else {
      icon = ''
    }

    return `
        <div class="card" style="width: 18rem;">
          <div style="display: flex; width: 100%; flex-direction: row; justify-content: flex-end; padding: 10px;">
            ${icon}
          </div>
          <img 
            class="card-img-top" src=${spotsInfo.image} 
            alt='study spot location placeholder'
          >
        <div class="card-body" onclick="onClick('${encodeURIComponent(JSON.stringify(spotsInfo))}')">
          <h5 class="card-title">${spotsInfo.name}</h5>
          <p>Rating: ${average(spotsInfo.initialRating, ratings)} / 5</p>
        </div>
    </div>`
  }))).join("\n");

  document.getElementById("posts_box").innerHTML = postsHtml;
}

async function getBookmark() {
  return await fetchJSON('/bookmark')
}

async function postUrl() {
  document.getElementById("postStatus").innerHTML = "sending data..."
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let image = document.getElementById("imgUrl").value;
  let review = document.getElementById("review").value;
  let rating = document.getElementById("rating").value;

  try {
    await fetchJSON(`/studyspots`, {
      method: "POST",
      body: {
        name: name,
        address: address,
        image: image,
        review: review,
        authorReview: review,
        rating: rating,
        initialRating: rating,
        dateCreated: new Date()
      }
    })
  } catch (error) {
    clearForm('You must be logged in to post')
    throw (error)
  }

  clearForm('successfully upload')

  alert('success!')

  hideForm()
  const bookmarks = await getBookmark()
  loadPosts(bookmarks);
}

async function manageBookmark(id) {
  const locationId = JSON.parse(decodeURIComponent(id))
  try {
    const bookmarkLength = (await getBookmark()).length
    if (bookmarkLength > 0) {
      await fetchJSON('/bookmark', {
        method: 'POST',
        body: {
          bookmark: locationId
        }
      })
    } else {
      await fetchJSON('/bookmark', {
        method: 'POST',
        body: {
          bookmark: locationId
        }
      })
    }
    setTimeout(() => {
      location.reload()
    }, 1000)
  } catch (error) {
    console.log(error)
  }
}

function onClick(spotsInfo) {
  const location = `/studySpot.html?spotID=${JSON.parse(decodeURIComponent(spotsInfo))._id}`
  window.location = location
}

function clearForm(postStatus) {
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("imgUrl").value = "";
  document.getElementById("review").value = "";
  document.getElementById('rating').value = 1;
  document.getElementById("postStatus").innerHTML = postStatus
}