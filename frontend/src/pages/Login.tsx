import { useState } from "react";
import { Info } from "../components/Info";
import { InputField } from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { login } from "../hooks/useUser";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) return;
    try {
      const res = await login({ email: email, password: password });

      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      console.log("Login Success!", res.data);
      navigate("/board");
    } catch (error: any) {
      console.log("Login Failed!", error.response?.data || error.message);
      alert("Wrong Email or Password!");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Info states="login" onClick={() => navigate("/register")}>
        <InputField
          type="email"
          label="Email"
          title="Email Adress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></InputField>
        <InputField
          type="password"
          label="Password"
          title="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></InputField>
        <div className="pt-[3vh]">
          <Button text="Login" onClick={handleSubmit}></Button>
        </div>
      </Info>
    </div>
  );
}
