import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";

class BaseApiService {}

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource) {
    super();
    this.#resource = resource;
  }

  // запрос на получение списка сущностей
  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  // запрос на получение одной сущности по id
  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends BaseApiService {
  #resource;
  constructor(resource) {
    super();
    this.#resource = resource;
  }

  // запрос на создание сущности
  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  // запрос на обновление сущности
  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  // запрос на удаление сущности
  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class AuthApiService extends BaseApiService {
  constructor() {
    super();
  }

  setAuthToken() {
    const token = JwtService.getToken();
  }
}
