import moment from "moment";
import { toast } from "react-toastify";

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

  formatSingleData(data) {
    return { ...data?.data?.attributes, id: data?.data?.id };
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

  errorHandler(error, message) {
    let res = message || "An error occurred";
    if (error.response.status >= 400 && error.response.status <= 499) {
      res = error.response.data.message;
    }

    return toast.error(res);
  }

  handleSessionChange = (val, name, setFieldValue) => {
    const value = val.replace(/\//g, "");
    if (!value) {
      setFieldValue(name, value);
      return;
    }
    if (Number.isNaN(Number(value)) || value.length > 8) return;
    setFieldValue(name, value);
    if (value.length === 8) {
      const newValue = `${value.slice(0, 4)}/${value.slice(4)}`;
      setFieldValue(name, newValue);
    }
  };
}

export default Helpers;
