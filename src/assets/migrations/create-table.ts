import {
    DataTypes
} from 'sequelize'
//@ts-ignore
import { umzug } from '../bin/commands/db.js'

export type Migration = typeof umzug._types.migration

export const up: Migration = async ({ context: queryInterface }) => {
    await queryInterface.createTable('<%= tableName %>', {
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
}
    
//@ts-ignore
export const down: Migration = async ({ context: queryInterface }) => {
    await queryInterface.dropTable('<%= tableName %>')
}

