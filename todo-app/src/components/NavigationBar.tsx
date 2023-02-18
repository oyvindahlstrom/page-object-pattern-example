import React from 'react';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

export const NavigationBar: React.FC = () => (
  <Navbar>
    <Container>
      <Navbar.Brand href="#home">Simple TODO app</Navbar.Brand>
    </Container>
  </Navbar>
);