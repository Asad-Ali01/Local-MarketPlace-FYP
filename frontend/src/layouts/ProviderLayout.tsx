import { useGetMyGigsApiQuery } from "@/features/gig/gigApi";
import ProviderDashboardPage from "@/modules/provider/pages/ProviderDashboardPage";

import { Navigate, Outlet, useLocation } from "react-router"


function ProviderLayout() {

    const {data,isLoading} = useGetMyGigsApiQuery();
const location = useLocation();

console.log(location.pathname);
  console.log(data?.data.hasGigs);
    if(isLoading){
      return <div>Loading</div>
    }
 
  if (data?.data?.hasGigs && location.pathname !== "/provider/dashboard") {
    return <Navigate to="/provider/dashboard" replace />;
  }


 return <Outlet/>
 
}

export default ProviderLayout