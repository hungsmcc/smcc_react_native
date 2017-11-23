/**
 * Created by vjtc0n on 9/12/16.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import devTools from 'remote-redux-devtools';
import { Platform } from 'react-native';

/**
 * ## Reducer
 * The reducers contains the all reducers
 */
import rootReducer from '../reducers/index';

/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 *
 */
export default function configureStore (initialState) {
    const enhancer = compose(
        applyMiddleware(thunk),
        devTools()
    );
    const store = createStore(rootReducer, initialState, enhancer);
    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    devTools.updateStore(store);
    return store;
};
