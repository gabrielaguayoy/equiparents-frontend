// src/app/components/Input.js

const Input = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  autoComplete,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
      />
    </>
  );
};

export default Input;
