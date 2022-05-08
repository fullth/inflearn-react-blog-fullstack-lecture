import { all } from 'redux-saga/effects';

// es6 문법인 제너레이터: 여러 값을 반환할 수 있는 최신 문법
export default function* rootSaga() {
  yield all([]);
}