import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

interface Props {
  onAdd: (description: string) => void,
  onCancel: () => void
}

export const Add: React.FC<Props> = ({onAdd, onCancel}) => {
  const [value, setValue] = useState<string>('');

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
        <Button id="cancel-button" variant="link" onClick={() => onCancel()}>Cancel</Button>
      </Col>
      <Col>
        <Button id="save-button" variant="primary" onClick={() => onAdd(value)}>Save</Button>
      </Col>
    </Row>
  </Container>
  );
}
