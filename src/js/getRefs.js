export const getRefs = () => {
    return {
        form: document.querySelector('form'),
        todoList: document.querySelector('.list-group'),
        createButton: document.querySelector('.btn.btn-primary'),
        archiveList: document.querySelector('.notes-archive-list'),
        statisticList: document.querySelector('.notes-statistic-list')
    }
}