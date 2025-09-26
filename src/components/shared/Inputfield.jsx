export const Inputfield = ({
  label,
  name,
  register,
  rules = {},
  errors,
  type = "text",
  placeholder = "",
  className = "",
  ...rest
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition
          ${errors?.[name] ? "border-red-500" : "border-gray-300"}
          bg-white text-gray-900`}
        {...register(name, rules)}
        {...rest}
      />
      <div className="h-5 mt-1">
        {errors?.[name] && (
          <span className="ml-1 text-sm text-red-500">
            {errors[name].message || "Este campo es obligatorio"}
          </span>
        )}
      </div>
    </div>
  );
};
