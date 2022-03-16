import { QueryInterface, DataTypes } from 'sequelize'

export = {
    up: (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
        return queryInterface.createTable('<%= tableName %>', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

        <% attributes.forEach(function (attribute) { %>
            <%= attribute.fieldName %>: {
                type: Sequelize.<%= attribute.dataFunction ? `${attribute.dataFunction.toUpperCase()}(Sequelize.${attribute.dataType.toUpperCase()})` : attribute.dataType.toUpperCase() %>
            },
        <% }) %>

            <%= createdAt %>: {
                allowNull: false,
                type: Sequelize.DATE
            },

            <%= updatedAt %>: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },

    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropTable('<%= tableName %>')
    }
}
