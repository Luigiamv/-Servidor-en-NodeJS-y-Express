const mongoose = require('mongoose');
const { configDB } = require('../config/database');
class BD {
  async connectWithMongo() {
    try {
      await mongoose.connect(process.env.MONGO_URI, configDB);
      console.log('Base de datos conectada correctamente.');
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = new BD();
