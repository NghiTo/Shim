import { useMutation } from "@tanstack/react-query";
import { Modal } from "antd";
import React from "react";
import { createQuiz } from "../../apis/quiz.api";
import { useNavigate } from "react-router-dom";
import { onError } from "../../constants/onError";

interface CreateModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}
const CreateModal: React.FC<CreateModalProps> = ({
  isModalOpen,
  closeModal,
}) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: createQuiz,
    onSuccess: (res) => {
      closeModal();
      navigate(`/teacher/create-quiz/${res.data.id}`);
    },
    onError: onError,
  });

  return (
    <Modal
      title={
        <p className="text-4xl max-md:text-2xl">
          What would you like to create?
        </p>
      }
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      centered
      width={1200}
    >
      <div className="mt-8 grid grid-cols-3 max-md:grid-cols-1 gap-2 max-md:text-base">
        <div
          onClick={() => mutate()}
          className="flex flex-col gap-14 border border-gray-400 rounded-md p-6 cursor-pointer hover:bg-gray-100 hover:shadow-lg"
        >
          <div className="flex flex-row items-center gap-2">
            <img
              src="/src/assets/quiz_solid_circle.png"
              alt="Quiz"
              className="object-cover w-8"
            />
            <h1 className="text-2xl font-semibold">Assessment</h1>
          </div>
          <p>
            Review and practice quizzes to reflect on student understanding of
            concepts
          </p>
        </div>
        <div className="flex flex-col gap-14 border border-gray-400 rounded-md p-6 cursor-pointer hover:bg-gray-100 hover:shadow-lg">
          <div className="flex flex-row items-center gap-2">
            <img
              src="/src/assets/presentation_solid_circle.png"
              alt="Quiz"
              className="object-cover w-8"
            />
            <h1 className="text-2xl font-semibold">Lesson</h1>
          </div>
          <p>
            Teach new topics or skills to the whole class with interactive
            slides
          </p>
        </div>
        <div className="flex flex-col justify-between gap-8 border border-gray-400 rounded-md p-6 cursor-pointer hover:bg-gray-100 hover:shadow-lg">
          <div className="flex flex-row items-center gap-2">
            <img
              src="/src/assets/video-quiz_solid_circle.png"
              alt="Quiz"
              className="object-cover w-8"
            />
            <h1 className="text-2xl font-semibold">Interactive video</h1>
          </div>
          <p>Make asynchronous assignments into active learning experiences.</p>
        </div>
        <div className="flex flex-col justify-between gap-8 border border-gray-400 rounded-md p-6 cursor-pointer hover:bg-gray-100 hover:shadow-lg">
          <div className="flex flex-row items-center gap-2">
            <img
              src="/src/assets/reading-quiz_solid_circle.png"
              alt="Quiz"
              className="object-cover w-8"
            />
            <h1 className="text-2xl font-semibold">Comprehesion</h1>
          </div>
          <p>
            Help students analyse text or media and improve comprehension skill
          </p>
        </div>
        <div className="flex flex-col gap-14 border border-gray-400 rounded-md p-6 cursor-pointer hover:bg-gray-100 hover:shadow-lg">
          <div className="flex flex-row items-center gap-2">
            <img
              src="/src/assets/flashcard_solid_circle.png"
              alt="Quiz"
              className="object-cover w-8"
            />
            <h1 className="text-2xl font-semibold">Flashcard</h1>
          </div>
          <p>
            Boost memory retention, ideal for in-class learning and practice
            with repetitions.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;
