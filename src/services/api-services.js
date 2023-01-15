import axios from "axios";
import { backendAPI } from "../utils/constants";
import Helpers from "./helpers";

class APIServies extends Helpers {
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
    const { data } = await axios.delete(`${backendAPI}/class/${id}`, {
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
      `${backendAPI}/${
        status === "disabled" ? "disablecampus" : "enablecampus"
      }/${id}`,
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
    const { data } = await axios.delete(`${backendAPI}/staff/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

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

  async getStaffAttendance() {
    const { data } = await axios.get(`${backendAPI}/staffattendance`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async toggleStaffStatus({ id, status }) {
    const { data } = await axios.patch(
      `${backendAPI}/${
        status === "disabled" ? "disablestaff" : "enablestaff"
      }/${id}`,
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
    const { data } = await axios.delete(`${backendAPI}/student/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

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

  async getStudentBySession(session) {
    const { data } = await axios.get(
      `${backendAPI}/studentsessionsearch/${session}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async withdrawStudent({ id }) {
    const { data } = await axios.patch(
      `${backendAPI}/withdrawstudent/${id}`,
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

  async getAllVehicles() {
    const { data } = await axios.get(`${backendAPI}/vehicle`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async addVehicle(body) {
    const { data } = await axios.post(`${backendAPI}/vehicle`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async updateVehicle({ id, ...body }) {
    const { data } = await axios.patch(`${backendAPI}/vehicle/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async deleteVehicle(id) {
    const { data } = await axios.delete(`${backendAPI}/vehicle/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getAllVehicleLogs() {
    const { data } = await axios.get(`${backendAPI}/vehiclelog`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async addVehicleLog(body) {
    const { data } = await axios.post(`${backendAPI}/vehiclelog`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async addCodeOfConduct(body) {
    const { data } = await axios.post(`${backendAPI}/codeconduct`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getVendorList() {
    const { data } = await axios.get(`${backendAPI}/vendor`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async changePassword(body) {
    const { data } = await axios.post(`${backendAPI}/changepassword`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getAllStudentDebtors() {
    const { data } = await axios.get(`${backendAPI}/studentdebtors`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getAllStudentCreditors() {
    const { data } = await axios.get(`${backendAPI}/studentcreditors`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getAllIncomeReports(term, session) {
    const { data } = await axios.get(
      `${backendAPI}/incomereport/${term}/${session}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async getAllExpenseReports(term, session) {
    const { data } = await axios.get(
      `${backendAPI}/expensesreport/${term}/${session}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async getAllDepartmentList() {
    const { data } = await axios.get(`${backendAPI}/department`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getAllOutstanding() {
    const { data } = await axios.get(`${backendAPI}/outstanding`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }
  async getAllExpectedIncome() {
    const { data } = await axios.get(`${backendAPI}/expectedincome`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getAllReceivedIncome() {
    const { data } = await axios.get(`${backendAPI}/receivedincome`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getAllGraduatedStudent() {
    const { data } = await axios.get(`${backendAPI}/graduatedstudent`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }
  async getAllDiscounts() {
    const { data } = await axios.get(`${backendAPI}/discount`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }
  async getAllExpenses() {
    const { data } = await axios.get(`${backendAPI}/totalexpense`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }
  async getAllAccountBalances() {
    const { data } = await axios.get(`${backendAPI}/accountbalance`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }
}

export default APIServies;
