export const getUsersAction = () => dispatch => {
    return fetch('/api/users')
        .then(res => res.json())
        .then(users => {
            dispatch({
                type: 'GET_USERS_ACTION',
                payload: users
            })
        });
};
