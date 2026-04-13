import { useAppSelector } from "@/hooks/useAppDispatchSelector";
import { Spin } from "antd";

export const GlobalLoader = () => {
    const authQueries = useAppSelector(state => state.authApi.queries);
    const authMutation = useAppSelector(state => state.authApi.mutations);
    const isFetching = Object.values(authMutation || {}).some((q) => q?.status ==="pending") ||
    Object.values(authQueries || {}).some((q) => q?.status ==="pending");
    
    return isFetching ?  <div className="fixed inset-0 grid place-items-center z-1000 bg-black/30">
        <Spin size="large"/>
    </div> : null
}
