import store from './store';

let currentAuth;

function listener() {
  const previousAuth = currentAuth;

  currentAuth = store.getState().auth;
  if (currentAuth !== previousAuth) {
    localStorage.setItem('auth', JSON.stringify(currentAuth));
  }
}

function listen() {
  store.subscribe(listener);
}

export { listen };
