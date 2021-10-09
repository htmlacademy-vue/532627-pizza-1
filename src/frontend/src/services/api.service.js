import JwtService from "@/services/jwt.service";
import axiosInstance from "@/plugins/axios";

class BaseApiService {
  constructor(notifier) {
    if (!axiosInstance.$notifier) {
      axiosInstance.$notifier = notifier;
    }
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;

  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  // запрос на получение списка сущностей
  async query(config = {}) {
    const { data } = await axiosInstance.get(this.#resource, config);
    return data;
  }

  // запрос на получение одной сущности по id
  async get(id, config = {}) {
    const { data } = await axiosInstance.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends BaseApiService {
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  // запрос на создание сущности
  async post(entity) {
    const { data } = await axiosInstance.post(this.#resource, entity);
    return data;
  }

  // запрос на обновление сущности
  async put(entity) {
    const { data } = await axiosInstance.put(
      `${this.#resource}/${entity.id}`,
      entity
    );
    return data;
  }

  // запрос на удаление сущности
  async delete(id) {
    const { data } = await axiosInstance.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  setAuthHeader() {
    const token = JwtService.getToken();
    axiosInstance.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  // отправляем логин/пароль для авторизации на сервере
  async login(params) {
    const { data } = await axiosInstance.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axiosInstance.delete("logout");
    return data;
  }

  async getMe() {
    const { data } = await axiosInstance.get("whoAmI");
    return data;
  }
}

export class OrderApiService extends CrudApiService {
  constructor(notifier) {
    super("orders", notifier);
  }

  async query(config = {}) {
    return await super.query(config);
  }

  async post(order) {
    return await super.post(order);
  }

  async delete(order) {
    return await super.delete(order);
  }
}

export class AddressApiService extends CrudApiService {
  constructor(notifier) {
    super("addresses", notifier);
  }

  async query(config = {}) {
    return await super.query(config);
  }

  async post(address) {
    return await super.post(address);
  }

  async put(address) {
    return await super.put(address);
  }

  async delete(address) {
    return await super.delete(address);
  }
}
