import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { Todo } from '../types/index';

interface Props {
  todo: Todo,
  onSave: (description: string) => void,
  onDelete: (id: number) => void,
};

export const Edit: React.FC<Props> = ({todo, onSave, onDelete}) => {

  const [value, setValue] = useState<string>(todo.description);

  return (
    <Container className='mt-5'>
    <Row>
      <Col>
        <label>Description</label>
        <input id="description-field" type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
      </Col>
    </Row>
    <Row>
      <Col>
        <Button id="save-button" variant="primary" onClick={() => onSave(value)}>Save</Button>
      </Col>
      <Col>
        <Button id="delete-button" variant='danger' onClick={() => onDelete(todo.id)}>Delete</Button>
      </Col>
    </Row>
  </Container>
  );
}