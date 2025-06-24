import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { classNames } from "primereact/utils";

interface Category {
  name: string;
  key: string;
}

interface props {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: any;
  isValidate?: boolean;
  maxLength?: number;
  disabled?: boolean;
  categories: Category[];
  onChange?: (e: any) => any;
}

export default function RadioCustom({
  label,
  required,
  categories,
  value,
  placeholder,
  isValidate,
  maxLength,
  disabled,
  onChange,
}: props) {
  console.log("value>>>>>>>>", value);

  return (
    <>
      <label className="label-field">
        {label}
        {required && <p className="px-1 text-danger ">*</p>}
      </label>
      <div className="radio-class">
        {categories?.map((category) => {
          return (
            <div key={category.key} className="flex align-items-center radio-custom">
              <RadioButton
                inputId={category.key}
                name="category"
                value={category.key}
                onChange={onChange}
                disabled={disabled}
                checked={value === category.key}
              />
              <label htmlFor={category.key} className="ml-2">
                {category.name}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
