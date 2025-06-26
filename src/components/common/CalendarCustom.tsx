import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";

interface props {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: any;
  minDate?: any;
  maxDate?: any;
  isValidate?: boolean;
  disabled?: boolean;
  required?: boolean;
  viewDate?: any;
  onChange?: (e: any) => any;
}

export default function CalendarCustom({
  id,
  label,
  required,
  value,
  maxDate,
  minDate,
  isValidate,
  disabled,
  placeholder,
  viewDate,
  onChange,
}: props) {
  return (
    <>
      <label className="label-field">
        {label}
        {required && <p className="px-1 text-danger ">*</p>}
      </label>
      <Calendar
        id={id}
        className={classNames("input-field", { "p-invalid": isValidate })}
        value={value}
        onChange={onChange}
        dateFormat="dd/mm/yy"
        maxDate={maxDate}
        minDate={minDate}
        disabled={disabled}
        showIcon={!disabled}
        showOnFocus={false}
        viewDate={viewDate}
      />
    </>
  );
}
