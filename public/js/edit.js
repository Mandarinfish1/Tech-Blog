//public/js/delete.js file
const handleDeleteForm = async (activity) => {
  activity.preventDefault();

  const urlSegments = window.location.toString().split("/")
  const postId = urlSegments[urlSegments.length - 1]

  const deleteResponse = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    body: JSON.stringify({
      post_id: postId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/api/dashboard/")
  } else {
    alert(response.statusText);
  }
}

const btnDelPost = document.querySelector(".btnDelPost");
btnDelPost.addactivityListener("click", handleDeleteForm);
