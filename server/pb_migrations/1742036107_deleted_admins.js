migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("oukoqf4mxbhn530");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "oukoqf4mxbhn530",
    "created": "2025-03-15 10:48:10.222Z",
    "updated": "2025-03-15 10:48:10.222Z",
    "name": "admins",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gdeqfdlj",
        "name": "email",
        "type": "email",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": [],
          "onlyDomains": []
        }
      },
      {
        "system": false,
        "id": "edq4rzii",
        "name": "password",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
