import { IItem } from "../interfaces/interfaces"
import { utilService } from "./util.service"

export const storageService = {
	query,
	get,
	remove,
	post,
}

async function query(entityType: string) {
	var entities = (await _load(entityType)) || []
	if (!entities || !entities.length) {
		_save(entityType, [])
	}

	return entities
}

async function get(entityType: string, entityId: string) {
	const entities: IItem[] = await query(entityType)
	const entity = entities.find(entity => entity.ItemId._text === entityId)
	return entity
}

async function post(entityType: string, newEntity: IItem) {
	const entities = await query(entityType)
	entities.push(newEntity)
	_save(entityType, entities)
	return newEntity
}

async function remove(entityType: string, entityId: string) {
	const entities: IItem[] = await query(entityType)
	const idx = entities.findIndex(entity => entity.ItemId._text === entityId)
	entities.splice(idx, 1)
	_save(entityType, entities)
}

function _save(entityType: string, entities: IItem[]) {
	localStorage.setItem(entityType, JSON.stringify(entities))
}

async function _load(entityType: string) {
	const entities: any = localStorage.getItem(entityType)
	return await JSON.parse(entities)
}
