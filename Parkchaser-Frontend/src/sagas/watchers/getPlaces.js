import { put, takeLatest, call } from 'redux-saga/effects';

import {
	GET_PLACES_SAGA, GET_PLACES_FROM_DB,
	UPDATE_DB, CLEAR_DB, SEND_EMAIL, GET_ALL_BLOGS, GET_RECENT_BLOGS
} from '../../constants';

import { setPlaces, setAllBlogs, setRecentBlogs } from '../../actions';
import { getPlaces, updatePlaceDB, clearPlaceDB, getPlacesFromDb, sendEmail, getAllBlogs, getRecentBlogs } from '../../lib/api';

function* workerGetPlacesSaga() {
	const places = yield call(getPlaces);
	yield put(setPlaces(places));
}

function* workerUpdateDB() {
	yield call(updatePlaceDB);
}
function* workerClearDB() {
	yield call(clearPlaceDB);
}

function* workerGetPlacesFromDB() {
	var data = yield call(getPlacesFromDb);
	yield put(setPlaces(data));
}

function* workerSendEmail(action) {
	yield call(sendEmail, action.data);
}

function* workerGetAllBlogs() {
	let data = yield call(getAllBlogs);
	yield put(setAllBlogs(data));
}
function* workerGetRecentBlogs() {
	let data = yield call(getRecentBlogs);
	yield put(setRecentBlogs(data));
}
export default function* watchGetUsersSaga() {
	yield takeLatest(GET_PLACES_SAGA, workerGetPlacesSaga);

	yield takeLatest(UPDATE_DB, workerUpdateDB);
	yield takeLatest(CLEAR_DB, workerClearDB);

	yield takeLatest(GET_PLACES_FROM_DB, workerGetPlacesFromDB);

	yield takeLatest(SEND_EMAIL, workerSendEmail);
	yield takeLatest(GET_ALL_BLOGS, workerGetAllBlogs);
	yield takeLatest(GET_RECENT_BLOGS, workerGetRecentBlogs);
}