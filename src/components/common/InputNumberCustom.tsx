import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";

interface props {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: any;
  min?: number;
  max?: number;
  maxLength?: number;
  useGrouping ?: boolean;
  isValidate?: boolean;
  disabled?: boolean;
  onChange?: (e: any) => any;
  onBlur?: (e: any) => any;
}

export default function InputNumberCustom({
  label,
  required,
  value,
  min,
  max,
  isValidate,
  placeholder,
  maxLength,
  disabled,
  useGrouping,
  onChange,
  onBlur,
}: props) {
  return (
    <>
      <label className="label-field">
        {label}
        {required && <p className="px-1 text-danger ">*</p>}
      </label>
      <InputNumber
        min={min}
        max={max}
        className={classNames("input-field text-right", {
          "p-invalid": isValidate,
        })}
        useGrouping={useGrouping}
        maxLength={maxLength}
        disabled={disabled}
        value={value}
        onValueChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </>
  );
}
