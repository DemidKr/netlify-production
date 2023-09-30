import { useState } from "react";

import { CreateTaskModal, DeleteTaskModal } from "./modals";

export const ManagerPage = () => {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);

  return (
    <>
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
    </>
  );
};
