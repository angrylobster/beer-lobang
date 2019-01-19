window.onload = () => {
    if (document.cookie.includes('loggedIn=true')){
        let logoutButton = document.body.querySelector('#logout-button');
        logoutButton.addEventListener('click', () => {
            document.cookie.split(";").forEach(cookie => { document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            location.reload();
        })
    }
}