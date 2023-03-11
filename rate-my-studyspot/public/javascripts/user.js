const { response } = require('express');
const express = require('express')

async function init(){
    await loadIdentity();
    await loadUserInfo();
}

// loads user's bookmarked reviews
// needs testing
async function loadUserInfo(){
    const identityInfo = await fetchJSON(`/user/myIdentity`)
        
    if(identityInfo.status == "loggedin"){
        let info = await fetchJSON(`/user?username=${identityInfo.userInfo.username}`)
        let content = document.getElementById('content')
        let bookmarks = document.getElementById('bookmarks')
        console.log(info)
        let bookmarksHTML = info[1].map((entry, index) => {
            return `     
            <div class="card" style="width: 18rem;">
                <img 
                class="card-img-top" src=${entry.image? entry.image : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'} 
                alt='studyspot'
                >
                    <h5 class="card-title">${entry.name}</h5>
                </div>
            </div>`
        }).join('\n')

        let reviewsHTML = info[0].map((entry, index) => {
            return `
            <div class="review-container" key=${index}>
            <div class="row" style="textAlign: left;">
                <div class="column" style="padding: 10px 20px;">
                    <p><strong>Author:</strong> ${entry.author}</p>
                    <p><strong>Rating:</strong> ${entry.rating}/5</p>
                    <p><strong>Date Created:</strong> ${(new Date(entry.dateCreated)).toLocaleDateString()}</p>
                    <div><strong>Review:</strong> ${entry.reviewText}</div>
                    <button type="button"  onclick="onClick('${entry.id}')"class="btn btn-danger">Delete</button>
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
        bookmarks.innerHTML = bookmarksHTML


    } else{
        
        let content = document.getElementById('content')
        let bookmarks = document.getElementById('bookmarks')
        content.innerHTML = "Must be logged in to view"
        bookmarks.innerHTML = "Must be logged in to view"
    }
    
}

async function onClick(reviewId) {
    console.log(reviewId)
    await fetchJSON('/reviews', {
        method: 'DELETE',
        body: {
          reviewId: reviewId
        }
      })
      setTimeout(() => {
        location.reload()
      }, 1000)

}

