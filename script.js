// Enable dark mode toggle
document.getElementById("toggle-dark").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

// Load saved posts
window.addEventListener("load", () => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.forEach(post => renderPost(post));
});

// Add a new post
function addPost() {
  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();
  const imageFile = document.getElementById("image-upload").files[0];
  const imageUrl = document.getElementById("image-url").value.trim();
  const fileFile = document.getElementById("file-upload").files[0];
  const fileUrl = document.getElementById("file-url").value.trim();

  if (!title || !content) {
    alert("Title and content are required.");
    return;
  }

  const post = {
    id: Date.now(),
    title,
    content,
    imageSrc: "",
    fileLink: ""
  };

  // Handle image upload or URL
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function () {
      post.imageSrc = reader.result;
      finishPost(post);
    };
    reader.readAsDataURL(imageFile);
  } else if (imageUrl) {
    post.imageSrc = imageUrl;
    finishPost(post);
  } else {
    finishPost(post);
  }

  // Handle file upload or file URL
  if (fileFile) {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      const fileBlob = new Blob([fileReader.result], { type: fileFile.type
