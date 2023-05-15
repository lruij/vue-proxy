import { track, trigger } from './effect';

const isObject = target => target != null && typeof target == 'object'

export const reactive = <T extends object>(target: T) => {
  return new Proxy(target, {
    get(target, p, receiver) {
      let res = Reflect.get(target, p, receiver) as object;
      track(target, p)
      if (isObject(res)) {
        return reactive(res)
      }
      return res
    },
    set(target, p, value, receiver) {
      let res = Reflect.set(target, p, value, receiver);
      trigger(target, p)
      return res
    }
  })
}

