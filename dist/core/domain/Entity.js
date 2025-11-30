"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const isEntity = (v) => {
    return v instanceof Entity;
};
class Entity {
    _id;
    props;
    constructor(props, id) {
        this._id = id ? id : crypto.randomUUID();
        this.props = props;
    }
    get id() {
        return this._id;
    }
    equals(object) {
        if (object == null || object == undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!isEntity(object)) {
            return false;
        }
        return this._id === object._id;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map