import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
} from "primereact/fileupload";

interface props {
  handleUpload: (e: File[]) => any; // xử lý upload
  handleDeleteFile: (e: File) => any; // xử lý delete khi upload
  hanldeRemoveFileSaved: (e: any) => any; // xử lý xóa file khi đã lưu trong db
  multiple?: boolean;
  disabled?: boolean;
  label?: string;
  lstImg?: any[]; // danh sách file đã lưu trong db
  validateText: string;
  isShow?: boolean;
}

const onTemplateRemove = (file: File, callback: any) => {
  callback();
};

const chooseOptions = (lable: string) => {
  return {
    icon: "pi pi-cloud-upload",
    label: lable,
    className: "custom-choose-btn p-button-outlined",
  };
};

const itemTemplate = (file: any, props: any) => {
  const srcVideo = URL.createObjectURL(file);
  return (
    <div className="d-flex flex-row justify-content-between">
      <div className="d-flex align-items-center item-temp-class">
        {file.type === "video/mp4" ? (
          <video className="w-100" controls>
            <source src={srcVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            alt={file.name}
            role="presentation"
            style={{ width: "100%" }}
            src={file.objectURL}
          ></img>
        )}

        <span
          className="icon-remove-img"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        >
          <i className="pi pi-times-circle"></i>
        </span>
      </div>
    </div>
  );
};

export default function ImgUploadCustom({
  handleUpload,
  handleDeleteFile,
  hanldeRemoveFileSaved,
  multiple,
  label,
  lstImg,
  validateText,
  disabled,
  isShow = true,
}: props) {
  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton } = options;
    return (
      <div className={className}>
        {chooseButton}
        <small className="text-note-file">{validateText}</small>
      </div>
    );
  };

  return (
    <div>
      {isShow && (
        <FileUpload
          className="mt-4"
          multiple={multiple || false}
          auto={true}
          customUpload={true}
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          chooseOptions={chooseOptions(label || "Upload")}
          onRemove={(event) => handleDeleteFile(event.file)}
          uploadHandler={(event) => handleUpload(event.files)}
          accept={"image/*, video/*"}
          disabled={disabled}
        />
      )}
      {lstImg && (
        <div className="lst-img-saved mt-2">
          {lstImg.map((img, index) => {
            return (
              <div className="item-img-saved" key={index}>
                <img src={img.path} alt="" style={{ width: "100%" }} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
