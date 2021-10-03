class BaseService {
    constructor(model) {
        this.model = model;
    }

    save(objects) {
        return this.model.save(objects);
    }

    load() {
        return this.model.find();
    }

    async findById(id) {
        return this.model.findById(id);
    }

    async insert(object) {
        return this.model.create(object);
    }

    async update(id, object) {
        return this.model.findByIdAndUpdate(id, object);
    }

    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }
}

module.exports = BaseService;