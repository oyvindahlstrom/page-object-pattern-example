import { Todo } from '../types/index';

export const fetchTodos = (): Todo[] => {
    return [
        {id: 1, description: 'Create a todo app that can be tested using the Page Object Pattern', completed: false},
        {id: 2, description: 'Conjure clever test data', completed: false},
        {id: 3, description: 'Use Bootstrap instead of styling the example app yourself', completed: false},
        {id: 4, description: 'Initialize git', completed: false},
        {id: 5, description: 'Write the article', completed: false}
    ]
}