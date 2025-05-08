import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadIamge = ({ value, onChange, showUploadList }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  // Cập nhật fileList khi value thay đổi từ bên ngoài
  useEffect(() => {
    if (value) {
      setFileList([value]);
    } else {
      setFileList([]);
    }
  }, [value]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    // Chỉ giữ lại file mới nhất
    const latestFile =
      newFileList.length > 0 ? newFileList[newFileList.length - 1] : null;
    const newList = latestFile ? [latestFile] : [];
    setFileList(newList);

    // Gọi onChange để cập nhật giá trị bên ngoài component
    if (onChange) {
      onChange(latestFile);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 4 }}>Thêm ảnh</div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={1}
        showUploadList={
          showUploadList
            ? showUploadList
            : {
                showPreviewIcon: true,
                showRemoveIcon: true,
              }
        }
        className="custom-upload-no-border"
        beforeUpload={(file) => {
          console.log(file);
          // Ngăn chặn việc tự động upload lên server
          return false;
        }}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>

      <Image
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage(""),
          mask: null,
        }}
        src={previewImage || null}
      />

      <style jsx="true">{`
        .custom-upload-no-border .ant-upload-list-item-error {
          border-color: #d9d9d9 !important;
        }
        .custom-upload-no-border .ant-tooltip {
          display: none !important;
        }
      `}</style>
    </>
  );
};

export default UploadIamge;
