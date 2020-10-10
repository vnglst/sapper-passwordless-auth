export function isEmpty(obj: Object): Boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}