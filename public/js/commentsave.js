const handleCommentForm = async (activity) => {
  activity.preventDefault();

  const commentText = document
    .querySelector('input[name="comment-body"]')
    .value.trim()
  const postId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ]

  if (commentText) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id: postId,
        comment_body: commentText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
      document.querySelector("#comment-form").style.display = "block"
    };
  };
};

const commentForm = document.querySelector(".comment-form");
commentForm.addEventListener("submit", handleCommentForm);
commentForm.style.display = "block"

document
  .querySelector(".comment-form")
  .addEventListener("submit", handleCommentForm);
