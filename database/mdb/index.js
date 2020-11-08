const log = require("../../utils/logger");
const mongoClient = require("mongodb").MongoClient;
const { format } = require("date-fns");

const Sentry = require("@sentry/node");
//FUNCION DE ACTUALIZAR JSON
exports.UPDATEONE_MDB = async (bd, query, data, name_collection) => {
  try {
    log.info("UP_ONE MDB");
    console.log(query);
    const client = await mongoClient.connect(process.env.URL_MDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = client.db(bd);
    const collection = db.collection(name_collection);
    const { result } = await collection.updateOne(query, {
      $set: {
        data
      }
    });

    /* console.log("success"); */
    await client.close();
    return result;
  } catch (e) {
    Sentry.captureMessage("Fallo Editar Mongo");
    Sentry.captureException(e);
  }
};

exports.EDIT_MDB = async (bd, query, data, name_collection) => {
  try {
    //log.info("UP MDB");
    console.log(query);
    const client = await mongoClient.connect(process.env.URL_MDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = client.db(bd);
    const collection = db.collection(name_collection);
    const { result } = await collection.updateOne(query, {
      $set: {
        ...data,
        _created: new Date()
      }
    });

    /* console.log("success"); */
    await client.close();
    return result;
  } catch (e) {
    Sentry.captureMessage("Fallo Editar Mongo");
    Sentry.captureException(e);
  }
};

exports.INSERT_MDB = async (bd, data, name_collection) => {
  try {
    log.info("INSERT MDB");
    const client = await mongoClient.connect(process.env.URL_MDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = client.db(bd);
    const collection = db.collection(name_collection);
    const { result, insertedId } = await collection.insertOne({
      ...data,
      fecha: new Date()
    });
    await client.close();
    log.info("INSERT_MDB", result);
    return result;
  } catch (e) {
    console.log(e);
    Sentry.captureMessage("Fallo Insertar Mongo");
    Sentry.captureException(e);
  }
};


exports.SEARCH_MDB = async (bd, data, name_collection) => {
  try {
    log.info("SEARCH MONGO");
    // console.log(data);
    const client = await mongoClient.connect(process.env.URL_MDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = client.db(bd);
    const collection = db.collection(name_collection);
    const result = await collection.find(data).toArray();
    // console.log(result);
    await client.close();
    return result;
  } catch (e) {
    console.log(e);
    Sentry.captureMessage("Fallo Busqueda Mongo");
    Sentry.captureException(e);
  }
};
exports.SEARCHALL_MDB = async (bd, name_collection) => {
  try {
    log.info("SEARCH ALL MONGO");
    const client = await mongoClient.connect(process.env.URL_MDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = client.db(bd);
    const collection = db.collection(name_collection);
    const result = await collection.find().toArray();
    // console.log(result)
    await client.close();
    return result;
  } catch (e) {
    console.log(e);
    Sentry.captureMessage("Fallo Busqueda Mongo");
    Sentry.captureException(e);
  }
};
exports.SEARCH_QUERY_MDB = async (bd, name_collection, query) => {
  try {
    log.info("SEARCH ALL MONGO");
    const client = await mongoClient.connect(process.env.URL_MDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = client.db(bd);
    const collection = db.collection(name_collection);
    const result = await collection.find(query).toArray();
    // console.log(result)
    await client.close();
    return result;
  } catch (e) {
    console.log(e);
    Sentry.captureMessage("Fallo Busqueda Mongo");
    Sentry.captureException(e);
  }
};

exports.GET_ONE = async (MDB_NAME, name_collection, query) => {
  try {
    const client = await mongoClient.connect(process.env.URL_MDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("query ", query);
    const db = client.db(MDB_NAME);
    const collection = db.collection(name_collection);

    const result = await collection.findOne(query);

    console.log("GET-MDB");
    console.log(result);

    return { codRes: result ? "00" : "01", ...result };
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};
