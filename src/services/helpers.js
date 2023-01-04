class Helpers {
  storeToken(token) {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    document.cookie = `userToken=${token}; expires=${d.toUTCString()}`;
  }

  getToken() {
    return document.cookie.split("userToken=").splice(-1)[0];
  }
}

export default Helpers;
