import React, { useMemo } from 'react';
import { Todo } from '../types/index';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

interface Props {
  todos: Todo[],
  onHandleCheck: (index: number) => void,
  onEdit: (index: number) => void
};

export const TodoTable: React.FC<Props> = ({todos, onHandleCheck, onEdit}) => {

  const populatedTodoRows = useMemo(() => {
      return todos.map((t, index) => {
        const {id, description, completed} = t;
        return (
          <tr key={`table-row-${index}`}>
            <td>{id}</td>
            <td>{description || ''}</td>
            <td>
              <input
                name={`completed-checkbox-${index}`}
                type="checkbox"
                checked={completed}
                onChange={() => onHandleCheck(index)}
              />
              </td>
              <td><Button variant="link" onClick={() => onEdit(index)}>Edit</Button></td>
          </tr>
        )
      });
    }, [todos]);

  return (
    <Table striped bordered hover id="todo-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Completed</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
          {populatedTodoRows}
      </tbody>
    </Table>
  )
};
