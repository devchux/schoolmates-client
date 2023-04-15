import React from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useAppContext } from "../../../hooks/useAppContext";
import AuthSelect from "../../../components/inputs/auth-select";

const ChartAccountDetail = () => {
  const { apiServices, user } = useAppContext();

  const { isLoading, mutate: ChartAccountPost } = useMutation(
    apiServices.postChartAccount,
    {
      onSuccess() {
        toast.success("Chart Account has been created");
      },

      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const { handleSubmit, errors, getFieldProps, inputs, handleChange } = useForm(
    {
      defaultValues: {
        name: "",
        acct_type: "",
      },
    }
  );

  const onSubmit = (data) => {
    ChartAccountPost({
      body: {
        ...data,
        id: user.id,
      },
    });
  };
  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Create Chart of Account"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Account Name"
            hasError={!!errors.name}
            {...getFieldProps("name")}
          />
          {!!errors.name && <p className="error-message">{errors.name}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Account Type"
            hasError={!!errors.acct_type}
            {...getFieldProps("acct_type")}
          />
          <AuthSelect
            label="Account Type"
            value={inputs.acct_type}
            name="acct_type"
            hasError={!!errors.acct_type}
            onChange={handleChange}
            options={[
              { value: "Income", title: "Income" },
              { value: "Expense", title: "Expense" },
            ]}
          />
          {!!errors.acct_type && (
            <p className="error-message">{errors.acct_type}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default ChartAccountDetail;
