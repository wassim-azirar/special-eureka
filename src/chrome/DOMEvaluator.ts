import { DOMMessage, DOMMessageResponse } from "../types";

const requestInit: RequestInit = {
  method: "GET",
  cache: "no-cache",
  credentials: "same-origin"
};

const getCookieValue = (cookieName: string) => {
  const cookie = document.cookie.match(`(^|[^;]+)\\s*${cookieName}\\s*=\\s*([^;]+)`);
  return cookie ? cookie.pop() : "";
};

const callback = async (message: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) => {
  const name = document.querySelectorAll("h1.text-heading-xlarge")[0].innerHTML.replace(/\n/gi, "").trim();
  const position = document.querySelectorAll("div.text-body-medium")[0].innerHTML.replace(/\n/gi, "").trim();
  const address = document.querySelectorAll("span.text-body-small.inline")[0].innerHTML.replace(/\n/gi, "").trim();

  const ownImage = document.querySelectorAll("img.profile-photo-edit__preview");
  const ownImageValue = ownImage && ownImage.length > 0 ? ownImage[0]?.getAttribute("src") : "";
  const otherImage = document.querySelectorAll("img.pv-top-card-profile-picture__image");
  const otherImageValue = otherImage && otherImage.length > 0 ? otherImage[0]?.getAttribute("src") : "";
  const image = ownImageValue || otherImageValue || "https://www.pngkey.com/png/detail/157-1579943_no-profile-picture-round.png";

  const linkedIn = window.location.href.split("/")[4];
  const cookie = getCookieValue("JSESSIONID");

  const csrf = cookie ? cookie.replace(/"/gi, "") : "";
  const detailsRequest = await fetch(`https://www.linkedin.com/voyager/api/identity/profiles/${linkedIn}/profileContactInfo`, {
    ...requestInit,
    headers: { "csrf-token": csrf }
  });

  const detailsResponse = await detailsRequest.json();
  console.log("detailsResponse", detailsResponse);

  const response: DOMMessageResponse = {
    linkedIn,
    name,
    image,
    position,
    address
  };

  sendResponse(response);
};

// Fired when a message is sent from the extension or a content script.
chrome.runtime.onMessage.addListener(callback);
