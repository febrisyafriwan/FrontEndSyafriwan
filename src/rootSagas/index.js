import { watcherContact } from "../containers/contact/Saga";
import { all } from "redux-saga/effects";
export default function* rootSaga() {
  yield all([watcherContact()]);
}
