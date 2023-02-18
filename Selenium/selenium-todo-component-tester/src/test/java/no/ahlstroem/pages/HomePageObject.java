package no.ahlstroem.pages;

import java.time.Duration;

import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public class HomePageObject {
    
    private WebDriver webDriver;

    @FindBy(id="todo-table")
    private WebElement todoTable;
    
    @FindBy(how = How.XPATH, using = "//table/tbody/tr")
    private List<WebElement> tableRows;

    @FindBy(id="addNewTodoButton")
    private WebElement addNewTodoButton;

    public HomePageObject(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(webDriver, this);
        new WebDriverWait(webDriver, Duration.ofSeconds(3)).until(ExpectedConditions.visibilityOf(todoTable));
    }

    public HomePageObject verifyTodoDescriptionInTable(int rowNumber, String expectedDescription) {
        WebElement tableDataElement = webDriver.findElement(descriptionFieldAtRowNumber(rowNumber));
        String actualDescription = tableDataElement.getText();
        Assertions.assertEquals(expectedDescription, actualDescription);
        return this;
    }

    public HomePageObject countTodos(int count) {
        Assertions.assertEquals(count, tableRows.size());
        return this;
    }

    public HomePageObject clickOnCompletedCheckboxAtRowNumber(int rowNumber) {
        WebElement checkbox = webDriver.findElement(completedCheckboxAtRowNumber(rowNumber));
        checkbox.click();
        return this;
    }

    public HomePageObject checkboxAtRowShouldBe(int rowNumber, boolean expected) {
        WebElement checkbox = webDriver.findElement(completedCheckboxAtRowNumber(rowNumber));
        Assertions.assertEquals(expected, checkbox.isSelected());
        return this;
    }

    public EditPageObject clickEditButtonAtRowNumber(int rowNumber) {
        webDriver.findElement(editButtonAtRowNumber(rowNumber)).click();
        return new EditPageObject(webDriver);
    }

    public AddPageObject clickOnAddNewTodo() {
        addNewTodoButton.click();
        return new AddPageObject(webDriver);
    }

    private By descriptionFieldAtRowNumber(int rowNumber) {
        return By.xpath(String.format("//table/tbody/tr[%d]/td[2]", rowNumber));
    }

    private By completedCheckboxAtRowNumber(int rowNumber) {
        return By.xpath(String.format("//table/tbody/tr[%d]/td[3]/input", rowNumber));
    }

    private By editButtonAtRowNumber(int rowNumber) {
        return By.xpath(String.format("//table/tbody/tr[%d]/td[4]", rowNumber));
    }
}
