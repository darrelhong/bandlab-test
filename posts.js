// global posts variable
let posts = [];

const postsContainer = document.querySelector(".posts__container");

const fetchPosts = async () => {
  const postsResp = await fetch("https://jsonplaceholder.typicode.com/posts");
  posts = await postsResp.json();
};

(async () => {
  await fetchPosts();
  renderPosts(posts);
})();

const sortSelect = document.querySelector(".sort__select");
const groupSelect = document.querySelector(".group__select");

sortSelect.addEventListener("change", (e) => {
  groupSelect.value = "default";
  switch (e.target.value) {
    case "title":
      posts = posts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      posts = posts.sort((a, b) => a.id - b.id);
      break;
  }
  renderPosts(posts);
});

const renderPosts = (posts) => {
  postsContainer.innerHTML = "";
  for (let post of posts) {
    const postElement = document.createElement("li");
    postElement.classList.add("post");
    postElement.innerHTML = `
            <h3 class="post__title">${post.title}</h3>
            <p class="post__body">${post.body}</p>
            `;
    postsContainer.appendChild(postElement);
  }
};

// group posts by user
groupSelect.addEventListener("change", (e) => {
  sortSelect.value = "default";
  switch (e.target.value) {
    case "user-id":
      const groupedPosts = {};
      for (let post of posts) {
        if (!groupedPosts[post.userId]) {
          groupedPosts[post.userId] = [];
        }
        groupedPosts[post.userId].push(post);
      }
      break;
    default:
      break;
  }
  renderGroupedPosts(groupedPosts);
});

const groupByUser = () => {};

const renderGroupedPosts = (groupedPosts) => {
  postsContainer.innerHTML = "";
  for (let userId in groupedPosts) {
    const postGroupElement = document.createElement("li");
    postGroupElement.classList.add("post-group");
    postGroupElement.innerHTML = `
            <h4 class="post-group__title">User ${userId}</h3>
            <ol class="post-group__posts"></ol>
        `;
    const postGroupPostsContainer =
      postGroupElement.querySelector(".post-group__posts");
    for (let post of groupedPosts[userId]) {
      postGroupPostsContainer.innerHTML += `
            <li class="post-group__post">
            <h4 class="post-group__post-title">${post.title}</h4>
            <p class="post-group__post-body">${post.body}</p>
            </li>
        `;
    }
    postsContainer.appendChild(postGroupElement);
  }
};
