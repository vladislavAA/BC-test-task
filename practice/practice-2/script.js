function fetchPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      displayPosts(data);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });
}
