import { useState } from "react";

import { CreateTaskModal } from "./modals";

export const ManagerPage = () => {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(true);

  return (
    <>
      <h1>Hello world</h1>

      <CreateTaskModal
        show={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
      />
    </>
  );
};
