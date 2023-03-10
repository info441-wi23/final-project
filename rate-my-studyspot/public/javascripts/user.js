const { response } = require('express');
const express = require('express')

async function init(){
    await loadIdentity();
    let userInfo = await fetchJSON(`/user`)
    console.log(userInfo)
}

async function saveUserInfo(){
    let newUserInfoInput = document.getElementById("userInfoInput").value;

    let userInfo = await fetchJSON(`/user/userInfo`)

    loadUserInfo();

}

async function loadUserInfo(){
    let identityInfo = await fetchJSON(`/user/myIdentity`)
        
    if(identityInfo.status == "loggedin"){
        document.getElementById("username-span").innerText= `You (${identityInfo.status})`;
        document.getElementById("user_info_new_div").classList.remove("d-none");
        
    }else{
        document.getElementById("username-span").innerText=username;
        document.getElementById("user_info_new_div").classList.add("d-none");
    }

    let responseJson = await fetchJSON(`/user/userInfo`)

    document.getElementById("user_info_div").innerHTML = "Bookmarked Spots: " + responseJson.bookmarks;

    // for each bookmark map
}