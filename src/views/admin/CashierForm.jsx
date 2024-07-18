import React, { useState } from "react";
import { Button, Label, TextInput, Select,Spinner } from "flowbite-react";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
import { useNavigate } from "react-router";

const CashierForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { headers } = useAuth();

  //handel cashier register
  const handelRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await instance.post(
        "/register",
        {
          name,
          email,
          gender,
          password,
          confirmPassword,
        },
        { headers }
      );
      if(res.data.auth==true){
        console.log(res.data.message);
        navigate(`/admin/users?message=${res.data.message}`)
      }else{
        setError(res.data)
      }
     
    } catch (e) {
      if (e.response.status === 422) {
        setError(e.response.data.errors);
        console.log(e.response);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handelRegister}>
        <div className="text-center mb-3">
          <h1>Create New Cashier</h1>
        </div>
        <div className="lg:px-20">
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="name1" value="Cashier Name" />
            </div>
            <TextInput
              id="name1"
              type="text"
              placeholder="Enter cashier name ....."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="gender1" value="Gender" />
            </div>
            <Select
              id="gender1"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option>Choose Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </div>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Confirm Password" />
            </div>
            <TextInput
              id="password2"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

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
    </>
  );
};

export default CashierForm;
