document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = email.value;
    const password = password.value;
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        console.log("Registered Successfully");
    } catch (error) {
        console.error("Registration Error:", error.message);
    }
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = email.value;
  const password = password.value;
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log("Login successful");
    window.location.href = "products.html";
  } catch (error) {
    console.error("Login Error:", error.message);
  }
});
