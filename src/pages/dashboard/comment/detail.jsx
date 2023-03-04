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

const CommentDetail = () => {
  const { apiServices, user } = useAppContext();

  const { isLoading, mutate: createPost } = useMutation(
    apiServices.postPrincipalComment,
    {
      onSuccess() {
        toast.success("Comment has been created");
      },

      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const { handleImageChange, filePreview, base64String, fileRef, reset } =
    useFile();

  const { handleSubmit, errors, getFieldProps } = useForm({
    defaultValues: {
      hos_comment: "",
    },
  });

  const onSubmit = (data) => {
    if (!base64String) {
      return toast.error("Signature not provided");
    }
    createPost({
      body: {
        ...data,
        hos_id: user.id,
        signature: base64String,
      },
    });
  };
  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Add Comment"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Comment"
            hasError={!!errors.hos_comment}
            {...getFieldProps("hos_comment")}
          />
          {!!errors.hos_comment && (
            <p className="error-message">{errors.hos_comment}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="file"
            className="px-0"
            wrapperClassName="border-0"
            label="Signature"
            onChange={handleImageChange}
            ref={fileRef}
          />
        </Col>
      </Row>
      <ImagePreview
        src={filePreview}
        centered
        wrapperClassName="my-5"
        reset={reset}
      />
    </DetailView>
  );
};

export default CommentDetail;
