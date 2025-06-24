import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";

interface props {
  handleUpload: (e: File[]) => any;
  handleDeleteFile: (e: File) => any;
}

const onTemplateRemove = (file: File, callback: any) => {
  callback();
};
const itemTemplate = (file: any, props: any) => {
  return (
    <div className="d-flex flex-row justify-content-between">
      <div className="d-flex align-items-center w-60">
        <img
          alt={file.name}
          role="presentation"
          src={file.objectURL}
          width={100}
        />
        <span className="content-item-file">
          <p>{file.name}</p>

          <small>
            {props.formatSize} - {new Date().toLocaleDateString()}
          </small>
        </span>
      </div>
      <Button
        type="button"
        icon="pi pi-times"
        rounded
        text
        severity="danger"
        onClick={() => onTemplateRemove(file, props.onRemove)}
      />
    </div>
  );
};

export default function FileUploadCustom({
  handleUpload,
  handleDeleteFile,
}: props) {
  return (
    <div>
      <FileUpload
        className="mt-4"
        multiple
        auto={true}
        customUpload={true}
        itemTemplate={itemTemplate}
        onRemove={(event) => handleDeleteFile(event.file)}
        uploadHandler={(event) => handleUpload(event.files)}
      />
    </div>
  );
}
