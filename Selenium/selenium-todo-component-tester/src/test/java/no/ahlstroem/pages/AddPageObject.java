package no.ahlstroem.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class AddPageObject {

    private WebDriver webDriver;

    @FindBy(id="description-field")
    private WebElement descriptionField;

    @FindBy(id="cancel-button")
    private WebElement cancelButton;

    @FindBy(id="save-button")
    private WebElement saveButton;

    public AddPageObject(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(webDriver, this);
    }

    public AddPageObject fillDescriptionField(String description) {
        descriptionField.sendKeys(description);
        return this;
    }

    public HomePageObject clickCancelButton() {
        cancelButton.click();
        return new HomePageObject(webDriver);
    }

    public HomePageObject clickSaveButton() {
        saveButton.click();
        return new HomePageObject(webDriver);
    }

 }
