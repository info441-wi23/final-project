async function init() {
    const queryParams = new URLSearchParams(window.location.search);
    const spotID = queryParams.get("spotID");
    const currentReviews = await fetchJSON(`/reviews?spotID=${spotID}`);

    await loadHeading(spotID, currentReviews)
    await loadContent(currentReviews)
    await loadIdentity()
}

function hideForm() {
    var x = document.getElementById("handle-spot");
    if (x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


async function loadHeading(spotID, currentReviews) {
    const locationDetails = await fetchJSON(`/reviews/getOne?id=${spotID}`)

    console.log(locationDetails)

    let heading = document.getElementById('heading')
    heading.innerHTML = `
        <div class="title-text">
            <button class="add-button" onclick="onClick()">Back</button>
            <p style="padding: 20px 0px">Study Spot Page</p>
            <hr></hr>
            <div style="display: flex; flex-direction: row; width: 100%;">
                <div style="display: flex; flex-direction: column; flex: 1;">
                    <p>Location Name: ${locationDetails.name}</p>
                    <p>Average Rating: ${average(locationDetails.initialRating, currentReviews)} </p>
                    <p>Initial Rating: ${locationDetails.initialRating}</p>
                </div>
                <div style="display: flex; flex-direction: column; flex: 1;">
                    <p>${locationDetails.author}'s review: ${locationDetails.reviewText}</p>
                </div>
            </div>
        </div>
    `
}

async function loadContent(currentReviews) {
    let content = document.getElementById('content')

    let reviewsHTML = currentReviews.map((entry, index) => {
        console.log(entry)
        return `
        <div class="review-container" key=${index}>
            <div class="row" style="textAlign: left;">
                <div class="column" style="padding: 10px 20px;">
                    <p><strong>Author:</strong> ${entry.author}</p>
                    <p><strong>Rating:</strong> ${entry.rating}/5</p>
                    <p><strong>Date Created:</strong> ${(new Date(entry.dateCreated)).toLocaleDateString()}</p>
                    <div><strong>Review:</strong> ${entry.reviewText}</div>
                </div>
                <div class="column">
                    
                </div>
            </div>
        </div>
        `
    }).join('\n')

    if (reviewsHTML.length === 0) {
        reviewsHTML = `
        <div style="width: 100%; text-align: center">
            No reviews yet!
        </div>
        `
    }

    content.innerHTML = reviewsHTML
}

async function submitForm() {
    const queryParams = new URLSearchParams(window.location.search);
    const spotID = queryParams.get("spotID");

    let name = document.getElementById("name").value;
    let review = document.getElementById("review").value;
    let rating = document.getElementById("rating").value;

    try {
        await fetchJSON(`/reviews`, {
            method: 'POST',
            body: {
                name: name,
                reviewText: review,
                spotID: spotID,
                rating: rating,
                dateCreated: new Date()
            }
        })
    } catch (error) {
        alert('An error has occured, make sure you are logged in')
        document.getElementById("name").value = ''
        document.getElementById("review").value = ''
        document.getElementById("rating").value = ''
    }

    document.getElementById("name").value = ''
    document.getElementById("review").value = ''
    document.getElementById("rating").value = ''

    hideForm()

    init()
}

function onClick() {
    window.location = '/'
}
