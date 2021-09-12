import { DOMMessage, DOMMessageResponse } from '../types';

const messagesFromReactAppListener = (message: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) => {

  console.log('message', message);
  console.log('sender', sender);

  const response: DOMMessageResponse = {
    title: document.title
  };

  sendResponse(response)
}

// Fired when a message is sent from the extension or a content script.
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
