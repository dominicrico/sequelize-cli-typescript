import {
    DataTypes
} from 'sequelize'
//@ts-ignore
import { umzug } from '../bin/commands/db.js'

export type Migration = typeof umzug._types.migration

export const up: Migration = async ({ context: queryInterface }) => {
    await queryInterface.createTable('<%= tableName[0].toUpperCase() + tableName.substr(1) %>', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
        },

    <% attributes.forEach(function (attribute) { %>
        <%= attribute.fieldName %>: {
            type: DataTypes.<%= attribute.dataFunction ? `${attribute.dataFunction.toUpperCase()}(DataTypes.${attribute.dataType.toUpperCase()})` : attribute.dataType.toUpperCase() %>
        },
    <% }) %>

        <%= createdAt %>: {
            allowNull: false,
            type: DataTypes.DATE
        },

        <%= updatedAt %>: {
            allowNull: false,
            type: DataTypes.DATE
        }
    })
}
    
//@ts-ignore
export const down: Migration = async ({ context: queryInterface }) => {
    await queryInterface.dropTable('<%= tableName[0].toUpperCase() + tableName.substr(1) %>')
}

