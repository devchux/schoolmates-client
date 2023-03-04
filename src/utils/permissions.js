export const permissions = {
  Superadmin: {
    superAdmin: {
      read: true,
    },
    campus: {
      create: true,
      read: true,
      update: true,
      delete: true,
      statusToggle: true,
    },
    classes: {
      create: false,
      read: true,
      update: false,
      delete: false,
      statusToggle: false,
    },
    departments: {
      create: false,
      read: true,
      update: false,
      delete: false,
      statusToggle: false,
    },
    staffs: {
      create: true,
      read: true,
      readAttendance: true,
      update: true,
      delete: true,
      statusToggle: true,
      sort: true,
    },
    students: {
      create: false,
      read: true,
      readCreditors: true,
      readDebtors: true,
      update: false,
      delete: false,
      statusToggle: false,
      sort: true,
      sortSession: true,
      sortAdmissionNumber: true,
      alumni: true,
      graduateStudent: false,
      readClass: true,
    },
    reports: {
      read: true,
    },
    vehicles: {
      create: false,
      read: true,
      readLogs: true,
      update: false,
      delete: true,
      statusToggle: false,
      sort: true,
    },
    vendors: {
      create: false,
      read: true,
      update: false,
      delete: false,
      statusToggle: false,
      sort: false,
    },
  },
  Teacher: {
    teacher: {
      read: true,
    },
    students: {
      create: false,
      read: true,
      readCreditors: false,
      readDebtors: false,
      update: false,
      delete: false,
      statusToggle: false,
      sort: true,
      sortSession: true,
      sortAdmissionNumber: true,
      myStudents: true,
      alumni: false,
      graduateStudent: false,
      readClass: true,
    },
    results: {
      compute: true,
      view: true,
      preSchool: true,
    },
    attendance: {
      retrieve: true,
      save: true,
    },
    "dress-code": {
      read: true,
    },
  },
  Principal: {
    principal: {
      read: true,
    },
    reports: {
      read: true,
    },
    vehicles: {
      create: false,
      read: true,
      readLogs: true,
      update: false,
      delete: true,
      statusToggle: false,
      sort: true,
    },
    "dress-code": {
      read: true,
    },
    comment: {
      create: true,
    },
    staffs: {
      create: true,
      read: true,
      readAttendance: true,
      update: true,
      delete: true,
      statusToggle: true,
      sort: true,
    },
    students: {
      create: true,
      read: true,
      readCreditors: false,
      readDebtors: false,
      update: true,
      delete: true,
      statusToggle: false,
      sort: true,
      sortSession: true,
      sortAdmissionNumber: true,
      sortStudentByClass: true,
      myStudents: false,
      alumni: true,
      graduateStudent: true,
      readClass: true,
    },
    results: {
      compute: false,
      view: true,
      preSchool: true,
    },
  },
  Student: {
    "student-home": {
      read: true,
    },
    vehicles: {
      create: false,
      read: true,
      readLogs: false,
      update: false,
      delete: false,
    },
    results: {
      compute: false,
      view: true,
      preSchool: true,
    },
    students: {
      create: false,
      read: true,
      readCreditors: false,
      readDebtors: false,
      update: false,
      delete: false,
      statusToggle: false,
      sort: true,
      sortSession: false,
      sortAdmissionNumber: false,
      myStudents: true,
      alumni: false,
      graduateStudent: false,
      readClass: true,
    },
    "dress-code": {
      read: true,
    },
    accounts: {
      canCreate: false,
      sort: true,
      feeHistory: true,
      paymentReciept: true,
      myInvoice: true,
      previousInvoice: true,
    },
  },
  Admin: {
    admin: {
      read: true,
    },

    vehicles: {
      create: false,
      read: true,
      readLogs: false,
      update: false,
      delete: false,
    },
    departments: {
      create: false,
      read: true,
      update: false,
      delete: false,
      statusToggle: false,
    },

    students: {
      create: false,
      read: true,
      readCreditors: false,
      readDebtors: false,
      update: false,
      delete: false,
      statusToggle: false,
      sort: true,
      sortSession: false,
      sortAdmissionNumber: false,
      myStudents: true,
      alumni: false,
      graduateStudent: false,
      readClass: true,
    },
  },
};
