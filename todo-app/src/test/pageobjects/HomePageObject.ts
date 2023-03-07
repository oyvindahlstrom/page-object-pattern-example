import { fireEvent, screen } from "@testing-library/react";
import AddPageObject from "./AddPageObject";
import EditPageObject from "./EditPageObject";

class HomePageObject {

  private readonly tableBodyRows?: HTMLElement[];
  private readonly addNewTodoButton?: HTMLElement;

  constructor() {
    this.tableBodyRows = screen.getAllByRole('row').slice(1); // Removes the table header row
    this.addNewTodoButton = screen.getByRole('button', {name: 'Add new TODO'});
  }

  public countTodos(count: number) {
    if (!this.tableBodyRows) {
      fail('The todo-table has not been initialized');
    }
    expect(this.tableBodyRows.length).toBe(count);
    return this;
  }

  public verifyTodoDescriptionInTable(rowNumber: number, expectedDescription: string) {
    if (!this.tableBodyRows) {
      fail('The todo-table has not been initialized');
    }
    expect(this.descriptionFieldAtRowNumber(rowNumber)).toHaveTextContent(expectedDescription);
    return this;
  }
  
  // This method is a little less precise but it will still verify if the text is present in the DOM
  public alternativeVerifyDescriptionInTable(expectedDescription: string) {
    if (!this.tableBodyRows) {
      fail('The todo-table has not been initialized');
    }
    expect(screen.getByText(expectedDescription)).toBeInTheDocument();
    return this;
  }

  public clickOnAddNewTodo() {
    if (!this.addNewTodoButton) {
      fail('The add new todo button has not been initialized');
    }
    fireEvent.click(this.addNewTodoButton);
    return new AddPageObject();
  }

  public clickEditButtonAtRowNumber(rowNumber: number) {
    const editButton = this.editButtonAtRowNumber(rowNumber);
    if (!editButton) {
      fail('Could not find the edit button at row number: ' + rowNumber);
    }
    fireEvent.click(editButton);
    return new EditPageObject();
  }

  public clickOnCompletedCheckboxAtRowNumber(rowNumber: number) {
    const completedCheckbox = this.completedCheckboxAtRowNumber(rowNumber);
    if (!completedCheckbox) {
      fail('Could not find the checkbox at row number: ' + rowNumber);
    }
    fireEvent.click(completedCheckbox);
    return this;
  }

  public checkboxAtRowShouldBe(rowNumber: number, expected: boolean) {
    const checkbox = this.completedCheckboxAtRowNumber(rowNumber);
    if (expected) {
      expect(checkbox).toBeChecked();
    } else {
      expect(checkbox).not.toBeChecked();
    }
    return this;
  }

  private descriptionFieldAtRowNumber(rowNumber: number) {
    return this.tableBodyRows?.[rowNumber].children[1];
  }

  private completedCheckboxAtRowNumber(rowNumber: number) {
    return this.tableBodyRows?.[rowNumber].children[2].firstChild;
  }

  private editButtonAtRowNumber(rowNumber: number) {
    return this.tableBodyRows?.[rowNumber].children[3].firstChild;
  }

};

export default HomePageObject;