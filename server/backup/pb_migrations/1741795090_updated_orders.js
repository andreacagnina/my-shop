migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("km9dz14m59qqoty")

  // remove
  collection.schema.removeField("vfu4llzu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4qogljem",
    "name": "status",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "pending",
        "done"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("km9dz14m59qqoty")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vfu4llzu",
    "name": "status",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "pending"
      ]
    }
  }))

  // remove
  collection.schema.removeField("4qogljem")

  return dao.saveCollection(collection)
})
