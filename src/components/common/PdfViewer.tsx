import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "primereact/button";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// --- CẤU HÌNH WORKER (BẮT BUỘC) ---
// Dùng CDN để tránh phải cấu hình Webpack phức tạp
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  fileUrl: string;
}

const PdfViewer: React.FC<Props> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0); // Thêm chức năng Zoom

  // Khi load thành công, lấy tổng số trang
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="d-flex flex-column align-items-center w-100">
      {/* THANH CÔNG CỤ (ZOOM & NAVIGATE) */}
      <div className="d-flex gap-2 mb-3 align-items-center card p-2 flex-row">
        <Button
          icon="pi pi-minus"
          className="p-button-rounded p-button-text p-button-sm"
          onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
          tooltip="Thu nhỏ"
        />
        <span className="fw-bold">{Math.round(scale * 100)}%</span>
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-text p-button-sm"
          onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
          tooltip="Phóng to"
        />
        <div className="vr mx-2"></div> {/* Vạch ngăn cách dọc */}
        <Button
          icon="pi pi-angle-left"
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
          className="p-button-sm p-button-outlined"
        />
        <span className="mx-2">
          Trang <b>{pageNumber}</b> / {numPages || "--"}
        </span>
        <Button
          icon="pi pi-angle-right"
          disabled={pageNumber >= (numPages || 0)}
          onClick={() => setPageNumber((prev) => prev + 1)}
          className="p-button-sm p-button-outlined"
        />
      </div>

      {/* KHUNG HIỂN THỊ PDF */}
      <div
        className="border rounded p-3 bg-secondary bg-opacity-10"
        style={{
          minHeight: "500px",
          display: "flex",
          justifyContent: "center",
          maxWidth: "100%",
          overflow: "auto", // Cho phép scroll nếu zoom to quá
        }}
      >
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="text-center p-5">
              <i
                className="pi pi-spin pi-spinner"
                style={{ fontSize: "2rem" }}
              ></i>
              <br />
              Đang tải tài liệu...
            </div>
          }
          error={
            <div className="text-danger p-5">
              Không tải được file PDF (Kiểm tra đường dẫn).
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-sm"
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
