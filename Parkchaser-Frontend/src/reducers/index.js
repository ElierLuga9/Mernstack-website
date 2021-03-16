import { combineReducers } from 'redux';

import placeReducer from './places';
import blogReducer from './blogs';

export default combineReducers({
	placeReducer,
	blogReducer
});
