import {
	CHANGE_AUTH
} from '../actions/types';

export default function(state = false, action) {
	switch(action.type) {
		case CHANGE_AUTH:
			console.log('authentication is now: ', action.payload)
			return action.payload
	}

	return state;
}