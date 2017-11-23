/**
 * Created by vjtc0n on 9/20/16.
 */
import {Record} from 'immutable';

var InitialState = Record({
    user: new Record({
        user: {
            user_id: '',
            user_name: '',
            password: ''
        }
    })
});
export default InitialState;