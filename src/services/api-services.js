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

  async addClass(body) {
    const { data } = await axios.post(`${backendAPI}/class`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async updateClass({ id, ...body }) {
    const { data } = await axios.patch(`${backendAPI}/class/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async deleteClass(id) {
    const { data } = await axios.delete(
      `${backendAPI}/class/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

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

  async updateCampus({ id, ...body }) {
    const { data } = await axios.patch(`${backendAPI}/campus/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async toggleCampusStatus({ id, status }) {
    const { data } = await axios.patch(
      `${backendAPI}/${status === 'disabled' ? 'disablecampus' : 'enablecampus'}/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async getAllStaffs() {
    const { data } = await axios.get(`${backendAPI}/staff`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async addStaff(body) {
    const { data } = await axios.post(`${backendAPI}/staff`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async updateStaff({ id, ...body }) {
    const { data } = await axios.patch(`${backendAPI}/staff/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async deleteStaff(id) {
    const { data } = await axios.delete(
      `${backendAPI}/staff/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async getStaff(id) {
    const { data } = await axios.get(`${backendAPI}/staff/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async toggleStaffStatus({ id, status }) {
    const { data } = await axios.patch(
      `${backendAPI}/${status === 'disabled' ? 'disablestaff' : 'enablestaff'}/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async getAllStudents() {
    const { data } = await axios.get(`${backendAPI}/student`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async addStudent(body) {
    const { data } = await axios.post(`${backendAPI}/student`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async updateStudent({ id, ...body }) {
    const { data } = await axios.patch(`${backendAPI}/student/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async deleteStudent(id) {
    const { data } = await axios.delete(
      `${backendAPI}/student/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async getStudent(id) {
    const { data } = await axios.get(`${backendAPI}/student/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }
}

export default APIServies;
