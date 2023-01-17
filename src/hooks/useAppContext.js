import { useContext } from "react";
import { NavbarContext } from "../context/navbar";
import { UserContext } from "../context/user";
import APIServies from "../services/api-services";
import { permissions } from "../utils/permissions";

export const useAppContext = (page = "") => {
  const apiServices = new APIServies();
  const { ...userContext } = useContext(UserContext);
  const navbarContext = useContext(NavbarContext);
  const permission =
    page && userContext?.user?.designation_name
      ? permissions[userContext?.user?.designation_name][page]
      : {};

  return { ...userContext, ...navbarContext, apiServices, permission };
};
