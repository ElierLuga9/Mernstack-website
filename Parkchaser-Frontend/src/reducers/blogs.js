import { SET_BLOGS, SET_RECENT_BLOGS } from '../constants';

const initialState = { blogs: [], recentBlogs: [] };



export default function setBrowserInfo(state = initialState, action) {
    switch (action.type) {
        case SET_BLOGS:
            return {
                ...state,
                blogs: action.blogs
            };
        case SET_RECENT_BLOGS:
            return {
                ...state,
                recentBlogs: action.blogs
            }
        default:
            return state;
    }
}
