const handleSignupForm = async (e) => {
  e.preventDefault()
  const enteredUsername = document
    .querySelector("#username-signup")
    .value.trim()
  const enteredEmail = document.querySelector("#email-signup").value.trim()
  const enteredPassword = document
    .querySelector("#password-signup")
    .value.trim()

  if (enteredUsername && enteredEmail && enteredPassword) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
      document.location.replace("/")
    } else {
      alert("Failed to sign up.")
    }
  }
}

document
  .querySelector(".signup-form")
  .addEventListener("submit", handleSignupForm)
