document.addEventListener("DOMContentLoaded", fetchPosts);

const table = document.getElementById("postsTable");
const span = document.getElementById("span-no-found");
const searchInput = document.getElementById("searchInput");

let postsData = [];
let filteredPosts = [];
let currentSortKey = "id";
let isAscending = true;

function fetchPosts() {
  const loader = document.getElementById("loader");
  loader.style.display = "";
  table.style.display = "none";
  span.style.display = "none";
  searchInput.style.display = "none";

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      postsData = data;
      postsData.sort((a, b) => a.id - b.id);
      filteredPosts = postsData;
      displayPosts(filteredPosts);
      addSortListeners();
      addSearchListener();
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      loader.style.display = "none";
      searchInput.style.display = "";
    });
}

function displayPosts(posts) {
  const container = document.getElementById("postsContainer");

  container.innerHTML = "";

  if (posts.length === 0) {
    span.style.display = "";
    table.style.display = "none";
    return;
  }

  span.style.display = "none";
  table.style.display = "";

  posts.forEach((post) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="table-section__td table-section__td_id">${post.id}</td>
        <td class="table-section__td table-section__td_title">${post.title}</td>
        <td class="table-section__td table-section__td_body">${post.body}</td>
      `;
    container.appendChild(row);
  });
}

function addSortListeners() {
  const headers = document.querySelectorAll("th[data-sort]");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const sortKey = header.getAttribute("data-sort");
      if (currentSortKey === sortKey) {
        isAscending = !isAscending;
      } else {
        isAscending = true;
      }
      currentSortKey = sortKey;

      sortAndDisplay(filteredPosts);
    });
  });
}

function addSearchListener() {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query.length < 3) {
      filteredPosts = [...postsData];
      sortAndDisplay(filteredPosts);
      return;
    }

    filteredPosts = postsData.filter((post) => {
      return (
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query)
      );
    });

    sortAndDisplay(filteredPosts);
  });
}

function sortAndDisplay(posts) {
  const sortedPosts = [...posts].sort((a, b) => {
    if (a[currentSortKey] < b[currentSortKey]) return isAscending ? -1 : 1;
    if (a[currentSortKey] > b[currentSortKey]) return isAscending ? 1 : -1;
    return 0;
  });
  displayPosts(sortedPosts);
}
