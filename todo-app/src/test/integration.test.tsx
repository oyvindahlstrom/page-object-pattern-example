import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';
import HomePageObject from './pageobjects/HomePageObject';

describe('Integration-test', () => {

  beforeEach(() => render(<App />));

  it('should verify existing todos in the table', () => {
    new HomePageObject()
      .countTodos(5)
      .verifyTodoDescriptionInTable(0, 'Create a todo app that can be tested using the Page Object Pattern')
      .verifyTodoDescriptionInTable(1, 'Conjure clever test data')
      .verifyTodoDescriptionInTable(2, 'Use Bootstrap instead of styling the example app yourself')
      .verifyTodoDescriptionInTable(3, 'Initialize git')
      .verifyTodoDescriptionInTable(4, 'Write the article');
  });

  it('should add new todo', () => {
    new HomePageObject()
      .countTodos(5)
      .clickOnAddNewTodo()
      .fillDescriptionField('A brand new TODO')
      .clickSaveButton()
      .countTodos(6)
      .verifyTodoDescriptionInTable(5, 'A brand new TODO');
  });

  it('should mark some todos as completed', () => {
    new HomePageObject()
      .countTodos(5)
      .checkboxAtRowShouldBe(0, false)
      .clickOnCompletedCheckboxAtRowNumber(0)
      .clickOnCompletedCheckboxAtRowNumber(2)
      .checkboxAtRowShouldBe(0, true)
      .checkboxAtRowShouldBe(1, false)
      .checkboxAtRowShouldBe(2, true);
  });

  it('should add new TODO but change your mind and cancel', () => {
    new HomePageObject()
      .countTodos(5)
      .clickOnAddNewTodo()
      .clickCancelButton()
      .countTodos(5);
  });

  it('should edit a TODO description', () => {
    new HomePageObject()
      .verifyTodoDescriptionInTable(0, 'Create a todo app that can be tested using the Page Object Pattern')
      .clickEditButtonAtRowNumber(0)
      .fillDescription('This description has been altered')
      .clickSaveButton()
      .countTodos(5)
      .verifyTodoDescriptionInTable(0, 'This description has been altered');
  });

  it('should delete a TODO', () => {
    new HomePageObject()
      .countTodos(5)
      .clickEditButtonAtRowNumber(0)
      .clickDeleteButton()
      .countTodos(4);
  });
});