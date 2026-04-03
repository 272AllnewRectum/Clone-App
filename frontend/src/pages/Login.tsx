import { Info } from "../components/Info";
import { InputField } from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function Login() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen justify-center items-center">
      <Info states="login" onClick={() => navigate("/register")}>
        <InputField
          type="email"
          label="Email"
          title="Email Adress"
        ></InputField>
        <InputField
          type="password"
          label="Password"
          title="Password"
        ></InputField>
        <div className="pt-[3vh]">
        <Button text="Login"></Button>
        </div>
      </Info>
    </div>
  );
}
