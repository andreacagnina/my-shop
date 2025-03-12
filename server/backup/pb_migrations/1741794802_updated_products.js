migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i6rwbhe875cqnex")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i6rwbhe875cqnex")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
