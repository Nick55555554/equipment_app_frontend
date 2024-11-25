import { useContext } from "react";
import { AuthContext, authContextType} from "../../context/AuthProvider";
function useAuth(): authContextType{
    return useContext(AuthContext);
    
}
export default useAuth;