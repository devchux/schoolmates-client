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

  async deleteCampus(id) {
    const { data } = await axios.delete(`${backendAPI}/campus/${id}`, {
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

  async disableStaff(id) {
    const { data } = await axios.patch(`${backendAPI}/disablestaff/${id}`, {
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

  async addStaffAttendance(body) {
    const { data } = await axios.post(`${backendAPI}/staffattendance`, body, {
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

  async getStudentByAdmissionNumber(admission_number) {
    const { data } = await axios.get(
      `${backendAPI}/admissionnumbersearch/${admission_number}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async getStudentByClass({ present_class, sub_class }) {
    const { data } = await axios.get(
      `${backendAPI}/studentbyclass/${present_class}/${sub_class}`,
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

  async acceptStudent({ id }) {
    const { data } = await axios.patch(
      `${backendAPI}/acceptstudent/${id}`,
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

  async addVehicleLogs(body) {
    const { data } = await axios.post(`${backendAPI}/vehiclelog`, body, {
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

  async createDepartment(body) {
    const { data } = await axios.post(`${backendAPI}/department`, body, {
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

  async updateProfile({ id, ...body }) {
    const { data } = await axios.patch(`${backendAPI}/profile/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getDressCode() {
    const { data } = await axios.get(`${backendAPI}/dresscode`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async addStudentAttendance(body) {
    const { data } = await axios.post(`${backendAPI}/studentattendance`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getStudentAttendance(date) {
    const { data } = await axios.get(`${backendAPI}/attendance/${date}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getAllSubjects() {
    const { data } = await axios.get(`${backendAPI}/subjects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async addSubject(body) {
    const { data } = await axios.post(`${backendAPI}/subjects`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async addTimetable(body) {
    const { data } = await axios.post(`${backendAPI}/timetable`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async addAcademicCalender(body) {
    const { data } = await axios.post(`${backendAPI}/academiccalender`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getAcademicCalender() {
    const { data } = await axios.get(`${backendAPI}/academiccalender`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getTimeTable() {
    const { data } = await axios.get(`${backendAPI}/timetable`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async addResult(body) {
    const { data } = await axios.post(`${backendAPI}/result`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async addSubjectToStudent(body) {
    const { data } = await axios.post(`${backendAPI}/studentsubject`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getSchool() {
    const { data } = await axios.get(`${backendAPI}/school`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getStudentById(id) {
    const { data } = await axios.get(`${backendAPI}/student/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getSubjectByClass(className) {
    const { data } = await axios.get(`${backendAPI}/subject/${className}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getStudentByClassAndSession(className, session) {
    const { data } = await axios.get(
      `${backendAPI}/student/${session}/${className}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async getMaxScores() {
    const { data } = await axios.get(`${backendAPI}/maximumscores`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getResumptionDate() {
    const { data } = await axios.get(`${backendAPI}/closingresumption`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async postResumptionDate() {
    const { data } = await axios.post(`${backendAPI}/closingresumption`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getStudentResult(studentId, term, session) {
    const { data } = await axios.get(
      `${backendAPI}/midtermresult/${studentId}/${term}/${session}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async getAcademicPeriod() {
    const { data } = await axios.get(`${backendAPI}/getacademicperiod`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getClassPopulation() {
    const { data } = await axios.get(`${backendAPI}/classpopulation`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getPrincipalComments() {
    const { data } = await axios.get(`${backendAPI}/principalcomment`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async postPrincipalComment({ body }) {
    const { data } = await axios.post(`${backendAPI}/principalcomment`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getEndOfTermResults(student_id, term, session) {
    const { data } = await axios.get(
      `${backendAPI}/endtermresult/${student_id}/${term}/${session}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async getGrading() {
    const { data } = await axios.get(`${backendAPI}/grading`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getStudentFeeHistory() {
    const { data } = await axios.get(`${backendAPI}/studentfeehistory`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getStudentPreviousInvoice() {
    const { data } = await axios.get(`${backendAPI}/studentpreviousinvoice`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getStudentInvoice() {
    const { data } = await axios.get(`${backendAPI}/studentinvoice`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getStudentLoginDetails() {
    const { data } = await axios.get(`${backendAPI}/studentlogindetails`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getStaffLoginDetails() {
    const { data } = await axios.get(`${backendAPI}/stafflogindetails`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async promoteStudent({ id, ...body }) {
    const { data } = await axios.patch(
      `${backendAPI}/promotestudent/${id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async transferStudent({ id, ...body }) {
    const { data } = await axios.patch(
      `${backendAPI}/transferstudent/${id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${super.getToken()}`,
        },
      }
    );

    return data;
  }

  async importStudent(body) {
    const { data } = await axios.post(`${backendAPI}/studentimport`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async graduateStudent({ id }) {
    const { data } = await axios.patch(
      `${backendAPI}/graduatestudent/${id}`,
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

  async getAlumniList() {
    const { data } = await axios.get(`${backendAPI}/graduatedstudent`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getSchoolPopulation() {
    const { data } = await axios.get(`${backendAPI}/schoolpopulation`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async postAcademicPeriod(body) {
    const { data } = await axios.post(`${backendAPI}/academicperiod`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async postGrading(body) {
    const { data } = await axios.post(`${backendAPI}/grading`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async postHealthReport(body) {
    const { data } = await axios.post(`${backendAPI}/healthreport`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getAssignedBus() {
    const { data } = await axios.get(`${backendAPI}/assignedvehicle`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getCommunicationBook() {
    const { data } = await axios.get(`${backendAPI}/communicationbook`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async getSubjectsByClass(class_name) {
    const { data } = await axios.get(`${backendAPI}/subject/${class_name}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async postBusRouting(body) {
    const { data } = await axios.post(`${backendAPI}/busrouting`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${super.getToken()}`,
      },
    });

    return data;
  }

  async assignClass({ staff_id, body }) {
    const { data } = await axios.post(
      `${backendAPI}/assignclass/${staff_id}`,
      body,
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
