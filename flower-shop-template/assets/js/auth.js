/* =========================================================
   Bloomora – Client-side auth (demo)
   ---------------------------------------------------------
   Users are stored in localStorage so registration and
   login work in the browser without a backend.
   Exposes window.BloomAuth with register/login/logout/current.
   ========================================================= */
(function () {
  'use strict';

  var USERS_KEY = 'bloom-users';
  var SESSION_KEY = 'bloom-session';

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function normalize(email) {
    return String(email || '').trim().toLowerCase();
  }

  function allUsers() {
    return read(USERS_KEY, []);
  }

  function findUser(email) {
    var e = normalize(email);
    var users = allUsers();
    for (var i = 0; i < users.length; i++) {
      if (normalize(users[i].email) === e) return users[i];
    }
    return null;
  }

  function register(user) {
    if (!user || !user.email) return { ok: false, error: 'Please enter a valid email address.' };
    if (findUser(user.email)) return { ok: false, error: 'An account with this email already exists.' };
    var users = allUsers();
    users.push(user);
    write(USERS_KEY, users);
    return { ok: true };
  }

  function login(email, password) {
    var user = findUser(email);
    if (!user || user.password !== password) return { ok: false, error: 'Invalid email or password.' };
    try { localStorage.setItem(SESSION_KEY, user.email); } catch (e) {}
    return { ok: true, user: user };
  }

  function current() {
    try {
      var email = localStorage.getItem(SESSION_KEY);
      return email ? findUser(email) : null;
    } catch (e) {
      return null;
    }
  }

  function logout() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  window.BloomAuth = {
    register: register,
    login: login,
    logout: logout,
    current: current,
    findUser: findUser
  };
})();
