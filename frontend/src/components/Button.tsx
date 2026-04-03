interface ButtonProps {
  text?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text = "Click me!", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
      relative isolate
      px-[10vh] py-[1vh]
      rounded-[15px]
      bg-[#e8e8e8]
      text-[#212121]
      font-[1000]
      text-[17px]
      overflow-hidden
      transition-all duration-[250ms]
      before:content-['']
      before:absolute
      before:top-0
      before:left-0
      before:h-full
      before:w-0
      before:rounded-[15px]
      before:bg-[#212121]
      before:-z-10
      before:transition-all
      before:duration-[250ms]

      hover:text-[#e8e8e8]
      hover:before:w-full
      cursor-pointer
      "
    >
      {text}
    </button>
  );
};