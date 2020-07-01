export const addAccount = (value) => ({
    type: 'addAccount',
    payload: value
});
export const addAccountSuccess = (value) => ({
    type: 'addAccountSuccess',
    payload: value
});
export const addAccountFailed = (value) => ({
    type: 'addAccountFailed',
    payload: value
});


export const editAccount = (value) => ({
    type: 'editAccount',
    payload: value
});
export const editAccountSuccess = (value) => ({
    type: 'editAccountSuccess',
    payload: value
});
export const editAccountFailed = (value) => ({
    type: 'editAccountFailed',
    payload: value
});


export const deleteAccount = (value) => ({
    type: 'deleteAccount',
    payload: value
});
export const deleteAccountSuccess = (value) => ({
    type: 'deleteAccountSuccess',
    payload: value
});
export const deleteAccountFailed = (value) => ({
    type: 'deleteAccountFailed',
    payload: value
});


export const getAllAccount = () => ({
    type: 'getAllAccount'
});
export const getAllAccountSuccess = (value) => ({
    type: 'getAllAccountSuccess',
    payload: value
});
export const getAllAccountFailed = (value) => ({
    type: 'getAllAccountFailed',
    payload: value
});


export const getAccountById = (value) => ({
    type: 'getAccountById',
    payload: value
});
export const getAccountByIdSuccess = (value) => ({
    type: 'getAccountByIdSuccess',
    payload: value
});
export const getAccountByIdFailed = (value) => ({
    type: 'getAccountByIdFailed',
    payload: value
});

export const restartAction = () => ({
    type: 'restartAction',
});
