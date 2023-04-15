import React from "react";
import { useForm } from "react-formid";
import AuthSelect from "../../../components/inputs/auth-select";
import Prompt from "../../../components/modals/prompt";
import PageView from "../../../components/views/table-view";
import { useAcademicSession } from "../../../hooks/useAcademicSession";
import { useReports } from "../../../hooks/useReports";

const Reports = () => {
  const { inputs, handleSubmit, handleChange, errors, reset } = useForm({
    defaultValues: { session: "", type: "income", term: "First Term" },
    validation: {
      session: {
        required: true,
      },
      type: {
        required: true,
      },
      term: {
        required: true,
      },
    },
  });
  const {
    setEnableIncomeQuery,
    setEnableExpensesQuery,
    setEnableInvoicesQuery,
    incomeReports,
    isLoading,
    setInputData,
    expensesReports,
    invoiceReports,
    openPrompt,
    togglePrompt,
    indexStatus,
    setIndexStatus,
  } = useReports();

  const { isLoading: loadingSessions, data: sessions } = useAcademicSession();

  const onSubmit = (data) => {
    setInputData({
      term: data.term,
      session: data.session,
    });
    if (data.type === "income") {
      setEnableIncomeQuery(true);
    }

    if (data.type === "expense") {
      setEnableExpensesQuery(true);
    }
    if (data.type === "invoice") {
      setEnableInvoicesQuery(true);
    }

    if (data.type === "bank") {
      setEnableExpensesQuery(true);
    }
    // if (data.type === "salaries") {
    //   setEnableIncomeQuery(true);
    // }
    reset();
  };

  const clear = () => setIndexStatus("");

  const data = {
    income: incomeReports,
    expense: expensesReports,
    invoice: invoiceReports,
  };

  const title = {
    income: "Income Reports",
    expense: "Expenses Reports",
    invoice: "Invoices Reports",
    Salary: "Salaries Reports",
    bank: "Bank Reports",
  };

  const commonGroupButtonOptions = [
    {
      title: "Generate Report",
      type: "button",
      onClick: togglePrompt,
      isLoading,
    },
  ];

  const columns = {
    income: [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Students",
        accessor: "student_fullname",
      },
      {
        Header: "Amount Paid",
        accessor: "amount_paid",
      },
      {
        Header: "Created At",
        accessor: "created_at",
      },
    ],
    expense: [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Transaction ID",
        accessor: "transaction_id",
      },
      {
        Header: "Account Name",
        accessor: "account_name",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Bank Name",
        accessor: "bank_name",
      },
      {
        Header: "beneficiary",
        accessor: "beneficiary",
      },
      {
        Header: "Expense Category",
        accessor: "expense_category",
      },
      {
        Header: "Payment Type",
        accessor: "payment_type",
      },
      {
        Header: "Purpose",
        accessor: "purpose",
      },
      {
        Header: "Session",
        accessor: "session",
      },
      {
        Header: "term",
        accessor: "term",
      },
      {
        Header: "Date Created",
        accessor: "created_at",
      },
      {
        Header: "Date Updated",
        accessor: "updated_at",
      },
    ],
    invoice: [
      {
        Header: "id",
        accessor: "student_id",
      },
      {
        Header: "Admission Number",
        accessor: "admission_number",
      },
      {
        Header: "Full Name",
        accessor: "fullname",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Class",
        accessor: "class",
      },
      {
        Header: "Fee Type",
        accessor: "feetype",
      },
      {
        Header: "Session",
        accessor: "session",
      },
      {
        Header: "term",
        accessor: "term",
      },
      {
        Header: "Discount",
        accessor: "discount",
      },
      {
        Header: "Discount Amount",
        accessor: "discount_amount",
      },
    ],
  };

  console.log(indexStatus)
  
  return (
    <div>
      <PageView
        hasSortOptions
        pageTitle={title[indexStatus]}
        showTableTitle={!!indexStatus}
        showIllustration={!indexStatus}
        hideTable={!indexStatus}
        groupedButtonOptions={
          indexStatus
            ? [
                ...commonGroupButtonOptions,
                {
                  title: "Clear",
                  variant: "dark",
                  type: "button",
                  onClick: clear,
                  isLoading,
                },
              ]
            : commonGroupButtonOptions
        }
        canCreate={false}
        isLoading={false}
        columns={columns[indexStatus]}
        data={data[indexStatus]}
      />
      <Prompt
        isOpen={openPrompt}
        toggle={togglePrompt}
        singleButtonProps={{
          type: "button",
          isLoading: isLoading || loadingSessions,
          disabled: isLoading || loadingSessions,
          onClick: handleSubmit(onSubmit),
        }}
        singleButtonText="Continue"
        promptHeader="Generate Report"
      >
        <div className="form-group mb-4">
          <AuthSelect
            label="Type"
            value={inputs.type}
            name="type"
            hasError={!!errors.type}
            onChange={handleChange}
            options={[
              { value: "income", title: "Income Report" },
              { value: "expense", title: "Expenses Report" },
              { value: "bank", title: "Bank Report" },
              // { value: "salary", title: "Salaries Report" },
              { value: "invoice", title: "Invoices Report" },
            ]}
          />
          {!!errors.term && <p className="error-message">{errors.term}</p>}
        </div>
        <div className="form-group mb-4">
          <AuthSelect
            label="Term"
            value={inputs.term}
            name="term"
            hasError={!!errors.term}
            onChange={handleChange}
            options={[
              { value: "First Term", title: "First Term" },
              { value: "Second Term", title: "Second Term" },
              { value: "Third Term", title: "Third Term" },
            ]}
          />
          {!!errors.term && <p className="error-message">{errors.term}</p>}
        </div>
        <div className="form-group mb-4">
          <AuthSelect
            label="Session"
            value={inputs.session}
            name="session"
            hasError={!!errors.session}
            onChange={handleChange}
            options={(sessions || [])?.map((session) => ({
              value: session?.academic_session,
              title: session?.academic_session,
            }))}
          />
          {!!errors.session && (
            <p className="error-message">{errors.session}</p>
          )}
        </div>
      </Prompt>
    </div>
  );
};

export default Reports;
