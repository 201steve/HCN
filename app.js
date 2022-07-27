const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

const getData = (url) => {
  ajax.open("GET", url, false);
  ajax.send();
  return JSON.parse(ajax.response);
};

const newsFeeds = getData(NEWS_URL);
const ul = document.createElement("ul");

window.addEventListener("hashchange", () => {
  const id = location.hash.substring(1);

  const newsContents = getData(CONTENT_URL.replace("@id", id));

  const title = document.createElement("h1");
  title.innerHTML = newsContents.title;
  content.appendChild(title);
});

for (let i = 0; i < 10; i++) {
  const div = document.createElement("div");
  const li = document.createElement("li");
  const a = document.createElement("a");

  div.innerHTML = `
  <li>
    <a href="#${newsFeeds[i].id}">
      ${newsFeeds[i].title} (${newsFeeds[i].comments_count})
    </a>
  </li>
  `;

  ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
container.appendChild(content);
