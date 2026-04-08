import { Info } from "../components/Info";
import { InputField } from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useState } from "react";
import { register } from "../hooks/useUser";

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if(!name.trim() || !email.trim() || !password.trim()) return;

        const res = await register({name: name , email: email, password:password});
        console.log(res.data)
        navigate("/")
    }
    return (
    <div className="flex h-screen justify-center items-center">
      <Info states="register" onClick={() => navigate("/login")}>
          <InputField
            type="text"
            label="Username"
            title="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></InputField>
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
            <Button text="Register" onClick={handleSubmit}></Button>
          </div>
      </Info>
    </div>
  );
}
