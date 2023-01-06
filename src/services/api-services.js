import axios from "axios";
import { toast } from "react-toastify";
import { backendAPI } from "../utils/constants";
import Helpers from "./helpers";

class APIServies extends Helpers {
  errorhandler(error, message) {
    let res = message || "An error occurred";
    if (error.response.status >= 400 && error.response.status <= 499) {
      res = error.response.data.message;
    }

    return toast.error(res);
  }

  async login(body) {
    const { data } = await axios.post(`${backendAPI}/login`, { ...body });

    super.storeToken(data?.data?.token);

    return data;
  }

  async getDesignation() {
    const { data } = await axios.get(`${backendAPI}/designation`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getAllClasses() {
    const { data } = await axios.get(`${backendAPI}/class`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }
}

export default APIServies;
