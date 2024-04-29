import React from 'react';
import {Upload, Button} from "antd";

const UploadButton = ({setFileList}) => {
    return (
        <Upload
            beforeUpload={(file) => {
                return new Promise((resolve, reject) => {
                    if (file.size > 2) {
                        reject("Rejected");
                    } else {
                        resolve("Success");
                    }
                });
            }}
            onChange={(response) => {
                if (response.file.status !== "uploading") {
                    setFileList(response.fileList);
                }
                if (response.file.status === "done") {
                    console.log(response.file);
                } else if (response.file.status === "error") {
                    console.log(`${response.file.name} file upload failed.`);
                }
            }}
        >
            <Button>
                <p>Загрузите изображение</p>
            </Button>
        </Upload>
    );
};

export default UploadButton;
