migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7zhup1uycgzmnww")

  collection.listRule = ""
  collection.viewRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7zhup1uycgzmnww")

  collection.listRule = null
  collection.viewRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
