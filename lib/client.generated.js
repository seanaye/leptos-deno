// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file
// source-hash: bad04344bb64cf471e21f0976d75a75f7cff3687
let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) {
  return heap[idx];
}

let heap_next = heap.length;

function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

const cachedTextDecoder = new TextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder("utf-8");

const encodeString = function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
};

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

function isLikeNone(x) {
  return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
  if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
    cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
  }
  return cachedFloat64Memory0;
}

function debugString(val) {
  // primitive types
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  // objects
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  // Test for built-in
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    // Failed to match the standard '[object ClassName]'
    return toString.call(val);
  }
  if (className == "Object") {
    // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  // errors
  if (val instanceof Error) {
    return `${val.name}: ${val.message}\n${val.stack}`;
  }
  // TODO we could test for more things here, like `Set`s and `Map`s.
  return className;
}

const CLOSURE_DTORS = new FinalizationRegistry((state) => {
  wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
});

function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    // First up with a closure we increment the internal reference
    // count. This ensures that the Rust closure environment won't
    // be deallocated while we're invoking it.
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
        CLOSURE_DTORS.unregister(state);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function __wbg_adapter_38(arg0, arg1, arg2) {
  wasm
    ._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h3a9843e1cc43c00b(
      arg0,
      arg1,
      addHeapObject(arg2),
    );
}

function __wbg_adapter_41(arg0, arg1, arg2) {
  wasm
    ._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h3bb544ea3d9a08d3(
      arg0,
      arg1,
      addHeapObject(arg2),
    );
}

/** */
export function hydrate() {
  wasm.hydrate();
}

function getCachedStringFromWasm0(ptr, len) {
  if (ptr === 0) {
    return getObject(len);
  } else {
    return getStringFromWasm0(ptr, len);
  }
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}

