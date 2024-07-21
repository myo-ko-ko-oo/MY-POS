import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput, Spinner } from "flowbite-react";
import instance from "../services/api/axios";
import { useNavigate } from "react-router";
import { useAuth } from "../services/provider/AuthContextProvider";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth, setAuthUser } = useAuth();
console.log(error);
  //handel login
  const handelLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await instance.post("/login", { email, password });

      if (res.data.auth == true) {
        localStorage.setItem("token", res.data.token);
        setAuth(res.data.auth);

        const verify = await instance.get("/verify", {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        });

        setAuth(verify.data.auth);
        setAuthUser(verify.data.user);
        setEmail("");
        setPassword("");
        if (verify.data.user.role == "admin") {
          navigate("/admin/dashboard");
        } else if (verify.data.user.role == "cashier") {
          navigate("/cashier/home");
        }
      } else {
        setError(res.data);
      }
    } catch (e) {
      setError(e.response);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-full mt-5 md:mt-0">
        <form onSubmit={handelLogin} className="flex  flex-col gap-4">
          <div className="title-content text-center  mb-4">
            <h2>Login</h2>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <div className="error-massage mt-1">
                <small className="text-red-600 font-semibold">
                  {error.email}
                </small>
              </div>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div className="error-massage mt-1">
                <small className="text-red-600 font-semibold">
                  {error.password}
                </small>
              </div>
            )}
          </div>
          <div className="mt-4">
            {loading == true ? (
              <>
                <Button type="submit" color="blue" className="w-full ">
                  <Spinner
                    color="info"
                    className="me-2"
                    aria-label="Info spinner example"
                  />
                  Submit
                </Button>
              </>
            ) : (
              <>
                <Button type="submit" color="blue" className="w-full">
                  Submit
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
