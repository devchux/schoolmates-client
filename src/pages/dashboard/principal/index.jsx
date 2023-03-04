import React from "react";
import { Spinner } from "reactstrap";
import ProfileCard from "../../../components/cards/profile-card";
import PageTitle from "../../../components/common/title";
import { useHome } from "../../../hooks/useHome";

const Principal = () => {
  const { isLoading } = useHome();

  return (
    <div className="teachers">
      <PageTitle> Principal {isLoading && <Spinner />}</PageTitle>
      <ProfileCard type="principal" />
    </div>
  );
};

export default Principal;
