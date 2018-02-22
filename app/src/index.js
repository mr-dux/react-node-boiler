import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import store, {history} from "./util/Store"
import App from "./components/App";
import {MuiThemeProvider} from "material-ui";

ReactDOM.render(
    (<Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider>
                <App/>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>),
    document.getElementById('root'));
