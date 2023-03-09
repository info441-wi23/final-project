async function init() {
    const queryParams = new URLSearchParams(window.location.search);
    const spotID = queryParams.get("spotID");
    const currentReviews = await fetchJSON(`/reviews?spotID=${spotID}`);

    console.log(currentReviews)

    await loadHeading(spotID, currentReviews)
    await loadContent(currentReviews)
    await loadIdentity()
}

async function loadHeading(spotID, currentReviews) {
    const locationDetails = await fetchJSON(`/reviews/getOne?id=${spotID}`)

    console.log(locationDetails)

    let heading = document.getElementById('heading')
    heading.innerHTML = `
        <div class="title-text">
            <button class="add-button" onclick="onClick()">Back</button>
            <p>Study Spot Page</p>
            <hr></hr>
            <p>Location Name: ${locationDetails.name}</p>
            <p>Average Rating: ${average(locationDetails.initialRating, currentReviews)} </p>
        </div>
    `
}

async function loadContent(currentReviews) {
    let content = document.getElementById('content')

    let reviewsHTML = currentReviews.map((entry, index) => {
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
                    <div class="image">
                        <img src="https://cdn.pixabay.com/photo/2021/03/10/06/32/campus-6083653_1280.jpg" />
                    </div>
                </div>
            </div>
        </div>
        `
    }).join('\n')

    content.innerHTML = reviewsHTML
}

function average(initialRating, currentReviews) {
    const ratingSum = currentReviews.reduce((sum, review) => sum + review.rating, 0)
    const totalRatings = currentReviews.length
    const averageRating = (ratingSum + initialRating) / (totalRatings + 1)

    return averageRating.toFixed(2);
}

function onClick() {
    window.location = '/'
}


