import { DOMMessage, DOMMessageResponse } from "../types";

const callback = (message: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) => {
  console.log("message", message);

  const name = document.querySelectorAll("h1.text-heading-xlarge.inline.t-24.break-words")[0];
  const position = document.querySelectorAll("div.text-body-medium.break-words")[0];
  const address = document.querySelectorAll("span.text-body-small.inline.t-black--light.break-words")[0];

  const response: DOMMessageResponse = {
    linkedin: window.location.href.split("/")[4],
    name: name?.innerHTML.replace(/\n/gi, "").trim(),
    position: position?.innerHTML.replace(/\n/gi, "").trim(),
    address: address?.innerHTML.replace(/\n/gi, "").trim()
  };

  sendResponse(response);
};

// Fired when a message is sent from the extension or a content script.
chrome.runtime.onMessage.addListener(callback);
