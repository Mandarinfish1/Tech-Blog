
function logout() {
  fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        document.location.replace("/")
      } else {
        alert("Failed to log out.")
      }
    })
    .catch((error) => {
      console.error(error)
      alert("An error occurred while trying to log out.")
    })
};

document.querySelector("#logout").addEventListener("click", logout);

