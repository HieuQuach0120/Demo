import { Checkbox } from "primereact/checkbox";
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

export default function CheckboxCustom({
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
      <label className="label-field">
        {label}
        {required && <p className="px-1 text-danger ">*</p>}
      </label>
      <Checkbox
        //  inputId={field.name}
        checked={value}
        // inputRef={field.ref}
        className={classNames("input-field", { "p-invalid": isValidate })}
        onChange={onChange}
        disabled={disabled}
      />

      {/* <InputText
        className={classNames("input-field", { "p-invalid": isValidate })}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
      /> */}
    </>
  );
}
