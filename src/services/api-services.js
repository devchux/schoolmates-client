import axios from "axios";
import { toast } from "react-toastify";
import { backendAPI } from "../utils/constants";
import Helpers from "./helpers";

class APIServies extends Helpers {
  errorHandler(error, message) {
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

  async register(body) {
    const { data } = await axios.post(`${backendAPI}/register`, { ...body });

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

  async getAllCampuses() {
    const { data } = await axios.get(`${backendAPI}/campus`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getCampus(id) {
    const { data } = await axios.get(`${backendAPI}/campus/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async addCampus(body) {
    const { data } = await axios.post(`${backendAPI}/campus`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async updateCampus({ id, body }) {
    const { data } = await axios.patch(`${backendAPI}/campus/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async disableCampus({ id, status }) {
    const { data } = await axios.patch(
      `${backendAPI}/disablecampus/${id}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }
}

export default APIServies;
