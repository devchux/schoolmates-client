import React from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import ImagePreview from "../../../components/common/image-preview";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useAppContext } from "../../../hooks/useAppContext";
import { useFile } from "../../../hooks/useFile";

const CalendarDetail = () => {
  const { apiServices } = useAppContext();
  const {
    base64String,
    handleImageChange,
    filePreview,
    reset: resetFile,
    fileRef,
  } = useFile();
  const { handleSubmit, errors, getFieldProps } = useForm({
    defaultValues: {
      title: "",
      description: "",
      file: "",
    },
    validation: {
      title: { required: true },
      description: { required: true },
    },
  });

  const { isLoading, mutate: postCalendar } = useMutation(
    apiServices.addAcademicCalender,
    {
      onSuccess() {
        toast.success("Academic calendar has been uploaded");
      },
      onError: apiServices.errorHandler,
    }
  );

  const onSubmit = (data) => {
    postCalendar({ ...data, file: base64String });
  };
  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Post Calendar"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Title"
            hasError={!!errors.title}
            {...getFieldProps("title")}
          />
          {!!errors.title && <p className="error-message">{errors.title}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <Col sm="6" className="mb-4 mb-sm-0">
            <AuthInput
              type="file"
              className="px-0"
              wrapperClassName="border-0"
              label="Profile Image"
              onChange={handleImageChange}
              ref={fileRef}
            />
          </Col>
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <label className="mb-2">Description</label>
          <textarea
            className="form-control"
            rows="5"
            {...getFieldProps("description")}
          />
          {!!errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </Col>
      </Row>
      <ImagePreview
        src={filePreview}
        centered
        wrapperClassName="my-5"
        reset={resetFile}
      />
    </DetailView>
  );
};

export default CalendarDetail;
