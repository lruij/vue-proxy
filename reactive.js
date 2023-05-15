import { track, trigger } from './effect.js';
const isObject = target => target != null && typeof target == 'object';
export const reactive = (target) => {
    return new Proxy(target, {
        get(target, p, receiver) {
            let res = Reflect.get(target, p, receiver);
            track(target, p);
            if (isObject(res)) {
                return reactive(res);
            }
            return res;
        },
        set(target, p, value, receiver) {
            let res = Reflect.set(target, p, value, receiver);
            trigger(target, p);
            return res;
        }
    });
};
