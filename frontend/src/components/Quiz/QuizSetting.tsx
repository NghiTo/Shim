import { Form, Image, Input, Modal, Select, Upload, UploadFile } from "antd";
import React, { useEffect, useState } from "react";
import defaultImg from "/src/assets/logo_placeholder_sm.png";
import { gradeOptions, subjectOptions } from "../../constants/constants";
import { Quiz } from "../../types/quiz";
import {
  gradeSchema,
  subjectSchema,
  titleSchema,
} from "../../schemas/userSchema";
import { FaUpload } from "react-icons/fa6";

interface QuizSettingProps {
  quiz?: Quiz;
  openSetting: boolean;
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizSetting: React.FC<QuizSettingProps> = ({
  openSetting,
  setOpenSetting,
  quiz,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (quiz?.coverImg) {
      setFileList([
        {
          uid: "-1",
          name: "Quiz Image",
          status: "done",
          url: quiz.coverImg,
        },
      ]);
    } else {
      setFileList([
        { uid: "-1", name: "Quiz Image", status: "done", url: defaultImg },
      ]);
    }
  }, [quiz?.coverImg]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && file.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => {
        setPreviewImage(reader.result as string);
        setPreviewOpen(true);
      };
    } else {
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
    }
  };

  return (
    <Modal
      open={openSetting}
      title="Review quiz settings and you’re good to go"
      onCancel={() => setOpenSetting(false)}
      centered
      width={500}
    >
      <Form
        initialValues={{
          title: quiz?.title,
          subject: quiz?.subject || null,
          grade: quiz?.grade || null,
          isPublic: quiz?.isPublic,
          coverImg: quiz?.coverImg,
        }}
        layout="vertical"
        className="grid grid-cols-3"
      >
        <Form.Item
          label="Quiz Image"
          name="coverImg"
          rules={[{ required: true, message: "Please upload quiz image!" }]}
          className="col-span-1 row-span-3"
        >
          <Upload
            fileList={fileList}
            beforeUpload={() => false}
            maxCount={1}
            listType="picture-card"
            onChange={({ fileList }) => setFileList(fileList)}
            defaultFileList={fileList}
            onPreview={handlePreview}
            className="w-full h-full flex items-center justify-center"
          >
            {fileList.length >= 1 ? null : (
              <div className="flex flex-col items-center justify-center">
                <FaUpload />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={titleSchema}
          className="col-span-2"
        >
          <Input
            type="text"
            placeholder="Quiz name"
            defaultValue={quiz?.title === "Untitled quiz" ? "" : quiz?.title}
          />
        </Form.Item>
        <Form.Item
          label="Subject"
          name="subject"
          rules={subjectSchema}
          className="col-span-2"
        >
          <Select
            className="w-full"
            options={subjectOptions}
            placeholder="Select subject"
          />
        </Form.Item>
        <div className="col-span-3 flex flex-row row-start-4 gap-4">
          <Form.Item
            label="Grade"
            name="grade"
            rules={gradeSchema}
            className="w-full"
          >
            <Select options={gradeOptions} placeholder="Select grade" />
          </Form.Item>
          <Form.Item label="Visibility" name="isPublic" className="w-full">
            <Select
              options={[
                { value: true, label: "Public" },
                { value: false, label: "Private" },
              ]}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default QuizSetting;
