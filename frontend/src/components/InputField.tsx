interface InputFieldProps {
  label: string;
  title: string;
  type?: "text" | "email" | "password";
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  title,
  type = "text",
}) => {
  return (
    <div className="font-inter max-w-[30vh] ">
      <span className="flex justify-start font-light mb-[0.5dvh] pl-[2dvh] text-[0.8em] tracking-[0.05em] ">
        {label}
      </span>
      <input
        type={type}
        placeholder={title}
        className="w-full p-[0.875rem] text-[0.8rem] border-[1.5px] border-black rounded-lg shadow-[2.5px_3px_0_#000] outline-none transition-all duration-200 focus:shadow-[5.5px_7px_0_#000] "
      />
    </div>
  );
};
