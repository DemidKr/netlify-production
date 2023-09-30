import api from "../../../utils/axios";
import { ModalWindow } from "../../../components";

interface IProps {
  show: boolean;
  onClose: () => void;
  taskId: string;
}

export const DeleteTaskModal = ({ show, onClose, taskId }: IProps) => {
  const handleDelete = () => {
    api()
      .delete(`/task/${taskId}`)
      .then(() => {
        onClose();
      });
  };

  return (
    <ModalWindow
      withCancelButton
      open={show}
      onClose={onClose}
      title="Удаление задачи"
      onSubmit={handleDelete}
    >
      Вы уверены что хотите удалить задачу?
    </ModalWindow>
  );
};
