import { fireEvent, screen } from "@testing-library/react";
import HomePageObject from "./HomePageObject";

class EditPageObject {

private readonly descriptionField: HTMLElement;
private readonly saveButton: HTMLElement;
private readonly deleteButton: HTMLElement;

  constructor() {
    this.descriptionField = screen.getByRole('textbox', {name: 'Description'});
    this.saveButton = screen.getByRole('button', {name: 'Save'});
    this.deleteButton = screen.getByRole('button', {name: 'Delete'});
    this.verifyExistenceOfElements();
  }

  public fillDescription(description: string) {
    fireEvent.change(this.descriptionField, {target: {value: description}});
    return this;
  }

  public clickSaveButton() {
    fireEvent.click(this.saveButton);
    return new HomePageObject();
  }

  public clickDeleteButton() {
    fireEvent.click(this.deleteButton);
    return new HomePageObject();
  }

  private verifyExistenceOfElements() {
    if (!this.descriptionField) {
      fail('The description field has not been initialized');
    }
    if (!this.deleteButton) {
      fail('The cancel button has not been initialized');
    }
    if (!this.saveButton) {
      fail('The save button has not been initialized');
    }
  }
}

export default EditPageObject;