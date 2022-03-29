import {
	DataTypes
} from 'sequelize'
//@ts-ignore
import { umzug } from '../bin/commands/db.js'

export type Migration = typeof umzug._types.migration

export const up: Migration = async ({ context: queryInterface }) => {}

export const down: Migration = async ({ context: queryInterface }) => {}
