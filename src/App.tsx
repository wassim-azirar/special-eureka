import React from "react";
import "./App.css";
import { DOMMessage, DOMMessageResponse } from "./types";

function App() {
  const [linkedIn, setLinkedIn] = React.useState("");
  const [name, setName] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    // we need to specify which tab to send.
    chrome.tabs &&
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // sends a message to the content script in the specified tab, with a callback to run when a response is sent back.
        // The runtime.onMessage event is fired in the content script running in the specified tab.
        chrome.tabs.sendMessage(tabs[0].id || 0, { type: "GET_DOM" } as DOMMessage, (response: DOMMessageResponse) => {
          setLinkedIn(response.linkedin);
          setName(response.name);
          setPosition(response.position);
          setAddress(response.address);
        });
      });
  });

  return (
    <div className="App">
      <div>{linkedIn}</div>
      <div>{name}</div>
      <div>{position}</div>
      <div>{address}</div>
    </div>
  );
}

export default App;
