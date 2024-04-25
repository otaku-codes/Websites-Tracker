async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function currTab() {
  const tab = await getCurrentTab();
  const url = new URL(tab.url);

  if (tab) {
    let websites = new Set(JSON.parse(localStorage.getItem("websites")));

    if (url.hostname && url.hostname != "newtab" && url.hostname !== "extensions") {
      websites.add(url.hostname);
    }

    localStorage.setItem("websites", JSON.stringify(Array.from(websites)));

    const output = JSON.parse(localStorage.getItem("websites"));

    const el = document.querySelector("#curr");

    output.forEach((element) => {
      const li = document.createElement("li");
      li.textContent = element;
      el.appendChild(li);
    });
  } else {
    document.querySelector("#curr").innerHTML = "No active tab found";
  }
}

if (!localStorage.getItem("websites")) {
  localStorage.setItem("websites", JSON.stringify([]));
}

currTab();
