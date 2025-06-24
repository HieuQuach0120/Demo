import { Password } from "primereact/password";
import { classNames } from "primereact/utils";

interface props {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: any;
  isValidate?: boolean;
  maxLength?: number;
  disabled?: boolean;
  onChange?: (e: any) => any;
  onBlur?: (e: any) => any;
}

export default function PasswordCustom({
  label,
  required,
  value,
  placeholder,
  isValidate,
  maxLength,
  disabled,
  onChange,
  onBlur
}: props) {
  return (
    <>
      <label className="label-field">
        {label}
        {required && <p className="px-1 text-danger ">*</p>}
      </label>
      <Password
        className={classNames("input-field", { "p-invalid": isValidate })}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        toggleMask
        feedback={false}
      />
    </>
  );
}
