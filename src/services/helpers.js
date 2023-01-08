import moment from "moment";

class Helpers {
  storeToken(token) {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    document.cookie = `userToken=${token}; expires=${d.toUTCString()}`;
  }

  getToken() {
    var nameEQ = "userToken=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  eraseToken() {
    document.cookie = "userToken=; Max-Age=-99999999;";
  }

  formatData(data) {
    return data?.data?.map((x) => ({
      ...x?.attributes,
      id: x?.id,
    }));
  }

  formatDate = (date, format) => moment(date, format).format().split("T")[0];

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
}

export default Helpers;
