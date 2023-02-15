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
  },
};
