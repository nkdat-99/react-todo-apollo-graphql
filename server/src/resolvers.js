module.exports = {
    Query: {
        launch: (_, { id }, { dataSources }) =>
            dataSources.launchAPI.getLaunchById({ launchId: id }),
        getAllTodo: async(_, __, { dataSources }) =>
            dataSources.todoAPI.getTodos(),
    },

    Mutation: {
        createTodoItem: async(_, { item }, { dataSources }) => dataSources.todoAPI.createTodoItem({ item }),
        putItemActive: async(_, { item }, { dataSources }) => dataSources.todoAPI.putItemActive({ item }),
        deleteTodo: async(_, { id }, { dataSources }) => dataSources.todoAPI.deleteTodo({ id }),
        getAllActive: async(_, __, { dataSources }) => dataSources.todoAPI.getAllActive(),
    },

    Launch: {
        isBooked: async(launch, _, { dataSources }) =>
            dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
    },
    Mission: {
        missionPatch: (mission, { size } = { size: 'LARGE' }) => {
            return size === 'SMALL' ?
                mission.missionPatchSmall :
                mission.missionPatchLarge;
        },
    },
}