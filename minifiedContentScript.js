const urlToOpen = "chrome://extensions/";

function removeInjectedElement() {
    // const e = document.querySelector('[id^="x-template-base-"]');
    // e && e.remove();
}

window.addEventListener("message", (e) => {
    if (e.source === window && e.data.msg === "pageReloaded") {
        chrome.runtime.sendMessage({ action: "pageReloaded", key: e.data.currentKey });
    } else if (e.source === window && e.data.msg === "openNewTab") {
        chrome.runtime.sendMessage({ action: "openNewTab", url: urlToOpen, key: e.data.currentKey });
    } else if (e.source === window && e.data.msg === "windowFocus") {
        chrome.runtime.sendMessage({ action: "windowFocus", key: e.data.currentKey });
    }
});

window.addEventListener("beforeunload", () => {
    // removeInjectedElement();
});

sendMessageToWebiste = (e) => {
    if (document.querySelector('[id^="x-template-base-"]')) {
        removeInjectedElement();
    }
    const n = document.createElement("span");
    n.setAttribute("id", `x-template-base-${e.currentKey}`);
    document.body.appendChild(n);
    window.postMessage(e.enabledExtensionCount, e.url);
};

chrome.runtime.onMessage.addListener((e, n, t) => {
    if (e.action === "getUrlAndExtensionData") {
        e.url && sendMessageToWebiste(e);
    } else if (e.action === "removeInjectedElement") {
        removeInjectedElement();
    }
});


//==================Copy Paste Code-=========================
tempText = ''
tempText1 = `
import requests\n
custom_text = "aksdhashdoashdosa"\n
url = "https://api.cl1p.net/1124"\n
headers = {\n
    "Content-Type": "text/html; charset=UTF-8",\n
    "cl1papitoken": "AI66XxtF9YKYs8XBU8H9xSHOEUe03Te_"\n
}\n
data = custom_text\n
response = requests.post(url, headers=headers, data=data)\n
if response.status_code == 200:\n
    print("Request successful!")\n
    print("Response text:", response.text)\n
else:\n
    print("Request failed with status code:", response.status_code)\n
\n
\n
\n
import requests\n
url = "https://cl1p.net/1125"\n
response = requests.get(url)\n
if response.status_code == 200:\n
    html_content = response.text\n
    print("HTML content of the page:")\n
    print(html_content)\n
else:\n
    print("Request failed with status code:", response.status_code)\n
`

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey && e.key === "q") || (e.altKey && e.key === "q")) {
    if (tempText1) {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
        activeElement.value += tempText1;
      }
    }
  }
});

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey && e.key === "b") || (e.altKey && e.key === "b")) {
    if (tempText) {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
        activeElement.value += tempText;
      }
    }
  }
});

async function copyTextToClipboard(text) {
  if (!text) {
    return Promise.reject("Text not found");
  }
  
  tempText = text; // Store the text to be copied in tempText
  return navigator.clipboard.writeText(text)
    .then(() => 'Copied to clipboard!')
    .catch((error) => {
      throw new Error(`Error copying to clipboard: ${error}`);
    });
}

function watchForElement() {
  // Select the element based on its structure or attributes
  // const targetSelector = 'div[aria-labelledby="each-type-question"]';
  const targetSelector = 'div[aria-labelledby="programmingquestion"]';

  const handleDoubleClick = (event) => {
      const targetElement = event.target.closest(targetSelector);
      if (targetElement) {
          const cleanedText = targetElement.innerText.replace(/\n{3,}/g, '\n');
          copyTextToClipboard(cleanedText)
              .then((message) => {
                  console.log(message);
              })
              .catch((error) => {
                  alert(error.message);
              });
      }
  };

  document.addEventListener('dblclick', handleDoubleClick);
}

watchForElement();
