export const getColumns = ({ indexStatus }) => {
  switch (indexStatus) {
    case "all":
      return [
        {
          Header: "",
          accessor: "image",
        },
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "First Name",
          accessor: "firstname",
        },
        {
          Header: "Surname",
          accessor: "surname",
        },
        {
          Header: "Middle Name",
          accessor: "middlename",
        },
        {
          Header: "Phone Number",
          accessor: "phone_number",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Admission Number",
          accessor: "admission_number",
        },
        {
          Header: "Present Class",
          accessor: "present_class",
        },
        {
          Header: "Gender",
          accessor: "gender",
        },
      ];
    case "alumni":
      return [
        {
          Header: "",
          accessor: "image",
        },
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "First Name",
          accessor: "firstname",
        },
        {
          Header: "Surname",
          accessor: "surname",
        },
        {
          Header: "Middle Name",
          accessor: "middlename",
        },
        {
          Header: "Phone Number",
          accessor: "phone_number",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Admission Number",
          accessor: "admission_number",
        },
        {
          Header: "Present Class",
          accessor: "present_class",
        },
        {
          Header: "Gender",
          accessor: "gender",
        },
      ];

    case "myStudents":
      return [
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "First Name",
          accessor: "firstname",
        },
        {
          Header: "Surname",
          accessor: "surname",
        },
        {
          Header: "Middle Name",
          accessor: "middlename",
        },
        {
          Header: "Phone Number",
          accessor: "phone_number",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Admission Number",
          accessor: "admission_number",
        },
        {
          Header: "Present Class",
          accessor: "present_class",
        },
        {
          Header: "Gender",
          accessor: "gender",
        },
      ];

    case "loginDetails":
      return [
        {
          Header: "First Name",
          accessor: "firstname",
        },
        {
          Header: "Surname",
          accessor: "surname",
        },
        {
          Header: "Middle Name",
          accessor: "middlename",
        },
        {
          Header: "Admission Number",
          accessor: "admission_number",
        },
        {
          Header: "Present Class",
          accessor: "present_class",
        },
        {
          Header: "Password",
          accessor: "pass_word",
        },
      ];

    case "communication":
      return [
        {
          Header: "Campus",
          accessor: "campus",
        },
        {
          Header: "Period",
          accessor: "period",
        },
        {
          Header: "Term",
          accessor: "term",
        },
        {
          Header: "Session",
          accessor: "session",
        },
        {
          Header: "Title",
          accessor: "title",
        },
        {
          Header: "Urgency",
          accessor: "urgency",
        },
        {
          Header: "Admission Number",
          accessor: "admission_number",
        },
        {
          Header: "Message",
          accessor: "message",
        },
        {
          Header: "Sender",
          accessor: "sender",
        },
        {
          Header: "Status",
          accessor: "status",
        },
      ];

    default:
      return [
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Full Name",
          accessor: "student_fullname",
        },
        {
          Header: "Amount Due",
          accessor: "amount_due",
        },
        {
          Header: "Amount Paid",
          accessor: "amount_paid",
        },
        {
          Header: "Total Amount",
          accessor: "total_amount",
        },
        {
          Header: "Session",
          accessor: "session",
        },
        {
          Header: "Term",
          accessor: "term",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Account Name",
          accessor: "account_name",
        },
        {
          Header: "Bank Name",
          accessor: "bank_name",
        },
        {
          Header: "Payment Method",
          accessor: "payment_method",
        },
        {
          Header: "Remark",
          accessor: "remark",
        },
      ];
  }
};

