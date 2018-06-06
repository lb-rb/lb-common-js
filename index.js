import 'es5-shim'
import 'es6-shim'

export function decodeHTML(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}


function mapHTML(obj) {
  if(isString(obj))
    return decodeHTML(decodeHTML(obj))
  return obj
}

function isString(val) {
  return typeof val === 'string' || (
    (!!val && typeof val === 'object') &&
      Object.prototype.toString.call(val) === '[object String]'
    );
}

export function deepDecodeHTML(json) {
  return deepMap(json, mapHTML)
}

function mapObject(obj, fn) {
  return Object.keys(obj).reduce(
    (res, key) => {
      res[key] = fn(obj[key]);
      return res;
    },
    {}
  )
}

function deepMap(obj, fn) {
  const deepMapper = val => typeof val === 'object' ? deepMap(val, fn) : fn(val);
  if(obj != null) {
    if (Array.isArray(obj)) {
      return obj.map(deepMapper);
    }
    if (typeof obj === 'object') {
      return mapObject(obj, deepMapper);
    }
  }
  return obj;
}

export function parseFormProps(props) {
  var element = document.createElement("div")
  element.innerHTML = props.substring(4)
  return JSON.parse(element.innerHTML)
}
