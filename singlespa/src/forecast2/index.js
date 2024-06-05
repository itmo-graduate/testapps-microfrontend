import React from 'react';
import singleSpaReact from 'single-spa-react';
import App from './App';
import ReactDOM from 'react-dom';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () => document.getElementById('forecast2-container')
});

export const { bootstrap, mount, unmount } = lifecycles;
