import { classNames } from "primereact/utils";
import { AutoComplete } from "primereact/autocomplete";
interface props {
  label?: string;
  placeholder?: string;
  suggestions?: any[];
  value?: any;
  isValidate?: boolean;
  disabled?: boolean;
  onChange?: (e: any) => any;
  onSearch?: (e: any) => any;
}

export default function AutoCompleteCustom({
  label,
  value,
  suggestions,
  isValidate,
  placeholder,
  disabled,
  onChange,
  onSearch,
}: props) {
  return (
    <>
      <label className="label-field">{label}</label>

      <AutoComplete
        value={value}
        suggestions={suggestions}
        completeMethod={onSearch}
        onChange={onChange}
        dropdown
        placeholder={placeholder}
        disabled={disabled}
        className={classNames("input-field w-full", {
          "p-invalid": isValidate,
        })}
        field={"name"}
      />
    </>
  );
}

// ví dụ

/* <AutoCompleteCustom
    label="Game"
    value={field.value}
    suggestions={items}
    onSearch={handleSearchGame}
    onChange={field.onChange}
  ></AutoCompleteCustom> */
