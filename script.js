let fetchedItems = [];
let fetchedItemsLength = 45;

async function getPosts() {
  const list = document.getElementById('posts');
  const { data: posts } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
  posts.splice(fetchedItemsLength + 10);
  posts.forEach(post => {
    const getMeta = async () => {
      const { data: postMeta } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${post}.json`);
      const li = document.createElement('li');
      li.innerHTML = `<a href="${postMeta.url}">
        ${postMeta.title} (${postMeta.url.replace(/^(https?:\/\/[^\/]+).*$/, '$1')})</a>
        <br>
        <a href="https://news.ycombinator.com/item?id=${postMeta.id}">
          <h5>by ${postMeta.by} | ${postMeta.kids.length} comments</h5>
        </a></br>`;
      list.appendChild(li);
    }
    if(!fetchedItems.includes(post)) {
      getMeta();
      fetchedItems.push(post);
      fetchedItemsLength++;
    }
  });
}

document.addEventListener('DOMContentLoaded', getPosts);

window.onscroll = () => {
  if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    getPosts();
  }
};
