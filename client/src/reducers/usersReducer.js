export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_USERS_ACTION': {
            return action.payload;
        }
        default:
            return state;
    }
};
