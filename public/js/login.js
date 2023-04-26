const handleLoginForm = async (e) => {
  e.preventDefault();
  const userEmail = document.querySelector("#email-login").value.trim();
  const userPassword = document.querySelector("#password-login").value.trim();

  if (userEmail && userPassword) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email: userEmail, password: userPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/")
    } else {
      alert("Failed to log in.")
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", handleLoginForm);
