const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName='fruitsDB';

const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function(err){
  assert.equal(null,err);
  console.log("Connected to server successfully");

  const db = client.db(dbName);

  findDocuments(db,function(){
    client.close();
  });
});

const insertDocuments = function(db,callback){
  const collection = db.collection('fruits');

  collection.insertMany([
    {
      name:"Apple",
      score:10,
      review:"Nice One"
    },
    {
      name:"Mango",
      score:10,
      review:"Great Fruit"
    },
    {
      name:"Sweet Lime",
      score:7,
      review:"Good"
    }
  ], function(err,result){
    assert.equal(err,null);
    assert.equal(3,result.result.n);
    assert.equal(3,result.ops.length);
    console.log("Inserted 3 documents in collection");
    callback(result);
  });
};

const findDocuments = function(db,callback){
  const collection = db.collection('fruits');

  collection.find({}).toArray(function(err,fruits){
    assert.equal(err,null);
    console.log("Found following records");
    console.log(fruits);
    callback(fruits);
  });
}
