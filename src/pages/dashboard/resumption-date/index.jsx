import React, { useEffect } from "react";
import { useForm } from "react-formid";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useAppContext } from "../../../hooks/useAppContext";
import queryKeys from "../../../utils/queryKeys";

const ResumptionDate = () => {
  const { apiServices } = useAppContext();

  const { data, isLoading: getResumptionDateLoading } = useQuery(
    [queryKeys.GET_ACADEMIC_DATE],
    apiServices.getResumptionDate,
    {
      select: (data) => data?.data[0]?.attributes,
      onError: apiServices.errorHandler,
    }
  );

  const { mutate: upload, isLoading: postLoading } = useMutation(
    apiServices.postResumptionDate,
    {
      onSuccess() {
        toast.success("Resumption Date has been updated");
      },
      onError: apiServices.errorHandler,
    }
  );

  const { handleSubmit, setInputs, inputs, errors, getFieldProps } = useForm({
    defaultValues: {
      session_ends: "",
      session_resumes: "",
    },
  });

  const onSubmit = (data) => {
    upload(data);
  };

  const isLoading = getResumptionDateLoading || postLoading;

  useEffect(() => {
    if (data) {
      setInputs({
        ...inputs,
        ...data,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Post Resumption Date"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Sessions Ends"
            hasError={!!errors.session_ends}
            {...getFieldProps("session_ends")}
          />
          {!!errors.session_ends && (
            <p className="error-message">{errors.session_ends}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Sessions Resumes"
            hasError={!!errors.session_resumes}
            {...getFieldProps("session_resumes")}
          />
          {!!errors.session_resumes && (
            <p className="error-message">{errors.session_resumes}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default ResumptionDate;
