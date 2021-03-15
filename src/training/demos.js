import { createStore } from 'redux';

var initialState = {
	status : false,
	sort : {
		by : 'name',
		value : 1 // 1 tang, -1 giam
	},
	
}

var myReducer = (state = initialState, action) => {
	if(action.type === 'TOGGLE_STATUS'){
		state.status = !state.status;
		return state;
	}
	if(action.type === 'SORT'){
		var { by, value } = action.sort;
		var { status } =state;
		return{
			status : status,
			sort : {
				by : by,
				value : value
			}
		}
	}
	return state;
}

const store = createStore(myReducer);
console.log('Default : ', store.getState());

//thực hiện công việc thay đổi status
var action = { type: 'TOGGLE_STATUS' };
store.dispatch(action);
console.log('TOGGLE_STATUS : ', store.getState());

// thực hiện công việc sắp xếp tên từ Z-A
var sortAction = {
	type : 'SORT',
	sort : {
		by : 'name',
		value : -1
	}
 }
 store.dispatch(sortAction);
 console.log('SORT: ',store.getState());
