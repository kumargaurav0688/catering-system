auth.onAuthStateChanged((user) => {
    if (user) {
        const profileInfo = document.getElementById("profileInfo");
        profileInfo.innerHTML = `
            <p>Email: ${user.email}</p>
            <button onclick="logout()">Logout</button>
        `;
    } else {
        window.location.href = "login.html";
    }
});

function logout() {
    auth.signOut().then(() => {
        alert("Logged out");
        window.location.href = "login.html";
    });
}
