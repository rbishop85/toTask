import React from "react";
import Accordion from "react-bootstrap/Accordion";

const TaskAccordion = ({ tasks }) => {
  if (!tasks.length) {
    return <h3>No Tasks Yet</h3>;
  }

  return (
    <div>
      {tasks &&
        tasks.map(({ id, name, description, value }) => (
          <div key={id}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{name}</Accordion.Header>
                <Accordion.Body>
                  {description} {value}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
    </div>
  );
};

export default TaskAccordion;
