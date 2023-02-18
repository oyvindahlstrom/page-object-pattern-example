package no.ahlstroem.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class EditPageObject {
    
    private WebDriver webDriver;

    @FindBy(id="description-field")
    private WebElement descriptionField;

    @FindBy(id="save-button")
    private WebElement saveButton;

    @FindBy(id="delete-button")
    private WebElement deleteButton;

    public EditPageObject(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(webDriver, this);
    }

    public EditPageObject fillDescription(String description) {
        descriptionField.clear();
        descriptionField.sendKeys(description);
        return this;
    }

    public HomePageObject clickDeleteButton() {
        deleteButton.click();
        return new HomePageObject(webDriver);
    }

    public HomePageObject clickSaveButton() {
        saveButton.click();
        return new HomePageObject(webDriver);
    }

}
