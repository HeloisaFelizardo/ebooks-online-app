import {AuthContext} from "../context/AuthProvider.jsx";
import {useContext} from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};
