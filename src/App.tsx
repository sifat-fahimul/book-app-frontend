import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./redux/hooks";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import { auth } from "./firebase/firebase.config";
import MainLayout from "./layouts/MainLayouts";
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
        <Toaster position="top-right" reverseOrder={false}></Toaster>
      </div>
    </>
  );
}

export default App;
