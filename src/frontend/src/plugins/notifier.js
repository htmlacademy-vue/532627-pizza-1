import { notificationTypes } from "@/common/enums";
import { CREATE_NOTIFICATION } from "@/store/actions-types";

export default class Notifier {
  #store;

  constructor(store) {
    this.#store = store;
  }

  info(msg) {
    this.#store.dispatch(`Notification/${CREATE_NOTIFICATION}`, {
      msg,
      type: notificationTypes.INFO,
    });
  }

  success(msg) {
    this.#store.dispatch(`Notification/${CREATE_NOTIFICATION}`, {
      msg,
      type: notificationTypes.SUCCESS,
    });
  }

  warning(msg) {
    this.#store.dispatch(`Notification/${CREATE_NOTIFICATION}`, {
      msg,
      type: notificationTypes.WARNING,
    });
  }

  error(msg) {
    this.#store.dispatch(`Notification/${CREATE_NOTIFICATION}`, {
      msg,
      type: notificationTypes.ERROR,
    });
  }
}
