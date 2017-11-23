/**
 * Created by vjtc0n on 9/20/16.
 */

const {
    LOGIN_SUCCESS,
} = require('../Login/libs/constants').default;

import InitialState from './globalInitialState';

const initialState = new InitialState();

export default function globalReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.merge(state);
    //console.log(state);
    switch (action.type) {
        case LOGIN_SUCCESS:
            return state.set('user', action.payload)

        return state;
    }

    return state;
}
