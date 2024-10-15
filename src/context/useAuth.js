import {AuthContext} from "./AuthProvider.jsx";
import {useContext} from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};
