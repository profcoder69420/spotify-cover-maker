document.addEventListener("DOMContentLoaded", function () {
  const upload = document.getElementById("upload");
  const croppieContainer = document.getElementById("croppie-container");
  const cropButton = document.getElementById("crop-button");
  const croppedImage = document.getElementById("cropped-image");

  let croppieInstance;

  upload.addEventListener("change", function (event) {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (croppieInstance) {
        croppieInstance.destroy();
      }
      croppieInstance = new Croppie(croppieContainer, {
        viewport: { width: 300, height: 177 },
        boundary: { width: 400, height: 300 },
        showZoomer: true,
      });
      croppieInstance.bind({
        url: e.target.result,
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  });

  cropButton.addEventListener("click", function () {
    croppieInstance
      .result({
        type: "base64",
      })
      .then(function (croppedImageData) {
        croppedImage.src = croppedImageData;
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.getElementById("input-text");
  const playlistName = document.getElementById("playlist-name");

  inputText.addEventListener("input", function () {
    playlistName.innerHTML = `${inputText.value}`;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const inputBrat = document.getElementById("input-brat");
  const bratName = document.getElementById("brat-name");

  inputBrat.addEventListener("input", function () {
    bratName.innerHTML = `${inputBrat.value}`;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.getElementById("download-button");
  const content = document.getElementById("playlist-cover");
  downloadButton.addEventListener("click", function () {
    domtoimage
      .toPng(content)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `this-is.png`;

        link.click();
      })
      .catch(function (error) {
        alert("You haven't inserted anything");
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const downloadBratButton = document.getElementById("download-brat-button");
  const bratContent = document.getElementById("brat-cover");
  downloadBratButton.addEventListener("click", function () {
    domtoimage
      .toPng(bratContent)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "brat.png";

        link.click();
      })
      .catch(function (error) {
        alert("You haven't inserted anything");
      });
  });
});
// hello
function selectText(element) {
  element.select();
}

const tabsContainer = document.querySelector(".tabs-container");
const tabsList = tabsContainer.querySelector("ul");
const tabButtons = tabsList.querySelectorAll("a");
const tabPanels = tabsContainer.querySelectorAll(".tabs__panels > div");

tabsList.setAttribute("role", "tablist");

tabsList.querySelectorAll("li").forEach((listitem) => {
  listitem.setAttribute("role", "presentation");
});

tabButtons.forEach((tab, index) => {
  tab.setAttribute("role", "tab");
  if (index === 0) {
    tab.setAttribute("aria-selected", "true");
    // we'll add something here
  } else {
    tab.setAttribute("tabindex", "-1");
    tabPanels[index].setAttribute("hidden", "");
  }
});

tabPanels.forEach((panel) => {
  panel.setAttribute("role", "tabpanel");
  panel.setAttribute("tabindex", "0");
});

tabsContainer.addEventListener("click", (e) => {
  const clickedTab = e.target.closest("a");
  if (!clickedTab) return;
  e.preventDefault();

  switchTab(clickedTab);
});

tabsContainer.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "Home":
      e.preventDefault();
      switchTab(tabButtons[0]);
      break;
    case "End":
      e.preventDefault();
      switchTab(tabButtons[tabButtons.length - 1]);
      break;
  }
});

function moveLeft() {
  const currentTab = document.activeElement;
  if (!currentTab.parentElement.previousElementSibling) {
    switchTab(tabButtons[tabButtons.length - 1]);
  } else {
    switchTab(
      currentTab.parentElement.previousElementSibling.querySelector("a")
    );
  }
}

function moveRight() {
  const currentTab = document.activeElement;
  if (!currentTab.parentElement.nextElementSibling) {
    switchTab(tabButtons[0]);
  } else {
    switchTab(currentTab.parentElement.nextElementSibling.querySelector("a"));
  }
}

function switchTab(newTab) {
  const activePanelId = newTab.getAttribute("href");
  const activePanel = tabsContainer.querySelector(activePanelId);

  tabButtons.forEach((button) => {
    button.setAttribute("aria-selected", false);
    button.setAttribute("tabindex", "-1");
  });

  tabPanels.forEach((panel) => {
    panel.setAttribute("hidden", true);
  });

  activePanel.removeAttribute("hidden", false);

  newTab.setAttribute("aria-selected", true);
  newTab.setAttribute("tabindex", "0");
  newTab.focus();
}
