const { response } = require('express');
const express = require('express')

async function init(){
    await loadIdentity();
    loadUserInfo();
}

// loads user's bookmarked reviews
// needs testing
async function loadUserInfo(){
    const identityInfo = await fetchJSON(`/user/myIdentity`)
        
    if(identityInfo.status == "loggedin"){
        document.getElementById("username-span").innerText= `You: (${identityInfo.status})`;
        document.getElementById("user_info_new_div").classList.remove("d-none");
        
    } else{
        document.getElementById("username-span").innerText=username;
        document.getElementById("user_info_new_div").classList.add("d-none");
    }

    let info = await fetchJSON(`/bookmark`)

    let content = document.getElementById('content')

    let bookmarksHTML = info.map((entry, index) => {
        return `
        <div class="bookmarked-review-container" key=${index}>
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

    if (bookmarksHTML.length === 0) {
        bookmarksHTML = `
        <div style="width: 100%; text-align: center">
            You do not have any bookmarked reviews yet!
        </div>
        `
    }

    content.innerHTML = bookmarksHTML
}

