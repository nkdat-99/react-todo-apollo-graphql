const { RESTDataSource } = require('apollo-datasource-rest');

class TodoAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3001/todolist';
    }

    async getTodos() {
        const result = await this.get('');
        return result.data;
    }

    async createTodoItem({ item }) {
        const result = await this.post('', { item })
        console.log(result);
        return result.status;
    }

    async getAllActive() {
        const result = await this.post('/itemActiveAll')
        return result.status;
    }

    async putItemActive({ item }) {
        const result = await this.put('/itemActive', { item })
        return result.status;
    }

    async deleteTodo(e) {
        const result = await this.delete(`/${e.id}`)
        return result.status;
    }
}

module.exports = TodoAPI;