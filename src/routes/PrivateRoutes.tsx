/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { Loader } from "../components/Loader";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector(
    (state: { user: any }) => state.user
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
