import { InputText } from "primereact/inputtext";
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
}

export default function InputTextCustom({
  label,
  required,
  value,
  placeholder,
  isValidate,
  maxLength,
  disabled,
  onChange,
}: props) {
  return (
    <>
      {label &&
        <label className="label-field">
          {label}
          {required && <p className="px-1 text-danger ">*</p>}
        </label>
      }
      <InputText
        className={classNames("input-field", { "p-invalid": isValidate })}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
      />
    </>
  );
}
