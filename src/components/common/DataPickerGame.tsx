// import { Column } from "primereact/column";
// import { DataTable } from "primereact/datatable";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { useEffect, useState } from "react";
// import { Game } from "../../models/Game";
// import { geDetailGame, searchGames } from "../../service/GameService";
// import { classNames } from "primereact/utils";
// import { convertDateToString } from "../../common";

// interface props {
//   label?: string;
//   placeholder?: string;
//   valueDefault?: number;
//   isValidate?: boolean;
//   disabled?: boolean;
//   required?: boolean;
//   onSelectChange: (e: any) => any;
// }

// export default function DataPickerGame({
//   label,
//   required,
//   isValidate,
//   valueDefault,
//   disabled,
//   placeholder,
//   onSelectChange,
// }: props) {
//   const [selectGame, setSelectGame] = useState<Game>();
//   const [visible, setVisible] = useState(false);
//   const [items, setItems] = useState<Game[]>([]);
//   useEffect(() => {
//     handleSearchGame("");
//     if (valueDefault) {
//       handleFindOneGame(valueDefault);
//     }
//   }, []);

//   const handleSearchGame = async (event: any) => {
//     const _param = {
//       limit: 6,
//       offset: 0,
//       name: event.query,
//     };
//     const res = await searchGames(_param);
//     setItems(res.data[0]);
//   };

//   const handleFindOneGame = async (id: number) => {
//     const res = await geDetailGame(id);
//     setSelectGame({ name: res.game_name, pathIcon: res.game_pathIcon });
//   };

//   const hanldSelectChange = (e: any) => {
//     onSelectChange(e.value);
//     setSelectGame(e.value);
//     setVisible(false);
//   };

//   const bodyDates = (game: Game) => {
//     return <span>{convertDateToString(game.publicDate, "DD-MM-YYYY")}</span>;
//   };
//   const bodyLogo = (game: Game) => {
//     return (
//       <div className="body-logo-partner">
//         <img src={game.pathIcon} />
//       </div>
//     );
//   };

//   const hanldClear = () => {
//     setSelectGame({ name: "" });
//     onSelectChange({ id: null });
//   };

//   return (
//     <>
//       <label className="label-field">
//         {label}
//         {required && <p className="px-1 text-danger ">*</p>}
//       </label>
//       <div className="input-data-picker">
//         {selectGame?.pathIcon && (
//           <img src={selectGame?.pathIcon} className="logo" />
//         )}
//         <InputText
//           placeholder={placeholder || "--Chọn Game--"}
//           value={selectGame?.name || ""}
//           onClick={() => setVisible(true)}
//           disabled={disabled}
//           className={classNames(
//             "input-field",
//             { "p-invalid": isValidate },
//             { "input-data-picker-pading": selectGame?.pathIcon }
//           )}
//         />
//         {!disabled && (
//           <span className="icon-clear" onClick={hanldClear}>
//             <i className="pi pi-times"></i>
//           </span>
//         )}
//       </div>

//       <Dialog
//         header="Game đang phát hành"
//         visible={visible}
//         style={{ width: "50vw" }}
//         onHide={() => setVisible(false)}
//       >
//         <DataTable
//           value={items}
//           paginator
//           rows={5}
//           selectionMode="single"
//           selection={selectGame}
//           onSelectionChange={hanldSelectChange}
//           paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
//           currentPageReportTemplate="{first} đến {last} trong tổng {totalRecords}"
//           sortMode="multiple"
//         >
//           <Column
//             header="STT"
//             body={(data, options) => options.rowIndex + 1}
//           ></Column>
//           <Column field="pathIcon" header="Logo" body={bodyLogo}></Column>
//           <Column field="name" header="Tên game" sortable></Column>
//           <Column
//             field="publicDate"
//             header="Ngày phát hành"
//             sortable
//             body={bodyDates}
//           ></Column>
//           <Column field="cost" header="Chi phí" sortable></Column>
//           <Column field="type" header="Loại game" sortable></Column>
//           <Column field="platforms" header="Hệ điều hành"></Column>
//         </DataTable>
//       </Dialog>
//     </>
//   );
// }
export default function DataPickerGame() {
  return <></>;
}
