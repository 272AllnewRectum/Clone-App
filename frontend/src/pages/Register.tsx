import { Info } from "../components/Info";
import { InputField } from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function Register() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen justify-center items-center">
      <Info states="register" onClick={() => navigate("/login")}>
        <InputField type="text" label="Username" title="Username"></InputField>
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
          <Button text="Register"></Button>
        </div>
      </Info>
    </div>
  );
}
