let myIdentity = undefined;

async function loadIdentity(){
    let identity_div = document.getElementById("identity_div");
    try{
        let identityInfo = await fetchJSON(`/user/myIdentity`)
        if(identityInfo.status == "loggedin"){
            myIdentity = identityInfo.userInfo.username;
            identity_div.innerHTML = `
            <a href="/userInfo.html?user=${encodeURIComponent(identityInfo.userInfo.username)}">${escapeHTML(identityInfo.userInfo.username)}</a>
            <a href="signout" class="btn btn-danger" role="button">Log out</a>`;
        } else { //logged out
            myIdentity = undefined;
            identity_div.innerHTML = `
            <a href="signin" class="btn btn-primary" role="button">Log in</a>`;
        }
    } catch(error){
        myIdentity = undefined;
        identity_div.innerHTML = `<div>
        <button onclick="loadIdentity()">retry</button>
        Error loading identity: <span id="identity_error_span"></span>
        </div>`;
    }
}
