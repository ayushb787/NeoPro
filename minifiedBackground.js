let tabDetails;
const domain_ip_addresses = ["142.250.193.147", "34.233.30.196", "35.212.92.221"];
let currentKey = null;

function fetchExtensionDetails(e) {
  chrome.management.getAll((t => {
    const n = t.filter((e => e.enabled && "NeoExamShield" !== e.name && "extension" === e.type)).length;
    e([], 0) ///Modified This to always set it to empty list of enabled extension and 0 enabled extension  Originally it was e(e,t)
  }))
}

const fetchDomainIp = e => new Promise((async (t, n) => {
  let a = new URL(e);
  a = a.hostname;
  fetch(`https://dns.google/resolve?name=${a}`).then((e => e.json())).then((e => {
    const n = e.Answer.filter((e => 1 === e.type))[0].data;
    t(n)
  })).catch((e => {
    t(null)
  }))
}));

async function handleUrlChange() {
  if (tabDetails.url.includes("mycourses/details?id=") || tabDetails.url.includes("test?id=") || tabDetails.url.includes("mycdetails?c_id=") || tabDetails.url.includes("/test-compatibility")) {
    let t = await (e = tabDetails.url, new Promise((async (t, n) => {
      let a = new URL(e);
      a = a.hostname;
      console.log("============================");
      console.log(a);
      fetch(`https://dns.google/resolve?name=${a}`).then((e => e.json())).then((e => {
        const n = e.Answer.filter((e => 1 === e.type))[0].data;
        t(n)
      })).catch((e => {
        t(null)
      }))
    })));
    t && domain_ip_addresses.includes(t) || tabDetails.url.includes("examly.net") || tabDetails.url.includes("examly.test") ? fetchExtensionDetails((async (e, t) => {
      chrome.tabs.sendMessage(tabDetails.id, {
        action: "getUrlAndExtensionData",
        url: tabDetails.url,
        enabledExtensionCount: t,
        extensions: e,
        id: tabDetails.id,
        currentKey: currentKey
      }
      , (e => {
        chrome.runtime.lastError && "Could not establish connection. Receiving end does not exist." === chrome.runtime.lastError.message && chrome.tabs.update(tabDetails.id, {
          url: tabDetails.url
        })
      }))
    })) : console.log("Failed to fetch ip address")
  }
  var e
}

function openNewMinimizedWindowWithUrl(e) {
  chrome.tabs.create({
    url: e
  }, (e => {}))
}

chrome.runtime.onInstalled.addListener((() => {
  chrome.tabs.query({
    active: !0,
    currentWindow: !0
  }, (e => {
    chrome.tabs.update(e[0].id, {
      url: e[0].url
    })
  }))
}));

chrome.tabs.onActivated.addListener((e => {
  chrome.tabs.get(e.tabId, (e => {
    tabDetails = e;
    handleUrlChange()
  }))
}));

chrome.tabs.onUpdated.addListener(((e, t, n) => {
  "complete" === t.status && (tabDetails = n, handleUrlChange())
}));

chrome.runtime.onMessage.addListener(((e, t, n) => {
  if (currentKey = e.key, "pageReloaded" === e.action || "windowFocus" === e.action) handleUrlChange(); // handleUrlChange()
  else if ("openNewTab" === e.action) {
    // openNewMinimizedWindowWithUrl(e.url)
  }
}));
