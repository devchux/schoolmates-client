import React from "react";
import { useForm } from "react-formid";
import AuthInput from "../../../components/inputs/auth-input";
import AuthSelect from "../../../components/inputs/auth-select";
import Prompt from "../../../components/modals/prompt";
import PageView from "../../../components/views/table-view";
import { useAppContext } from "../../../hooks/useAppContext";
import { useReports } from "../../../hooks/useReports";

const Debtors = () => {
  const {
    apiServices: { handleSessionChange },
  } = useAppContext();
  const { inputs, handleSubmit, handleChange, errors, setFieldValue, reset } =
    useForm({
      defaultValues: { session: "", type: "debtors", term: "First Term" },
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
    setEnableDebtorsQuery,
    incomeDebtors,
    isLoading,
    setInputData,
    openPrompt,
    togglePrompt,
    indexStatus,
    setIndexStatus,
  } = useReports();

  const onSubmit = (data) => {
    setInputData({
      term: data.term,
      session: data.session,
    });
    if (data.type === "debtors") {
        setEnableDebtorsQuery(true);
    }

    reset();
  };

  const clear = () => setIndexStatus("");

  const data = {
    debtors: incomeDebtors,
  };

  const title = {
    debtors: "Debtors List",
  };

  const commonGroupButtonOptions = [
    {
      title: "Extract Debtor List",
      type: "button",
      onClick: togglePrompt,
      isLoading,
    },
  ];
  const columns = {
    debtors: [
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
        ]
    
  };

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
          isLoading,
          disabled: isLoading,
          onClick: handleSubmit(onSubmit),
        }}
        singleButtonText="Continue"
        promptHeader="Extract Debtor"
      >
        <div className="form-group mb-4">
          <AuthSelect
            label="Type"
            value={inputs.type}
            name="type"
            hasError={!!errors.type}
            onChange={handleChange}
            options={[
              { value: "debtors", title: "Debtors List" },
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

export default Debtors;
