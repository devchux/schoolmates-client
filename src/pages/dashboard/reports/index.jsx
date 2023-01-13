import React from "react";
import { useForm } from "react-formid";
import AuthInput from "../../../components/inputs/auth-input";
import AuthSelect from "../../../components/inputs/auth-select";
import Prompt from "../../../components/modals/prompt";
import PageView from "../../../components/views/table-view";
import { useAppContext } from "../../../hooks/useAppContext";
import { useReports } from "../../../hooks/useReports";

const Reports = () => {
  const {
    apiServices: { handleSessionChange },
  } = useAppContext();
  const { inputs, handleSubmit, handleChange, errors, setFieldValue, reset } =
    useForm({
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
    incomeReports,
    isLoading,
    setInputData,
    expensesReports,
    openPrompt,
    togglePrompt,
    indexStatus,
    setIndexStatus,
  } = useReports();

  console.log(expensesReports, incomeReports);

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
    reset();
  };

  const clear = () => setIndexStatus("");

  const data = {
    income: incomeReports,
    expense: expensesReports,
  };

  const title = {
    income: "Income Reports",
    expense: "Expenses Reports",
  };

  const commonGroupButtonOptions = [
    {
      title: "Generate Report",
      type: "button",
      onClick: togglePrompt,
      isLoading,
    },
  ];

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
        columns={[
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
        ]}
        data={data[indexStatus]}
      />
      <Prompt
        isOpen={openPrompt}
        toggle={togglePrompt}
        singleButtonProps={{
          type: "button",
          isLoading,
          disabled: isLoading,
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
          <AuthInput
            label="Session"
            placeholder="2021/2022"
            hasError={!!errors.session}
            value={inputs.session}
            onChange={({ target: { value } }) =>
              handleSessionChange(value, "session", setFieldValue)
            }
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
