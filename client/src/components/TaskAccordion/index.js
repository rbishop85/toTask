import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Auth from "../../utils/auth";

import { useMutation } from "@apollo/client";

import { ASSIGN_TASK } from "../../utils/mutations"

const TaskAccordion = ({ tasks }) => {

  const [assignTask, { error }] = useMutation(ASSIGN_TASK);

  const taskButton = async ( id ) => {
    
    try {
      await assignTask({
        variables: { taskId: id },
      });

      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  if (!tasks.length) {
    return <h3>No Tasks Yet</h3>;
  }

  return (
    <div>
      {tasks &&
        tasks.map(({ _id, name, description, value, doerId, toerId }) => (
          <div key={_id}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{name}</Accordion.Header>
                <Accordion.Body>
                  {console.log(Auth.getProfile().data._id)}
                  {console.log(toerId._id)}
                  {console.log(doerId)}
                  {description} 
                  {value} 
                  {/* If task has a doerId, then print who the task is assigned to */}
                  {doerId ? 
                    ( "Task Assigned to: " + doerId._id ) : 
                    // Else if logged in user created task, display that task is currently unassigned
                    Auth.getProfile().data._id === toerId._id ?
                      ( "Task Currently Unassigned" ) :
                      // Else display button allowing user to assign themselves to task
                      ( <Button onClick={() => taskButton(_id)}>Assign Me</Button> )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
    </div>
  );
};

export default TaskAccordion;