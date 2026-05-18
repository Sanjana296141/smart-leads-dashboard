interface InputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function Input({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}: InputProps) {

  return (

    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border p-3 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-400"
    />

  );
}

export default Input;