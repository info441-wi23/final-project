async function fetchJSON(route, options) {
    let response
    try {
        response = await fetch(route, {
            method: options && options.method ? options.method : "GET",
            body: options && options.body ? JSON.stringify(options.body) : undefined,
            headers: options && options.body ? { 'Content-Type': 'application/json' } : undefined
        })
    } catch (error) {
        displayError()
        throw new Error(
            `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
             No response from server (failed to fetch)`)
    }
    let responseJson;
    try {
        responseJson = await response.json();
    } catch (error) {
        let responseText = await response.text();
        console.log(responseText)
        displayError()
        throw new Error(
            `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
            Status: ${response.status}
            Response wasn't json: ${responseText ? JSON.stringify(responseText) : responseText}`)
    }
    if (response.status < 200 || response.status >= 300 || responseJson.status == "error") {
        displayError()
        throw new Error(
            `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
            Status: ${response.status}
            Response: ${responseJson ? JSON.stringify(responseJson) : responseJson}`)
    }
    return responseJson
}

const escapeHTML = str => !str ? str : str.replace(/[&<>'"]/g,
    tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag]));



function average(initialRating, currentReviews) {
    const ratingSum = currentReviews.reduce((sum, review) => sum + review.rating, 0)
    const totalRatings = currentReviews.length
    const averageRating = ratingSum / totalRatings

    if (Number.isInteger(averageRating)) {
        return Math.round(averageRating);
    } else {
        return averageRating.toFixed(2);
    }
}

