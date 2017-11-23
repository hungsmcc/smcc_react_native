/**
 * Created by vjtc0n on 9/20/16.
 */
import { combineReducers } from 'redux';
//import authReducer from '../Login/reducers/reducer';
import globalReducer from './globalReducer';
//import profileReducer from '../Profile/reducers/reducer';
//import personalReducer from '../PersonalPage/reducers/reducer';

const rootReducer = combineReducers({

    'global' : globalReducer
});

export default rootReducer;
