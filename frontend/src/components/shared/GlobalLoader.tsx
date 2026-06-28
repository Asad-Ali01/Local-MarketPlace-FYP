import { useAppSelector } from "@/hooks/useAppDispatchSelector";
import { Spin } from "antd";

export const GlobalLoader = () => {
  const authQueries = useAppSelector((state) => state.authApi.queries);
  const authMutation = useAppSelector((state) => state.authApi.mutations);

  const gigQueries = useAppSelector((state) => state.gigApi.queries);
  const gigMutation = useAppSelector((state) => state.gigApi.mutations);

  const otpQueries = useAppSelector((state) => state.otpApi.queries);
  const otpMutation = useAppSelector((state) => state.otpApi.mutations);

  const adminQueries = useAppSelector((state) => state.adminApi.queries);
  const adminMutation = useAppSelector((state) => state.adminApi.mutations);

  const isFetching =
    Object.values(authMutation || {}).some((q) => q?.status === "pending") ||
    Object.values(authQueries || {}).some((q) => q?.status === "pending") ||
    Object.values(gigQueries || {}).some((q) => q?.status === "pending") ||
    Object.values(gigMutation || {}).some((q) => q?.status === "pending") ||
    Object.values(otpQueries || {}).some((q) => q?.status === "pending") ||
    Object.values(otpMutation || {}).some((q) => q?.status === "pending") ||
    Object.values(adminQueries || {}).some((q) => q?.status === "pending") ||
    Object.values(adminMutation || {}).some((q) => q?.status === "pending") ;
    
    ;

  return isFetching ? (
    <div className="fixed inset-0 grid place-items-center z-1000 bg-black/30">
      <Spin size="large" />
    </div>
  ) : null;
};
