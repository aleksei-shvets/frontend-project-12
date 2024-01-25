import { useContext } from "react";

import AutorizeContext from "../contexts/index.js";

const useAuth = () => useContext(AutorizeContext);

export default useAuth;
