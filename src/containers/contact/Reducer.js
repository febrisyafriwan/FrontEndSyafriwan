const initialState = {
    action: null,
    isLoading: false,
    isError: false,
    dataContact: [],
    message: ''
};

export const ReducerContact = (state = initialState, action) => {
    switch (action.type) {
        case 'getAllAccount':
            console.log("getAllAccount(action)");
            return {
                ...state,
                action: action.type,
                isLoading: true,
                isError: false,
            }
        case 'getAllAccountFailed':
            console.log("getAllAccountFailed(action)");
            return {
                ...state,
                action: action.type,
                isLoading: false,
                isError: true,
                message: action.payload,
            }
        case 'getAllAccountSuccess':
            console.log("getAllAccountSuccess(action)");
            return {
                ...state,
                action: action.type,
                isLoading: false,
                isError: false,
                dataContact: action.payload,
            }



        case 'deleteAccount':
            console.log("deleteAccount(action)");
            return {
                ...state,
                action: action.type,
                isLoading: true,
                isError: false,
            }
        case 'deleteAccountFailed':
            console.log("deleteAccountFailed(action)");
            return {
                ...state,
                action: action.type,
                isLoading: false,
                isError: true,
                message: action.payload,
            }
        case 'deleteAccountSuccess':
            console.log("deleteAccountSuccess(action)");
            return {
                ...state,
                action: action.type,
                isLoading: false,
                isError: false,
                message: action.payload,
            }



        case 'addAccount':
            console.log("addAccount(action)");
            return {
                ...state,
                action: action.type,
                isLoading: true,
                isError: false,
            }
        case 'addAccountFailed':
            console.log("addAccountFailed(action)");
            return {
                ...state,
                action: action.type,
                isLoading: false,
                isError: true,
                message: action.payload,
            }
        case 'addAccountSuccess':
            console.log("addAccountSuccess(action)");
            return {
                ...state,
                action: action.type,
                isLoading: false,
                isError: false,
                message: action.payload,
            }



        case 'editAccount':
            console.log("editAccount(action)");
            return {
                ...state,
                action: action.type,
                isLoading: true,
                isError: false,
            }
        case 'editAccountFailed':
            console.log("editAccountFailed(action)");
            return {
                ...state,
                action: action.type,
                isLoading: false,
                isError: true,
                message: action.payload,
            }
        case 'editAccountSuccess':
            console.log("editAccountSuccess(action)");
            return {
                ...state,
                action: action.type,
                message: action.payload,
                isLoading: false,
                isError: false,
            }


        case 'getAccountById':
            console.log("getAccountById(action)");
            return {
                ...state,
                action: action.type,
                isLoading: true,
                isError: false,
            }
        case 'getAccountByIdFailed':
            console.log("getAccountByIdFailed(action)");
            return {
                ...state,
                action: action.type,
                isLoading: false,
                isError: true,
                message: action.payload,
            }
        case 'getAccountByIdSuccess':
            console.log("getAccountByIdSuccess(action)");
            const stategetAccountByIdSuccess = { ...state };
            stategetAccountByIdSuccess.isLoading = false;
            stategetAccountByIdSuccess.action = action.type;
            stategetAccountByIdSuccess.isError = false;
            stategetAccountByIdSuccess.dataContact = [];
            stategetAccountByIdSuccess.dataContact.push(action.payload);
            return stategetAccountByIdSuccess;

        case 'restartAction':
            console.log("restartAction(action)");
            return {
                ...state,
                action: null,
            }
        default:
            return state;
    }
};
