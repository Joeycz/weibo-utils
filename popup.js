let PC = document.getElementById("PCbtn");
let mobile = document.getElementById("mobilebtn");

const mRegx = /\/x\/m/

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

PC.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: gotoPCArticle
  });
});

mobile.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: gotoMobileArticle
  });
});

// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }

function gotoPCArticle () {
  const pathname = window.location.pathname
  if (!/\/x\/m/.test(pathname)) return
  if (/\/x\/m/.test(pathname)) {
    const arr = pathname.split('/id/')
    const id = arr[arr.length - 1]
    const url = 'https://weibo.com/ttarticle/p/show?id=' + id
    window.open(url)
  }
}

function gotoMobileArticle () {
  const pathname = window.location.pathname
  if (!/ttarticle\/p\/show/.test(pathname)) return
  if (/ttarticle\/p\/show/.test(pathname)) {
    const arr = window.location.search.split('&').filter(item => item.match(/id=/))
    const id = arr[0].split('=')[1]
    const url = 'https://weibo.com/ttarticle/x/m/show/id/' + id
    // chrome.tabs.create({ url })
    window.open(url)
  }
}