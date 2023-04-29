
class Unit {
    id: Number;
    data_: Object;
    data() {
        return {
            
        }
    }
    constructor(data_: Object) {
        this.data_ = data_;

    }
}

class Armament {
    id: Number;
}

class ServerSource {
    unit_data: Map<Number, Unit>;
    constructor() {
        this.unit_data = new Map();
    }
}

class WorldflipperManager {
    server_sources: Map<string, ServerSource>;
    constructor() {
        this.server_sources = new Map();
    }
}