import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TodoTable } from '../components/TodoTable';
import { Todo } from '../types/index';
import { Route } from '../enums';
import { Button } from 'react-bootstrap';

interface Props {
  todos: Todo[],
  onHandleCheck: (index: number) => void,
  onEdit: (index: number) => void,
  onChangeRoute: (route: Route) => void
};

export const Home: React.FC<Props> = ({todos, onHandleCheck, onEdit, onChangeRoute}) => (
  <Container className='mt-5'>
    <Row>
      <Col>
        <TodoTable todos={todos} onHandleCheck={onHandleCheck} onEdit={onEdit} />
      </Col>
    </Row>
    <Row>
      <Col>
        <Button id="addNewTodoButton" variant="primary" onClick={() => onChangeRoute(Route.ADD)}>Add new TODO</Button>
      </Col>
    </Row>
  </Container>
)