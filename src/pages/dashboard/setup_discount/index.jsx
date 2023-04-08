import React from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useAppContext } from "../../../hooks/useAppContext";

const DiscountDetail = () => {
  const { apiServices, user } = useAppContext();

  const { isLoading, mutate: createPost } = useMutation(
    apiServices.postSetupDiscount,
    {
      onSuccess() {
        toast.success("Discount has been created");
      },

      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const { handleSubmit, errors, getFieldProps } = useForm({
    defaultValues: {
      value: "",
    },
  });

  const onSubmit = (data) => {
    createPost({
      body: {
        ...data,
        id: user.id,
      },
    });
  };
  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Add Value"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Value"
            hasError={!!errors.value}
            {...getFieldProps("value")}
          />
          {!!errors.value && (
            <p className="error-message">{errors.value}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default DiscountDetail;