export const getStudentColumns = ({ indexStatus }) => {
  switch (indexStatus) {
    case "all":
      return [
        {
          Header: "",
          accessor: "image",
        },
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "First Name",
          accessor: "firstname",
        },
        {
          Header: "Surname",
          accessor: "surname",
        },
        {
          Header: "Middle Name",
          accessor: "middlename",
        },
        {
          Header: "Present Class",
          accessor: "present_class",
        },
        {
          Header: "Gender",
          accessor: "gender",
        },
      ];

    case "myStudents":
      return [
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "First Name",
          accessor: "firstname",
        },
        {
          Header: "Surname",
          accessor: "surname",
        },
        {
          Header: "Middle Name",
          accessor: "middlename",
        },
        {
          Header: "Present Class",
          accessor: "present_class",
        },
      ];

    case "communication":
      return [
        {
          Header: "Campus",
          accessor: "campus",
        },
        {
          Header: "Period",
          accessor: "period",
        },
        {
          Header: "Term",
          accessor: "term",
        },
        {
          Header: "Session",
          accessor: "session",
        },
        {
          Header: "Title",
          accessor: "title",
        },
        {
          Header: "Urgency",
          accessor: "urgency",
        },
        {
          Header: "Admission Number",
          accessor: "admission_number",
        },
        {
          Header: "Message",
          accessor: "message",
        },
        {
          Header: "Sender",
          accessor: "sender",
        },
        {
          Header: "Status",
          accessor: "status",
        },
      ];

    default:
      return [
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Full Name",
          accessor: "student_fullname",
        },
        {
          Header: "Amount Due",
          accessor: "amount_due",
        },
        {
          Header: "Amount Paid",
          accessor: "amount_paid",
        },
        {
          Header: "Total Amount",
          accessor: "total_amount",
        },
        {
          Header: "Session",
          accessor: "session",
        },
        {
          Header: "Term",
          accessor: "term",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Account Name",
          accessor: "account_name",
        },
        {
          Header: "Bank Name",
          accessor: "bank_name",
        },
        {
          Header: "Payment Method",
          accessor: "payment_method",
        },
        {
          Header: "Remark",
          accessor: "remark",
        },
      ];
  }
};

export const setVariant = ({ status, indexStatus }) => {
  return indexStatus !== status ? "outline" : null;
};

export const getSortButtonOptions = ({
  permission,
  setIndexStatus,
  user,
  indexStatus,
}) => {
  let arr = [];

  if (permission?.read) {
    arr.push({
      title: "All",
      type: "button",
      onClick: () => setIndexStatus("all"),
      variant: setVariant({ status: "all", indexStatus }),
    });
  }
  if (permission?.readCreditors) {
    arr.push({
      title: "Creditors",
      type: "button",
      onClick: () => setIndexStatus("creditors"),
      variant: setVariant({ status: "creditors", indexStatus }),
    });
  }

  if (permission?.readDebtors) {
    arr.push({
      title: "Debtors",
      type: "button",
      onClick: () => setIndexStatus("debtors"),
      variant: setVariant({ status: "debtors", indexStatus }),
    });
  }

  if (permission?.myStudents) {
    arr.push({
      title: user?.designation_name === "Student" ? "My Class" : "My Students",
      type: "button",
      onClick: () => setIndexStatus("myStudents"),
      variant: setVariant({ status: "myStudents", indexStatus }),
    });
  }

  if (permission?.alumni) {
    arr.push({
      title: "Alumni",
      type: "button",
      onClick: () => setIndexStatus("alumni"),
      variant: setVariant({ status: "alumni", indexStatus }),
    });
  }

  if (permission?.communication) {
    arr.push({
      title: "Communication Book",
      type: "button",
      onClick: () => setIndexStatus("communication"),
      variant: setVariant({ status: "communication", indexStatus }),
    });
  }

  if (permission?.studentLoginDetails) {
    arr.push({
      title: "Login Details",
      type: "button",
      onClick: () => setIndexStatus("loginDetails"),
      variant: setVariant({ status: "loginDetails", indexStatus }),
    });
  }

  return arr.length ? arr : undefined;
};

export const getActionOptions = ({ permission, navigate }) => {
  const arr = [];

  if (permission?.promote) {
    arr.push({
      title: "Promote",
      onClick: (id) => navigate(`/app/students/promote/${id}`),
    });
  }

  if (permission?.transfer) {
    arr.push({
      title: "Transfer",
      onClick: (id) => navigate(`/app/students/transfer/${id}`),
    });
  }

  if (permission?.invoice) {
    arr.push({
      title: "Create Invoice",
      onClick: (id) => navigate(`/app/students/invoice/${id}`),
    });
  }

  if (permission?.payment) {
    arr.push({
      title: "Register Payment",
      onClick: (id) => navigate(`/app/payment/${id}`),
    });
  }

  if (permission["health-report"]) {
    arr.push({
      title: "Health Report",
      onClick: (id) => navigate(`/app/students/health-report/${id}`),
    });
  }

  if (permission["bus-routing"]) {
    arr.push({
      title: "Bus Routing",
      onClick: (id) => navigate(`/app/students/bus-routing/${id}`),
    });
  }

  if (permission["create-communication"]) {
    arr.push({
      title: "Communication Book",
      onClick: (id) => navigate(`/app/students/communication/${id}`),
    });
  }

  return arr.length ? arr : undefined;
};

export const searchPlaceholder = {
  session: "Sort by session (2021/2022)",
  "admission-number": "Enter Admission Number",
  class: "Select Class",
};
