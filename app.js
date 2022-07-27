const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store = {
  currentPage: 1,
};

const getData = (url) => {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
};

const newsFeed = () => {
  const newsFeeds = getData(NEWS_URL);
  const newsList = [];
  let template = `
<div class="container mx-auto p-4">
  <h1>Hacker News</h1>
  <ul>
    {{__news_feeds__}}
  </ul>
  <div>
    <a href="#/page/{{__prev_page__}}">이전 페이지</a>
    <a href="#/page/{{__next_page__}}">다음 페이지</a>
</div>
`;

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
      <li>
        <a href="#/show/${newsFeeds[i].id}">
          ${newsFeeds[i].title} (${newsFeeds[i].comments_count})
        </a>
      </li>
  `);
  }

  template = template.replace(`{{__news_feeds__}}`, newsList.join(""));
  template = template.replace(`{{__prev_page__}}`, store.currentPage > 1 ? store.currentPage - 1 : 1);
  template = template.replace(`{{__next_page__}}`, store.currentPage + 1);

  container.innerHTML = template;
};

const newsDetail = () => {
  const id = location.hash.substring(7);
  const newsContents = getData(CONTENT_URL.replace("@id", id));

  container.innerHTML = `
  <h1>${newsContents.title}</h1>

  <div>
    <a href="#/page/${store.currentPage}">목록으로</a>
  </div>
  `;
};

const router = () => {
  const routePath = location.hash;

  if (routePath === "") {
    newsFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substring(7));
    newsFeed();
  } else {
    newsDetail();
  }
};

window.addEventListener("hashchange", router);

router();
