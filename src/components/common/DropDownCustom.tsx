import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";

interface props {
  label?: string;
  required?: boolean;
  placeholder?: string;
  options?: any[];
  value?: any;
  isValidate?: boolean;
  disabled?: boolean;
  className?: string;
  showClear?: boolean;
  onChange?: (e: any) => any;
}

export default function DropDownCustom({
  label,
  required,
  value,
  options,
  isValidate,
  placeholder,
  disabled,
  className,
  showClear,
  onChange,
}: props) {
  return (
    <>
      <label className="label-field">
        {label}
        {required && <p className="px-1 text-danger ">*</p>}
      </label>
      <Dropdown
        value={value}
        onChange={onChange}
        options={options}
        optionLabel="name"
        placeholder={placeholder}
        disabled={disabled}
        className={classNames("input-field w-full", className, {
          "p-invalid": isValidate,
        })}
        showClear={showClear}
        // filter
      />
    </>
  );
}
