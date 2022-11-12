import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Auth from "../../utils/auth";

import { useMutation } from "@apollo/client";

import { ASSIGN_TASK, UNASSIGN_TASK, DELETE_TASK } from "../../utils/mutations";

const TaskAccordion = ({ tasks }) => {
  const [assignTask, { error1 }] = useMutation(ASSIGN_TASK);
  const [unassignTask, { error2 }] = useMutation(UNASSIGN_TASK);
  const [deleteTask, { error3 }] = useMutation(DELETE_TASK);

  const assignButton = async (id) => {
    try {
      await assignTask({
        variables: { taskId: id },
      });

      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const unassignButton = async (id) => {
    try {
      await unassignTask({
        variables: { taskId: id },
      });

      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteButton = async (id) => {
    console.log(id);
    try {
      await deleteTask({
        variables: { taskId: id },
      });

      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  if (!tasks.length) {
    return <h3>No Tasks Yet</h3>;
  }

  return (
    <div>
      {tasks &&

        tasks.map(({ _id, name, description, value, doerId, toerId, postDate }) => (
          <div key={_id}> <br></br>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header><h3>{name}</h3></Accordion.Header>
                <Accordion.Body>
                  {console.log(doerId)}
                  
                  <p>Task Description: {description}</p>
                  <p>Suggested Price: ${value}</p>
                  <p>Task Created: {postDate}</p>
                  
                  {/* If task has a doerId, then print who the task is assigned to */}
                  <p> 
                    {doerId ? (
                      // " Task Assigned to: " + doerId.username
                      (Auth.getProfile().data._id === doerId._id ? (<Button onClick={() => unassignButton(_id)}>Unassign Me</Button>) : (" Task Assigned to: " + doerId.username))
                    ) : // Else if logged in user created task, display that task is currently unassigned
                    Auth.getProfile().data._id === toerId._id ? (
                      " Task Currently Unassigned"
                    ) : (
                      // Else display button allowing user to assign themselves to task
                      <Button onClick={() => assignButton(_id)}>Assign Me</Button>
                    )}
                  </p>
                  {/* If task was posted by current user, show a delete button */}
                  {Auth.getProfile().data._id === toerId._id ? (<p><Button onClick={() => deleteButton(_id)}>DELETE</Button></p>) : ("")}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
    </div>
  );
};

export default TaskAccordion;
