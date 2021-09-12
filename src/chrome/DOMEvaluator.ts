import { DOMMessage, DOMMessageResponse } from "../types";

const callback = (message: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) => {
  console.log("message", message);

  const name = document.querySelectorAll("h1.text-heading-xlarge")[0].innerHTML.replace(/\n/gi, "").trim();
  const image = document.querySelectorAll("img.pv-top-card-profile-picture__image")[0].getAttribute("src");
  const position = document.querySelectorAll("div.text-body-medium")[0].innerHTML.replace(/\n/gi, "").trim();
  const address = document.querySelectorAll("span.text-body-small.inline")[0].innerHTML.replace(/\n/gi, "").trim();

  const response: DOMMessageResponse = {
    linkedin: window.location.href.split("/")[4],
    name: name,
    image: image ? image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    position: position,
    address: address
  };

  sendResponse(response);
};

// Fired when a message is sent from the extension or a content script.
chrome.runtime.onMessage.addListener(callback);
