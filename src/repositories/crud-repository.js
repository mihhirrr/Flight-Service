class CrudFunctions {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      console.log(data);
      return response;
    } catch (error) {
      console.log(
        "There was an error while inserting the data in " + this.model
      );
      throw error;
    }
  }

  async find(id) {
    try {
      console.log(id);
      const response = await this.model.findByPk(id);
      return response;
    } catch (error) {
      console.log(
        "There was an error while retrieving the data from " + this.model
      );
      throw error;
    }
  }

  async findAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      console.log(
        "There was an error while retrieving the data from " + this.model
      );
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: {
          id,
        },
      });
      return response;
    } catch (error) {
      console.log(
        "There was an error while updating the data in " + this.model
      );
      throw error;
    }
  }

  async delete(id) {
    try {
      console.log(typeof id);
      const response = await this.model.destroy({
        where: {
          id,
        },
      });
      return response;
    } catch (error) {
      console.log(
        "There was an error while retrieving the data from " + this.model
      );
      throw error;
    }
  }
}

module.exports = CrudFunctions;
