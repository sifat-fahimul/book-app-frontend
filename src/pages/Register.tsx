import { useForm } from "react-hook-form";
import { SignUpFormInputs } from "../types/globalTypes";
import { useAppDispatch } from "../redux/hooks";
import { createUser } from "../redux/features/user/userSlice";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = (data: SignUpFormInputs) => {
    // Handle form submission here
    dispatch(createUser({ email: data.email, password: data.password }));
    toast.success("User created successfully");
    navigate("/");
  };

  return (
    <div>
      <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
        <div className="mx-auto h-full sm:w-max">
          <div className="m-auto  py-12">
            <div className="mt-12 rounded-3xl border light:bg-gray-50 dark:border-gray-700  -mx-6 sm:-mx-10 p-8 sm:p-10">
              <h3 className="text-2xl font-semibold text-center">SignUp </h3>
              

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-10 space-y-8 "
              >
                <div>
                  <div
                    className={`relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-green-400 dark:before:bg-green-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300 ${
                      errors.email ? "before:bg-red-400" : ""
                    }`}
                  >
                    <input
                      type="email"
                      id="email"
                      placeholder="Your email or user name"
                      {...register("email", { required: "Email is required" })}
                      className={`w-full bg-transparent pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none ${
                        errors.email ? "invalid:border-red-400" : ""
                      } transition`}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-400">
                      {/* {errors.email.message} */}
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-end">
                  <div
                    className={`w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-green-400 dark:before:bg-green-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300 ${
                      errors.password ? "before:bg-red-400" : ""
                    }`}
                  >
                    <input
                      type="password"
                      id="password"
                      placeholder="Your password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className={`w-full bg-transparent pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none ${
                        errors.password ? "invalid:border-red-400" : ""
                      } transition`}
                    />
                  </div>
                  {errors.password && (
                    <span className="text-red-400">
                      {/* {errors.password.message} */}
                    </span>
                  )}
                  <button type="reset" className="-mr-3 w-max p-3">
                    <span className="text-sm tracking-wide text-red-600 dark:text-red-400">
                      Forgot password ?
                    </span>
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-green-500 dark:bg-green-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-green-600 focus:bg-green-600 active:bg-green-800"
                  >
                    <span className="text-base font-semibold text-white dark:text-gray-900">
                      SignUp
                    </span>
                  </button>
                  <button type="reset" className="-ml-3 w-max p-3">
                    <span className="text-sm tracking-wide text-green-600 dark:text-green-400">
                    
                      <Link to="/login">  Already have an account? Login</Link>
                    </span>
                  </button>
                </div>
              </form>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