const imports = {
  __wbindgen_placeholder__: {
    __wbindgen_object_drop_ref: function (arg0) {
      takeObject(arg0);
    },
    __wbindgen_object_clone_ref: function (arg0) {
      const ret = getObject(arg0);
      return addHeapObject(ret);
    },
    __wbindgen_string_new: function (arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1);
      return addHeapObject(ret);
    },
    __wbg_new_abda76e883ba8a5f: function () {
      const ret = new Error();
      return addHeapObject(ret);
    },
    __wbg_stack_658279fe44541cf6: function (arg0, arg1) {
      const ret = getObject(arg1).stack;
      const ptr0 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbg_error_f851667af71bcfc6: function (arg0, arg1) {
      var v0 = getCachedStringFromWasm0(arg0, arg1);
      if (arg0 !== 0) wasm.__wbindgen_free(arg0, arg1);
      console.error(v0);
    },
    __wbindgen_jsval_eq: function (arg0, arg1) {
      const ret = getObject(arg0) === getObject(arg1);
      return ret;
    },
    __wbindgen_is_undefined: function (arg0) {
      const ret = getObject(arg0) === undefined;
      return ret;
    },
    __wbindgen_is_null: function (arg0) {
      const ret = getObject(arg0) === null;
      return ret;
    },
    __wbindgen_is_falsy: function (arg0) {
      const ret = !getObject(arg0);
      return ret;
    },
    __wbindgen_error_new: function (arg0, arg1) {
      const ret = new Error(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    },
    __wbindgen_string_get: function (arg0, arg1) {
      const obj = getObject(arg1);
      const ret = typeof (obj) === "string" ? obj : undefined;
      var ptr0 = isLikeNone(ret)
        ? 0
        : passStringToWasm0(
          ret,
          wasm.__wbindgen_malloc,
          wasm.__wbindgen_realloc,
        );
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbindgen_is_object: function (arg0) {
      const val = getObject(arg0);
      const ret = typeof (val) === "object" && val !== null;
      return ret;
    },
    __wbindgen_in: function (arg0, arg1) {
      const ret = getObject(arg0) in getObject(arg1);
      return ret;
    },
    __wbindgen_jsval_loose_eq: function (arg0, arg1) {
      const ret = getObject(arg0) == getObject(arg1);
      return ret;
    },
    __wbindgen_boolean_get: function (arg0) {
      const v = getObject(arg0);
      const ret = typeof (v) === "boolean" ? (v ? 1 : 0) : 2;
      return ret;
    },
    __wbindgen_number_get: function (arg0, arg1) {
      const obj = getObject(arg1);
      const ret = typeof (obj) === "number" ? obj : undefined;
      getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
      getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    },
    __wbg_getwithrefkey_15c62c2b8546208d: function (arg0, arg1) {
      const ret = getObject(arg0)[getObject(arg1)];
      return addHeapObject(ret);
    },
    __wbg_instanceof_Window_e266f02eee43b570: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Window;
      } catch {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_document_950215a728589a2d: function (arg0) {
      const ret = getObject(arg0).document;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_body_be46234bb33edd63: function (arg0) {
      const ret = getObject(arg0).body;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_createComment_2b861fdef485248f: function (arg0, arg1, arg2) {
      var v0 = getCachedStringFromWasm0(arg1, arg2);
      const ret = getObject(arg0).createComment(v0);
      return addHeapObject(ret);
    },
    __wbg_createDocumentFragment_f4eafb8014772cae: function (arg0) {
      const ret = getObject(arg0).createDocumentFragment();
      return addHeapObject(ret);
    },
    __wbg_createElement_e2a0e21263eb5416: function () {
      return handleError(function (arg0, arg1, arg2) {
        var v0 = getCachedStringFromWasm0(arg1, arg2);
        const ret = getObject(arg0).createElement(v0);
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_createTextNode_866e33a51b47f04c: function (arg0, arg1, arg2) {
      var v0 = getCachedStringFromWasm0(arg1, arg2);
      const ret = getObject(arg0).createTextNode(v0);
      return addHeapObject(ret);
    },
    __wbg_createTreeWalker_01d86eb08d6e8d47: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).createTreeWalker(
          getObject(arg1),
          arg2 >>> 0,
        );
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_getElementById_eb93a47327bb5585: function (arg0, arg1, arg2) {
      var v0 = getCachedStringFromWasm0(arg1, arg2);
      const ret = getObject(arg0).getElementById(v0);
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_querySelector_32b9d7ebb2df951d: function () {
      return handleError(function (arg0, arg1, arg2) {
        var v0 = getCachedStringFromWasm0(arg1, arg2);
        const ret = getObject(arg0).querySelector(v0);
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
      }, arguments);
    },
    __wbg_append_1c82a9a28ac2b2c3: function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).append(getObject(arg1));
      }, arguments);
    },
    __wbg_target_b629c177f9bee3da: function (arg0) {
      const ret = getObject(arg0).target;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_cancelBubble_c9a8182589205d54: function (arg0) {
      const ret = getObject(arg0).cancelBubble;
      return ret;
    },
    __wbg_composedPath_d4428cc409ddd3e6: function (arg0) {
      const ret = getObject(arg0).composedPath();
      return addHeapObject(ret);
    },
    __wbg_instanceof_Node_abf5312af68f179e: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Node;
      } catch {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_parentNode_e81e6d5dc2fc35b0: function (arg0) {
      const ret = getObject(arg0).parentNode;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_childNodes_40585508577e98df: function (arg0) {
      const ret = getObject(arg0).childNodes;
      return addHeapObject(ret);
    },
    __wbg_previousSibling_14035f649df13849: function (arg0) {
      const ret = getObject(arg0).previousSibling;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_nextSibling_653f43ab9380175f: function (arg0) {
      const ret = getObject(arg0).nextSibling;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_textContent_dff59ad5e030bb86: function (arg0, arg1) {
      const ret = getObject(arg1).textContent;
      var ptr0 = isLikeNone(ret)
        ? 0
        : passStringToWasm0(
          ret,
          wasm.__wbindgen_malloc,
          wasm.__wbindgen_realloc,
        );
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbg_appendChild_b8199dc1655c852d: function () {
      return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).appendChild(getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_cloneNode_0510297160b598be: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).cloneNode();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_addEventListener_615d4590d38da1c9: function () {
      return handleError(function (arg0, arg1, arg2, arg3) {
        var v0 = getCachedStringFromWasm0(arg1, arg2);
        getObject(arg0).addEventListener(v0, getObject(arg3));
      }, arguments);
    },
    __wbg_removeAttribute_ad7a5bf2eed30373: function () {
      return handleError(function (arg0, arg1, arg2) {
        var v0 = getCachedStringFromWasm0(arg1, arg2);
        getObject(arg0).removeAttribute(v0);
      }, arguments);
    },
    __wbg_before_44f875c751453be4: function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).before(getObject(arg1));
      }, arguments);
    },
    __wbg_remove_b18bc815630b67ec: function (arg0) {
      getObject(arg0).remove();
    },
    __wbg_length_c54fcfc679a5bfbd: function (arg0) {
      const ret = getObject(arg0).length;
      return ret;
    },
    __wbg_setdata_c26e68878a7d634c: function (arg0, arg1, arg2) {
      var v0 = getCachedStringFromWasm0(arg1, arg2);
      getObject(arg0).data = v0;
    },
    __wbg_before_e11d7f9398d1334d: function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).before(getObject(arg1));
      }, arguments);
    },
    __wbg_remove_f2f10b21db578dab: function (arg0) {
      getObject(arg0).remove();
    },
    __wbg_debug_8db2eed1bf6c1e2a: function (arg0) {
      console.debug(getObject(arg0));
    },
    __wbg_error_fe807da27c4a4ced: function (arg0) {
      console.error(getObject(arg0));
    },
    __wbg_info_9e6db45ac337c3b5: function (arg0) {
      console.info(getObject(arg0));
    },
    __wbg_log_7bb108d119bafbc1: function (arg0) {
      console.log(getObject(arg0));
    },
    __wbg_log_d047cf0648d2678e: function (arg0, arg1) {
      console.log(getObject(arg0), getObject(arg1));
    },
    __wbg_warn_e57696dbb3977030: function (arg0) {
      console.warn(getObject(arg0));
    },
    __wbg_nextNode_8b656aba7fde94a8: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).nextNode();
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
      }, arguments);
    },
    __wbg_get_27fe3dac1c4d0224: function (arg0, arg1) {
      const ret = getObject(arg0)[arg1 >>> 0];
      return addHeapObject(ret);
    },
    __wbg_length_e498fbc24f9c1d4f: function (arg0) {
      const ret = getObject(arg0).length;
      return ret;
    },
    __wbindgen_is_function: function (arg0) {
      const ret = typeof (getObject(arg0)) === "function";
      return ret;
    },
    __wbg_newnoargs_2b8b6bd7753c76ba: function (arg0, arg1) {
      var v0 = getCachedStringFromWasm0(arg0, arg1);
      const ret = new Function(v0);
      return addHeapObject(ret);
    },
    __wbg_next_b7d530c04fd8b217: function (arg0) {
      const ret = getObject(arg0).next;
      return addHeapObject(ret);
    },
    __wbg_next_88560ec06a094dea: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_done_1ebec03bbd919843: function (arg0) {
      const ret = getObject(arg0).done;
      return ret;
    },
    __wbg_value_6ac8da5cc5b3efda: function (arg0) {
      const ret = getObject(arg0).value;
      return addHeapObject(ret);
    },
    __wbg_iterator_55f114446221aa5a: function () {
      const ret = Symbol.iterator;
      return addHeapObject(ret);
    },
    __wbg_get_baf4855f9a986186: function () {
      return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_call_95d1ea488d03e4e8: function () {
      return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_self_e7c1f827057f6584: function () {
      return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_window_a09ec664e14b1b81: function () {
      return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_globalThis_87cbb8506fecf3a9: function () {
      return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_global_c85a9259e621f3db: function () {
      return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_isArray_39d28997bf6b96b4: function (arg0) {
      const ret = Array.isArray(getObject(arg0));
      return ret;
    },
    __wbg_instanceof_ArrayBuffer_a69f02ee4c4f5065: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof ArrayBuffer;
      } catch {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_call_9495de66fdbe016b: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_isSafeInteger_8c4789029e885159: function (arg0) {
      const ret = Number.isSafeInteger(getObject(arg0));
      return ret;
    },
    __wbg_entries_4e1315b774245952: function (arg0) {
      const ret = Object.entries(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_is_8f1618fe9a4fd388: function (arg0, arg1) {
      const ret = Object.is(getObject(arg0), getObject(arg1));
      return ret;
    },
    __wbg_buffer_cf65c07de34b9a08: function (arg0) {
      const ret = getObject(arg0).buffer;
      return addHeapObject(ret);
    },
    __wbg_new_537b7341ce90bb31: function (arg0) {
      const ret = new Uint8Array(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_set_17499e8aa4003ebd: function (arg0, arg1, arg2) {
      getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    },
    __wbg_length_27a2afe8ab42b09f: function (arg0) {
      const ret = getObject(arg0).length;
      return ret;
    },
    __wbg_instanceof_Uint8Array_01cebe79ca606cca: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Uint8Array;
      } catch {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_set_6aa458a4ebdb65cb: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(
          getObject(arg0),
          getObject(arg1),
          getObject(arg2),
        );
        return ret;
      }, arguments);
    },
    __wbindgen_debug_string: function (arg0, arg1) {
      const ret = debugString(getObject(arg1));
      const ptr0 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbindgen_throw: function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
    __wbindgen_memory: function () {
      const ret = wasm.memory;
      return addHeapObject(ret);
    },
    __wbindgen_closure_wrapper241: function (arg0, arg1, arg2) {
      const ret = makeMutClosure(arg0, arg1, 71, __wbg_adapter_38);
      return addHeapObject(ret);
    },
    __wbindgen_closure_wrapper305: function (arg0, arg1, arg2) {
      const ret = makeMutClosure(arg0, arg1, 104, __wbg_adapter_41);
      return addHeapObject(ret);
    },
  },
};

/**
 * Decompression callback
 *
 * @callback DecompressCallback
 * @param {Uint8Array} compressed
 * @return {Uint8Array} decompressed
 */

/**
 * Options for instantiating a Wasm instance.
 * @typedef {Object} InstantiateOptions
 * @property {URL=} url - Optional url to the Wasm file to instantiate.
 * @property {DecompressCallback=} decompress - Callback to decompress the
 * raw Wasm file bytes before instantiating.
 */

/** Instantiates an instance of the Wasm module returning its functions.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 */
export async function instantiate(opts) {
  return (await instantiateWithInstance(opts)).exports;
}

let instanceWithExports;
let lastLoadPromise;

/** Instantiates an instance of the Wasm module along with its exports.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 * @returns {Promise<{
 *   instance: WebAssembly.Instance;
 *   exports: { hydrate: typeof hydrate }
 * }>}
 */
export function instantiateWithInstance(opts) {
  if (instanceWithExports != null) {
    return Promise.resolve(instanceWithExports);
  }
  if (lastLoadPromise == null) {
    lastLoadPromise = (async () => {
      try {
        const instance = (await instantiateModule(opts ?? {})).instance;
        wasm = instance.exports;
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
        instanceWithExports = {
          instance,
          exports: getWasmInstanceExports(),
        };
        return instanceWithExports;
      } finally {
        lastLoadPromise = null;
      }
    })();
  }
  return lastLoadPromise;
}

function getWasmInstanceExports() {
  return { hydrate };
}

/** Gets if the Wasm module has been instantiated. */
export function isInstantiated() {
  return instanceWithExports != null;
}

/**
 * @param {InstantiateOptions} opts
 */
async function instantiateModule(opts) {
  const wasmUrl = opts.url ?? new URL("client_bg.wasm", import.meta.url);
  const decompress = opts.decompress;
  const isFile = wasmUrl.protocol === "file:";

  // make file urls work in Node via dnt
  const isNode = globalThis.process?.versions?.node != null;
  if (isNode && isFile) {
    // the deno global will be shimmed by dnt
    const wasmCode = await Deno.readFile(wasmUrl);
    return WebAssembly.instantiate(
      decompress ? decompress(wasmCode) : wasmCode,
      imports,
    );
  }

  switch (wasmUrl.protocol) {
    case "file:":
    case "https:":
    case "http:": {
      if (isFile) {
        if (typeof Deno !== "object") {
          throw new Error("file urls are not supported in this environment");
        }
        if ("permissions" in Deno) {
          await Deno.permissions.request({ name: "read", path: wasmUrl });
        }
      } else if (typeof Deno === "object" && "permissions" in Deno) {
        await Deno.permissions.request({ name: "net", host: wasmUrl.host });
      }
      const wasmResponse = await fetch(wasmUrl);
      if (decompress) {
        const wasmCode = new Uint8Array(await wasmResponse.arrayBuffer());
        return WebAssembly.instantiate(decompress(wasmCode), imports);
      }
      if (
        isFile ||
        wasmResponse.headers.get("content-type")?.toLowerCase()
          .startsWith("application/wasm")
      ) {
        return WebAssembly.instantiateStreaming(wasmResponse, imports);
      } else {
        return WebAssembly.instantiate(
          await wasmResponse.arrayBuffer(),
          imports,
        );
      }
    }
    default:
      throw new Error(`Unsupported protocol: ${wasmUrl.protocol}`);
  }
}
