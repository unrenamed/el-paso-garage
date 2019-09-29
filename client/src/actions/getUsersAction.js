export const getUsersAction = () => dispatch => {
    return fetch('/users')
        .then(res => res.json())
        .then(users => {
            dispatch({
                type: 'GET_USERS_ACTION',
                payload: users
            })
        });
};
