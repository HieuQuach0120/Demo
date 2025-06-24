import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

interface props {
  label?: string;
  placeholder?: string;
  value?: any;
  rows?: number;
  maxLength?: number;
  isValidate?: boolean;
  disabled?: boolean;
  required?: boolean;

  onChange?: (e: any) => any;
}

export default function InputTextareaCustom({
  label,
  value,
  placeholder,
  isValidate,
  rows,
  disabled,
  required,
  maxLength,
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
      <InputTextarea
        className={classNames("input-field", { "p-invalid": isValidate })}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
      />
    </>
  );
}
