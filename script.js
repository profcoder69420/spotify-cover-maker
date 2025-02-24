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
        viewport: { width: 297, height: 178 },
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

function selectText(element) {
  element.select();
}
