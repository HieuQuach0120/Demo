// import { Column } from "primereact/column";
// import { DataTable } from "primereact/datatable";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { classNames } from "primereact/utils";
// import { useEffect, useState } from "react";
// import { Partner } from "../../models/Partner";
// import { getDetailPartner, searchPartner } from "../../service/PartnerService";

// interface props {
//   label?: string;
//   required?: boolean;
//   placeholder?: string;
//   valueDefault?: number;
//   isValidate?: boolean;
//   disabled?: boolean;
//   onSelectChange: (e: any) => any;
// }

// export default function DataPickerPartner({
//   label,
//   required,
//   isValidate,
//   valueDefault,
//   disabled,
//   placeholder,
//   onSelectChange,
// }: props) {
//   const [selectPartner, setSelectPartner] = useState<Partner>();
//   const [visible, setVisible] = useState(false);
//   const [items, setItems] = useState<Partner[]>([]);
//   useEffect(() => {
//     handleSearchGame("");
//     if (valueDefault) {
//       handleGetDetailPartner(valueDefault);
//     }
//   }, []);

//   const handleGetDetailPartner = async (id: number) => {
//     const res = await getDetailPartner(id);
//     setSelectPartner(res);
//   };

//   const handleSearchGame = async (event: any) => {
//     const _param = {
//       limit: 6,
//       offset: 0,
//       name: event.query,
//     };
//     const res = await searchPartner(_param);
//     setItems(res.data[0]);
//   };
//   const hanldSelectChange = (e: any) => {
//     onSelectChange(e.value);
//     setSelectPartner(e.value);
//     setVisible(false);
//   };

//   const hanldClear = () => {
//     setSelectPartner({ name: "" });
//     onSelectChange({ id: null });
//   };
//   const bodyLogo = (partner: Partner) => {
//     return (
//       <div className="body-logo-partner">
//         <img src={partner.pathLogo} />
//       </div>
//     );
//   };

//   return (
//     <>
//       <label className="label-field">
//         {label}
//         {required && <p className="px-1 text-danger ">*</p>}
//       </label>
//       <div className="input-data-picker">
//         {selectPartner?.pathLogo && (
//           <img src={selectPartner?.pathLogo} className="logo" />
//         )}
//         <InputText
//           placeholder={placeholder || "--Chọn Partner--"}
//           value={selectPartner?.name || ""}
//           onClick={() => setVisible(true)}
//           disabled={disabled}
//           className={classNames(
//             "input-field",
//             { "p-invalid": isValidate },
//             { "input-data-picker-pading": selectPartner?.pathLogo }
//           )}
//         />
//         {!disabled && (
//           <span className="icon-clear" onClick={hanldClear}>
//             <i className="pi pi-times"></i>
//           </span>
//         )}
//       </div>

//       <Dialog
//         header="Danh sách partner"
//         visible={visible}
//         style={{ width: "50vw" }}
//         onHide={() => setVisible(false)}
//       >
//         <DataTable
//           value={items}
//           paginator
//           rows={5}
//           selectionMode="single"
//           selection={selectPartner}
//           onSelectionChange={hanldSelectChange}
//           paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
//           currentPageReportTemplate="{first} đến {last} trong tổng {totalRecords}"
//           sortMode="multiple"
//         >
//           <Column
//             header="STT"
//             body={(data, options) => options.rowIndex + 1}
//           ></Column>
//           <Column field="logoPath" header="Logo" body={bodyLogo}></Column>
//           <Column field="name" header="Tên Partner" sortable></Column>
//           <Column field="code" header="Mã Partner" sortable></Column>
//           <Column field="email" header="Email" sortable></Column>
//         </DataTable>
//       </Dialog>
//     </>
//   );
// }
export default function DataPickerPartner() {
  return <></>;
}
