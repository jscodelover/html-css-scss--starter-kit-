import { call, put, takeLatest, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { push } from 'connected-react-router';
import { auth, database, firebase } from 'utils/firebase';
import { showAlert } from 'modules/App/store/actions';
import { actions, userLoginSuccess, userLogoutSuccess } from './actions';

function userData(user) {
  return {
    givenName: user.profile.given_name,
    familyName: user.profile.family_name,
    email: user.profile.email,
    picture: user.profile.picture,
    socialMedia: {
      facebook: '',
      github: '',
      twitter: '',
      linkedIn: '',
      medium: '',
    },
    role: '',
    skills: '',
    hobbies: '',
    createdOn: user.metadata.creationTime,
    uid: user.uid,
  };
}

function databaseRef(uid) {
  return database.ref(`/users/${uid}`);
}

function* loginWorkerSaga({ callback }) {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    auth.useDeviceLanguage();
    const { additionalUserInfo, user } = yield call(
      [auth, auth.signInWithPopup],
      provider,
    );
    console.log(additionalUserInfo, user);
    if (additionalUserInfo.profile.hd === 'wesence.com') {
      let data;
      if (additionalUserInfo.isNewUser) {
        const refernce = databaseRef(user.uid);
        data = userData({ ...additionalUserInfo, ...user });
        yield call([refernce, refernce.set], data); // Data need to be saved in Database.
        yield put(userLoginSuccess(data));
        yield put(push('/profile'));
      } else {
        const refernce = databaseRef(user.uid);
        const snap = yield call([refernce, refernce.once], 'value'); // read add from database.
        data = snap.val();
        yield put(userLoginSuccess(data));
        yield put(push('/home'));
      }
    } else {
      yield put(userLogoutSuccess());
      yield put(showAlert('You are not a Wesence Employee', false));
    }
  } catch (e) {
    yield put(showAlert(e.message, false));
  }
}

export function* loginWatcherSaga() {
  yield takeLatest(actions.LOGIN_REQUEST, loginWorkerSaga);
}

function* logoutWorkerSaga() {
  console.log('logout');
  try {
    yield call([auth, auth.signOut]);
    yield put(push('/'));
  } catch (e) {
    yield put(showAlert('Error', false));
  } finally {
    yield put(userLogoutSuccess());
  }
}

export function* logoutWatcherSaga() {
  yield takeLatest(actions.LOGOUT_REQUEST, logoutWorkerSaga);
}

function* checkAuthWorkerSaga({ callback }) {
  const channel = yield call(checkUser);
  const { user } = yield take(channel);
  if (user) {
    console.log(user);
    const reference = databaseRef(user.uid);
    const empData = yield call([reference, reference.once], 'value');
    if (empData.val()) {
      yield put(userLoginSuccess(empData.val()));
      callback();
    } else {
      console.log('other user');
      yield put(push('/'));
      yield put(userLogoutSuccess());
      yield put(
        showAlert('Logout from the other gmail then try to login ', false),
      );
    }
  } else {
    console.log('not user');
    yield put(push('/'));
    yield put(userLogoutSuccess());
  }
}

function checkUser() {
  const channel = eventChannel((emit) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => emit({ user }),
      (error) => emit({ error }),
    );
    return unsubscribe;
  });
  return channel;
}

export function* checkAuthWatcherSaga() {
  yield takeLatest(actions.CHECK_AUTH, checkAuthWorkerSaga);
}
