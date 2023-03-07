import { fireEvent, screen } from "@testing-library/react";
import HomePageObject from "./HomePageObject";

class AddPageObject {

private readonly descriptionField: HTMLElement;
private readonly cancelButton: HTMLElement;
private readonly saveButton: HTMLElement;

  constructor() {
    this.descriptionField = screen.getByRole('textbox', {name: 'Description'});
    this.cancelButton = screen.getByRole('button', {name: 'Cancel'});
    this.saveButton = screen.getByRole('button', {name: 'Save'});
    this.verifyExistenceOfElements();
  }

  public fillDescriptionField(description: string) {
    fireEvent.change(this.descriptionField, {target: {value: description}});
    return this;
  }

  public clickCancelButton() {
    fireEvent.click(this.cancelButton);
    return new HomePageObject();
  }

  public clickSaveButton() {
    fireEvent.click(this.saveButton);
    return new HomePageObject();
  }

  private verifyExistenceOfElements() {
    if (!this.descriptionField) {
      fail('The description field has not been initialized');
    }
    if (!this.cancelButton) {
      fail('The cancel button has not been initialized');
    }
    if (!this.saveButton) {
      fail('The save button has not been initialized');
    }
  }
}

export default AddPageObject;