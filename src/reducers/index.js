import { combineReducers } from 'redux';
import tasks from './tasks.js';
import isDisplayForm from './isDisplayForm.js';
const myReducer = combineReducers({
	tasks, // tasks : tasks
	isDisplayForm
});
export default myReducer;