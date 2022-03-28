import {
    DataTypes
} from 'sequelize'
//@ts-ignore
import { umzug } from '../bin/commands/db.js'

export type Migration = typeof umzug._types.migration

export const up: Migration = async ({ context: queryInterface }) => {
    /*await queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }])*/
}
    
//@ts-ignore
export const down: Migration = async ({ context: queryInterface }) => {
  /*await queryInterface.bulkDelete('Users', null, {})*/
}
