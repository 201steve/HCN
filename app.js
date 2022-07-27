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

const newsFeed = () => {
  const newsFeeds = getData(NEWS_URL);
  const newsList = [];
  newsList.push("<ul>");

  for (let i = 0; i < 10; i++) {
    newsList.push(`
  <li>
    <a href="#${newsFeeds[i].id}">
      ${newsFeeds[i].title} (${newsFeeds[i].comments_count})
    </a>
  </li>
  `);
  }
  newsList.push("</ul>");

  container.innerHTML = newsList.join("");
};

const ul = document.createElement("ul");

const newsDetail = () => {
  const id = location.hash.substring(1);

  const newsContents = getData(CONTENT_URL.replace("@id", id));

  const title = document.createElement("h1");
  container.innerHTML = `
  <h1>${newsContents.title}</h1>

  <div>
    <a href="#">목록으로</a>
  </div>
  `;
};

const router = () => {
  const routePath = location.hash;

  if (routePath === "") {
    newsFeed();
  } else {
    newsDetail();
  }
};

window.addEventListener("hashchange", router);

router();
