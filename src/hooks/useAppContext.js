import { useContext } from "react";
import { NavbarContext } from "../context/navbar";
import { UserContext } from "../context/user";
import APIServies from "../services/api-services";

export const useAppContext = () => {
  const apiServices = new APIServies();
  const {...userContext} = useContext(UserContext);
  const navbarContext = useContext(NavbarContext);

  return { ...userContext, ...navbarContext, apiServices };
};
