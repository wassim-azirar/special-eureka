import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';

function App() {
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    // we need to specify which tab to send.
    chrome.tabs && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      // sends a message to the content script in the specified tab, with a callback to run when a response is sent back.
      // The runtime.onMessage event is fired in the content script running in the specified tab.
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'GET_DOM' } as DOMMessage,
        (response: DOMMessageResponse) => {
          setTitle(response.title);
        });
    });
  });

  return (
    <div className="App">
      <ul className="SEOForm">
        <li className="SEOValidation">
          <div className="SEOValidationField">
            <span className="SEOValidationFieldTitle">{title}</span>
            <span className={`SEOValidationFieldStatus ${title.length < 30 || title.length > 65 ? 'Error' : 'Ok'}`}>
              {title.length} characters
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
