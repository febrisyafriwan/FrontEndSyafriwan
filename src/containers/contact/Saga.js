import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
// import { HTTP_SERVICE } from '../../service/HttpService'
import {
    getAllAccountSuccess,
    getAllAccountFailed,
    deleteAccountSuccess,
    deleteAccountFailed,
    addAccountSuccess,
    addAccountFailed,
    editAccountSuccess,
    editAccountFailed,
    getAccountByIdSuccess,
    getAccountByIdFailed
} from "./Action";

function* fetchAllContact() {
    const json = yield fetch('https://simple-contact-crud.herokuapp.com/contact', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => response.json());
    //If response is in json then in success
    return json
}

function* deleteContact(body) {
    const json = yield fetch(`https://simple-contact-crud.herokuapp.com/contact/${body}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => response.json());
    //If response is in json then in success
    return json
}

function* addContact(body) {
    
    const json = yield fetch('https://simple-contact-crud.herokuapp.com/contact', {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => response.json())
    return json
}
function* editContact(body) {
    const json = yield fetch(`https://simple-contact-crud.herokuapp.com/contact/${body.id}`, {
        method: "PUT",
        body: JSON.stringify(body.data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
    return json
}


function* getContactById(body) {
    console.log(body)
    const json = yield fetch(`https://simple-contact-crud.herokuapp.com/contact/${body}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => response.json());
    //If response is in json then in success
    return json
}
export function* workerGetAllAccount() {
    try {
        const response = yield call(fetchAllContact);
        // console.log(response)
        if (response.message == 'Get contacts') {
            console.log("success");
            yield put(getAllAccountSuccess(response.data))
        } else {
            console.log("failed");
            yield put(getAllAccountFailed(response.message));
        }
    } catch (error) {
        yield put(getAllAccountFailed(response.message));
        console.log("error", error);
    }
}

export function* workerDeleteAccount(action) {
    try {
        const response = yield call(deleteContact, action.payload);
        console.log(response);
        if (response) {
            console.log("success");
            yield put(deleteAccountSuccess(response.message));
        } else {
            console.log("failed");
            yield put(deleteAccountFailed(response.message));
        }
    } catch (error) {
        yield put(deleteAccountFailed(response.message));
        console.log("error", error);
    }
}

export function* workerAddAccount(action) {
    try {
        const response = yield call(addContact, action.payload);
        console.log(response);
        if (response.message == 'contact saved') {
            console.log("success");
            yield put(addAccountSuccess(response.message));
        } else {
            console.log("failed");
            yield put(addAccountFailed(response.message));
        }
    } catch (error) {
        yield put(addAccountFailed(response.message));
        console.log("error", error);
    }
}

export function* workerEditAccount(action) {
    try {
        const response = yield call(editContact, action.payload);
        console.log(response);
        if (response.message == 'Contact edited') {
            console.log("success");
            yield put(editAccountSuccess(response.message));
        } else {
            console.log("failed");
            yield put(editAccountFailed(response.message));
        }
    } catch (error) {
        yield put(editAccountFailed(response.message));
        console.log("error", error);
    }
}
export function* workerGetAccountById(action) {
    try {
        const response = yield call(getContactById,action.payload);
        console.log(response)
        if (response.message == 'Get Contact by id') {
            console.log("success");
            yield put(getAccountByIdSuccess(response.data))
        } else {
            console.log("failed");
            yield put(getAccountByIdFailed(response.message));
        }
    } catch (error) {
        yield put(getAccountByIdFailed(response.message));
        console.log("error", error);
    }
}


export function* watcherContact() {
    yield takeLatest("getAllAccount", workerGetAllAccount);
    yield takeEvery("deleteAccount", workerDeleteAccount);
    yield takeEvery("addAccount", workerAddAccount);
    yield takeEvery("editAccount", workerEditAccount);
    yield takeLatest("getAccountById", workerGetAccountById);
}
