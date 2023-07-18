import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import MainLayout from "./layouts/MainLayouts";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./redux/hooks";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import { auth } from "./firebase/firebase.config";
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  return (
    <>
      <div>
        <MainLayout />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
      </div>
    </>
  );
}

export default App;
