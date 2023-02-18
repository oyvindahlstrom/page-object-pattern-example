package no.ahlstroem;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import no.ahlstroem.pages.HomePageObject;

public class TodoComponentTest {
    
    private final String URL = "http://localhost:3000/";
    private WebDriver webDriver;
    private HomePageObject homePageObject;

    @BeforeEach
    void setup() {
        webDriver = new ChromeDriver();
        webDriver.get(URL);
        this.homePageObject = new HomePageObject(webDriver);
    }

    @AfterEach
    void tearDown() {
        webDriver.quit();
    }
    
    @Test
    public void verifyExistingTodosInTable() {
        homePageObject
        .countTodos(5)
        .verifyTodoDescriptionInTable(1, "Create a todo app that can be tested using the Page Object Pattern")
        .verifyTodoDescriptionInTable(2, "Conjure clever test data")
        .verifyTodoDescriptionInTable(3, "Use Bootstrap instead of styling the example app yourself")
        .verifyTodoDescriptionInTable(4, "Initialize git")
        .verifyTodoDescriptionInTable(5, "Write the article");
    }

    @Test
    public void addNewTodo() {
        homePageObject
        .countTodos(5)
        .clickOnAddNewTodo()
        .fillDescriptionField("A brand new TODO")
        .clickSaveButton()
        .countTodos(6)
        .verifyTodoDescriptionInTable(6, "A brand new TODO");
    }

    @Test
    public void markSomeTodosAsCompleted() {
        homePageObject
        .countTodos(5)
        .checkboxAtRowShouldBe(1, false)
        .clickOnCompletedCheckboxAtRowNumber(1)
        .clickOnCompletedCheckboxAtRowNumber(3)
        .checkboxAtRowShouldBe(1, true)
        .checkboxAtRowShouldBe(2, false)
        .checkboxAtRowShouldBe(3, true);
    }
    
    @Test
    public void AddNewTodoButChangeYourMindAndCancel() {
        homePageObject
        .countTodos(5)
        .clickOnAddNewTodo()
        .clickCancelButton()
        .countTodos(5);
    }

    @Test
    public void editATodoDescription() {
        homePageObject
        .verifyTodoDescriptionInTable(1, "Create a todo app that can be tested using the Page Object Pattern")
        .clickEditButtonAtRowNumber(1)
        .fillDescription("This description has been altered")
        .clickSaveButton()
        .countTodos(5)
        .verifyTodoDescriptionInTable(1, "This description has been altered");
    }

    @Test
    public void deleteATodo() {
        homePageObject
        .countTodos(5)
        .clickEditButtonAtRowNumber(1)
        .clickDeleteButton()
        .countTodos(4);
    }
}
