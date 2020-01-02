import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './containers/App';
import { Provider } from 'react-redux';
import configureStore from '../src/store/configureStore';
import 'semantic-ui-css/semantic.min.css';
import './styles/tailwind.css';
import * as serviceWorker from './serviceWorker';

// @ts-ignore
const configuredStore = configureStore();

const app = (
    <Provider store={configuredStore}><App /></Provider>
);
ReactDOM.render(app, document.querySelector('#index') as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
