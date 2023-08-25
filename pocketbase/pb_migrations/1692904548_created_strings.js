migrate((db) => {
  const collection = new Collection({
    "id": "kqdjs5tnrg0y2e7",
    "created": "2023-08-24 19:15:48.752Z",
    "updated": "2023-08-24 19:15:48.752Z",
    "name": "strings",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mbpclqzy",
        "name": "jsonStrings",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "c4kvvkln",
        "name": "version",
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
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kqdjs5tnrg0y2e7");

  return dao.deleteCollection(collection);
})
