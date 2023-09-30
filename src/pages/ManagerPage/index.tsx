import { useState } from "react";

import { MainWrapper } from "../../components";
import { CreateTaskModal, DeleteTaskModal } from "./modals";

export const ManagerPage = () => {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(true);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);

  return (
    <MainWrapper>
      <h1>Hello world</h1>

      <CreateTaskModal
        show={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
      />

      <DeleteTaskModal
        show={showDeleteTaskModal}
        onClose={() => setShowDeleteTaskModal(false)}
        taskId="123"
      />
    </MainWrapper>
  );
};
