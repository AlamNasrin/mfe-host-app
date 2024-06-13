import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props: any){

    const auth = useSelector((state: RootState) => state.auth);

    if(auth.isAuthenticated){
        return props.children;
    }
    else{
        return <Navigate to="/login" />
    }

}

export default ProtectedRoute;