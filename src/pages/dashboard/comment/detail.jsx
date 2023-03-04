import React from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useAppContext } from "../../../hooks/useAppContext";

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

  const { handleSubmit, errors, getFieldProps } = useForm({
    defaultValues: {
      hos_comment: "",
    },
  });

  const onSubmit = (data) => {
    createPost({
      body: {
        ...data,
        hos_id: user.id,
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
      </Row>
    </DetailView>
  );
};

export default CommentDetail;
