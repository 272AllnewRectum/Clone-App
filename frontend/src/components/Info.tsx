const state = {
    login: {
        topic: "LOGIN",
        step1: "Don't have an account? ",
        step2: 'Register'
    },
    register: {
        topic: "REGISTER",
        step1: "Log in to your account? ",
        step2: "Sign In"
    }
}

interface InfoProps {
  children?: React.ReactNode;
  states?: "login" | "register" 
  onClick?: () => void
}

export const Info: React.FC<InfoProps> = ({ children, onClick , states="login"}) => {
    const theme = state[states]
  return (
    <div className="flex flex-col justify-center text-center font-inter min-h-[65vh] min-w-[50vh]">
      <div className="border border-black/10 shadow-[5.5px_6px_0_#000] rounded-4xl p-9">
        <span className="text-3xl font-bold mt-[4vh]">{theme.topic}</span>
        <div className="flex flex-col justify-center items-center mt-9 gap-3">
          {children}
        </div>
        <div className="font-inter pt-[1vh]">
          <span className="text-[0.8em] font-light">
            {theme.step1}
          </span>
          <span className="text-[0.8em] font-bold cursor-pointer transition-all duration-200 hover:underline" onClick={onClick}>
            {theme.step2}
          </span>
        </div>
      </div>
    </div>
  );
};
