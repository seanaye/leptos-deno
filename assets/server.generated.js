// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file
// source-hash: c401fb707bdd2cd2e538fec2a7124ea1aaad31fa
let wasm;

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

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

function getObject(idx) {
  return heap[idx];
}

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
function __wbg_adapter_22(arg0, arg1) {
  wasm
    ._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbecb91162ab927fa(
      arg0,
      arg1,
    );
}

function __wbg_adapter_25(arg0, arg1, arg2) {
  wasm
    ._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hfa2ace6e7d6b2114(
      arg0,
      arg1,
      addHeapObject(arg2),
    );
}

/**
 * @param {Request} req
 * @returns {Promise<Response>}
 */
export function main(req) {
  const ret = wasm.main(addHeapObject(req));
  return takeObject(ret);
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

function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
function __wbg_adapter_141(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen__convert__closures__invoke2_mut__h26bad35eb84561e5(
    arg0,
    arg1,
    addHeapObject(arg2),
    addHeapObject(arg3),
  );
}

const IntoUnderlyingByteSourceFinalization = new FinalizationRegistry((ptr) =>
  wasm.__wbg_intounderlyingbytesource_free(ptr)
);
/** */
export class IntoUnderlyingByteSource {
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    IntoUnderlyingByteSourceFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingbytesource_free(ptr);
  }
  /**
   * @returns {string}
   */
  get type() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.intounderlyingbytesource_type(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getCachedStringFromWasm0(r0, r1);
      if (r0 !== 0) wasm.__wbindgen_free(r0, r1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {number}
   */
  get autoAllocateChunkSize() {
    const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.ptr);
    return ret >>> 0;
  }
  /**
   * @param {any} controller
   */
  start(controller) {
    wasm.intounderlyingbytesource_start(this.ptr, addHeapObject(controller));
  }
  /**
   * @param {any} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingbytesource_pull(
      this.ptr,
      addHeapObject(controller),
    );
    return takeObject(ret);
  }
  /** */
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingbytesource_cancel(ptr);
  }
}

const IntoUnderlyingSinkFinalization = new FinalizationRegistry((ptr) =>
  wasm.__wbg_intounderlyingsink_free(ptr)
);
/** */
export class IntoUnderlyingSink {
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    IntoUnderlyingSinkFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsink_free(ptr);
  }
  /**
   * @param {any} chunk
   * @returns {Promise<any>}
   */
  write(chunk) {
    const ret = wasm.intounderlyingsink_write(this.ptr, addHeapObject(chunk));
    return takeObject(ret);
  }
  /**
   * @returns {Promise<any>}
   */
  close() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_close(ptr);
    return takeObject(ret);
  }
  /**
   * @param {any} reason
   * @returns {Promise<any>}
   */
  abort(reason) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_abort(ptr, addHeapObject(reason));
    return takeObject(ret);
  }
}

const IntoUnderlyingSourceFinalization = new FinalizationRegistry((ptr) =>
  wasm.__wbg_intounderlyingsource_free(ptr)
);
/** */
export class IntoUnderlyingSource {
  static __wrap(ptr) {
    const obj = Object.create(IntoUnderlyingSource.prototype);
    obj.ptr = ptr;
    IntoUnderlyingSourceFinalization.register(obj, obj.ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    IntoUnderlyingSourceFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsource_free(ptr);
  }
  /**
   * @param {any} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingsource_pull(
      this.ptr,
      addHeapObject(controller),
    );
    return takeObject(ret);
  }
  /** */
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingsource_cancel(ptr);
  }
}

const PipeOptionsFinalization = new FinalizationRegistry((ptr) =>
  wasm.__wbg_pipeoptions_free(ptr)
);
/**
 * Raw options for [`pipeTo()`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/pipeTo).
 */
export class PipeOptions {
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    PipeOptionsFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_pipeoptions_free(ptr);
  }
  /**
   * @returns {boolean}
   */
  get preventClose() {
    const ret = wasm.pipeoptions_preventClose(this.ptr);
    return ret !== 0;
  }
  /**
   * @returns {boolean}
   */
  get preventCancel() {
    const ret = wasm.pipeoptions_preventCancel(this.ptr);
    return ret !== 0;
  }
  /**
   * @returns {boolean}
   */
  get preventAbort() {
    const ret = wasm.pipeoptions_preventAbort(this.ptr);
    return ret !== 0;
  }
  /**
   * @returns {AbortSignal | undefined}
   */
  get signal() {
    const ret = wasm.pipeoptions_signal(this.ptr);
    return takeObject(ret);
  }
}

const QueuingStrategyFinalization = new FinalizationRegistry((ptr) =>
  wasm.__wbg_queuingstrategy_free(ptr)
);
/** */
export class QueuingStrategy {
  static __wrap(ptr) {
    const obj = Object.create(QueuingStrategy.prototype);
    obj.ptr = ptr;
    QueuingStrategyFinalization.register(obj, obj.ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    QueuingStrategyFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_queuingstrategy_free(ptr);
  }
  /**
   * @returns {number}
   */
  get highWaterMark() {
    const ret = wasm.queuingstrategy_highWaterMark(this.ptr);
    return ret;
  }
}

const ReadableStreamGetReaderOptionsFinalization = new FinalizationRegistry(
  (ptr) => wasm.__wbg_readablestreamgetreaderoptions_free(ptr)
);
/**
 * Raw options for [`getReader()`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader).
 */
export class ReadableStreamGetReaderOptions {
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    ReadableStreamGetReaderOptionsFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_readablestreamgetreaderoptions_free(ptr);
  }
  /**
   * @returns {any}
   */
  get mode() {
    const ret = wasm.readablestreamgetreaderoptions_mode(this.ptr);
    return takeObject(ret);
  }
}

const imports = {
  __wbindgen_placeholder__: {
    __wbindgen_error_new: function (arg0, arg1) {
      const ret = new Error(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    },
    __wbindgen_object_drop_ref: function (arg0) {
      takeObject(arg0);
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
    __wbg_newwithsource_620c192b0682807b: function (arg0, arg1) {
      const ret = new ReadableStream(
        IntoUnderlyingSource.__wrap(arg0),
        QueuingStrategy.__wrap(arg1),
      );
      return addHeapObject(ret);
    },
    __wbg_close_e9110ca16e2567db: function (arg0) {
      getObject(arg0).close();
    },
    __wbg_enqueue_d71a1a518e21f5c3: function (arg0, arg1) {
      getObject(arg0).enqueue(getObject(arg1));
    },
    __wbg_byobRequest_08c18cee35def1f4: function (arg0) {
      const ret = getObject(arg0).byobRequest;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_close_da7e6fb9d9851e5a: function (arg0) {
      getObject(arg0).close();
    },
    __wbg_view_231340b0dd8a2484: function (arg0) {
      const ret = getObject(arg0).view;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_respond_8fadc5f5c9d95422: function (arg0, arg1) {
      getObject(arg0).respond(arg1 >>> 0);
    },
    __wbg_buffer_4e79326814bdd393: function (arg0) {
      const ret = getObject(arg0).buffer;
      return addHeapObject(ret);
    },
    __wbg_byteOffset_b69b0a07afccce19: function (arg0) {
      const ret = getObject(arg0).byteOffset;
      return ret;
    },
    __wbg_byteLength_5299848ed3264181: function (arg0) {
      const ret = getObject(arg0).byteLength;
      return ret;
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
    __wbindgen_string_new: function (arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1);
      return addHeapObject(ret);
    },
    __wbindgen_object_clone_ref: function (arg0) {
      const ret = getObject(arg0);
      return addHeapObject(ret);
    },
    __wbindgen_cb_drop: function (arg0) {
      const obj = takeObject(arg0).original;
      if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
      }
      const ret = false;
      return ret;
    },
    __wbindgen_is_undefined: function (arg0) {
      const ret = getObject(arg0) === undefined;
      return ret;
    },
    __wbg_clearTimeout_76877dbc010e786d: function (arg0) {
      const ret = clearTimeout(takeObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_setTimeout_75cb9b6991a4031d: function () {
      return handleError(function (arg0, arg1) {
        const ret = setTimeout(getObject(arg0), arg1);
        return addHeapObject(ret);
      }, arguments);
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
    __wbg_fetch_465e8cb61a0f43ea: function (arg0, arg1) {
      const ret = getObject(arg0).fetch(getObject(arg1));
      return addHeapObject(ret);
    },
    __wbg_new_13cda049130ea17b: function () {
      return handleError(function () {
        const ret = new URLSearchParams();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_new_f1c3a9c2533a55b8: function () {
      return handleError(function () {
        const ret = new Headers();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_set_a5d34c36a1a4ebd1: function () {
      return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        var v0 = getCachedStringFromWasm0(arg1, arg2);
        var v1 = getCachedStringFromWasm0(arg3, arg4);
        getObject(arg0).set(v0, v1);
      }, arguments);
    },
    __wbg_instanceof_Response_fb3a4df648c1859b: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Response;
      } catch {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_newwithoptblobandinit_56cadb2dbf89a4c7: function () {
      return handleError(function (arg0, arg1) {
        const ret = new Response(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_newwithoptbuffersourceandinit_4d2fa6d435ff2a63: function () {
      return handleError(function (arg0, arg1) {
        const ret = new Response(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_newwithoptu8arrayandinit_a2ac6fcf33b4f23f: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = new Response(
          arg0 === 0 ? undefined : getArrayU8FromWasm0(arg0, arg1),
          getObject(arg2),
        );
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_newwithoptformdataandinit_3ec9e7ec62330fdc: function () {
      return handleError(function (arg0, arg1) {
        const ret = new Response(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_newwithopturlsearchparamsandinit_389a66264c064a49: function () {
      return handleError(function (arg0, arg1) {
        const ret = new Response(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_newwithoptstrandinit_1a4621d99c54e7c3: function () {
      return handleError(function (arg0, arg1, arg2) {
        var v0 = getCachedStringFromWasm0(arg0, arg1);
        const ret = new Response(v0, getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_newwithoptreadablestreamandinit_a0b4dc209bd176be: function () {
      return handleError(function (arg0, arg1) {
        const ret = new Response(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_text_f61464d781b099f0: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).text();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_new_a16bcd3b8d000a4f: function () {
      return handleError(function () {
        const ret = new AbortController();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_abort_5f06bf3b2954cf33: function (arg0) {
      getObject(arg0).abort();
    },
    __wbg_search_8b081e18a33be3ec: function (arg0, arg1) {
      const ret = getObject(arg1).search;
      const ptr0 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbg_setsearch_c5edb3dd1ea7f11f: function (arg0, arg1, arg2) {
      var v0 = getCachedStringFromWasm0(arg1, arg2);
      getObject(arg0).search = v0;
    },
    __wbg_new_2f2799a1c9c648e4: function () {
      return handleError(function (arg0, arg1) {
        var v0 = getCachedStringFromWasm0(arg0, arg1);
        const ret = new URL(v0);
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_instanceof_WorkerGlobalScope_88015ad1ebb92b29: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof WorkerGlobalScope;
      } catch {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_fetch_661ffba2a4f2519c: function (arg0, arg1) {
      const ret = getObject(arg0).fetch(getObject(arg1));
      return addHeapObject(ret);
    },
    __wbg_url_bd2775644ef804ec: function (arg0, arg1) {
      const ret = getObject(arg1).url;
      const ptr0 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbg_newwithstr_533a2b691cd87b92: function () {
      return handleError(function (arg0, arg1) {
        var v0 = getCachedStringFromWasm0(arg0, arg1);
        const ret = new Request(v0);
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_newwithstrandinit_c45f0dc6da26fd03: function () {
      return handleError(function (arg0, arg1, arg2) {
        var v0 = getCachedStringFromWasm0(arg0, arg1);
        const ret = new Request(v0, getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_newnoargs_2b8b6bd7753c76ba: function (arg0, arg1) {
      var v0 = getCachedStringFromWasm0(arg0, arg1);
      const ret = new Function(v0);
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
    __wbg_new_f9876326328f45ed: function () {
      const ret = new Object();
      return addHeapObject(ret);
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
    __wbg_instanceof_Error_749a7378f4439ee0: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Error;
      } catch {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_new_15d3966e9981a196: function (arg0, arg1) {
      var v0 = getCachedStringFromWasm0(arg0, arg1);
      const ret = new Error(v0);
      return addHeapObject(ret);
    },
    __wbg_message_a95c3ef248e4b57a: function (arg0) {
      const ret = getObject(arg0).message;
      return addHeapObject(ret);
    },
    __wbg_name_c69a20c4b1197dc0: function (arg0) {
      const ret = getObject(arg0).name;
      return addHeapObject(ret);
    },
    __wbg_toString_cec163b212643722: function (arg0) {
      const ret = getObject(arg0).toString();
      return addHeapObject(ret);
    },
    __wbg_call_9495de66fdbe016b: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_toString_8c529acfe543ce16: function (arg0) {
      const ret = getObject(arg0).toString();
      return addHeapObject(ret);
    },
    __wbg_new_9d3a9ce4282a18a8: function (arg0, arg1) {
      try {
        var state0 = { a: arg0, b: arg1 };
        var cb0 = (arg0, arg1) => {
          const a = state0.a;
          state0.a = 0;
          try {
            return __wbg_adapter_141(a, state0.b, arg0, arg1);
          } finally {
            state0.a = a;
          }
        };
        const ret = new Promise(cb0);
        return addHeapObject(ret);
      } finally {
        state0.a = state0.b = 0;
      }
    },
    __wbg_resolve_fd40f858d9db1a04: function (arg0) {
      const ret = Promise.resolve(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_then_ec5db6d509eb475f: function (arg0, arg1) {
      const ret = getObject(arg0).then(getObject(arg1));
      return addHeapObject(ret);
    },
    __wbg_then_f753623316e2873a: function (arg0, arg1, arg2) {
      const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    },
    __wbg_buffer_cf65c07de34b9a08: function (arg0) {
      const ret = getObject(arg0).buffer;
      return addHeapObject(ret);
    },
    __wbg_newwithbyteoffsetandlength_9fb2f11355ecadf5: function (
      arg0,
      arg1,
      arg2,
    ) {
      const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
      return addHeapObject(ret);
    },
    __wbg_set_17499e8aa4003ebd: function (arg0, arg1, arg2) {
      getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    },
    __wbg_length_27a2afe8ab42b09f: function (arg0) {
      const ret = getObject(arg0).length;
      return ret;
    },
    __wbg_newwithlength_b56c882b57805732: function (arg0) {
      const ret = new Uint8Array(arg0 >>> 0);
      return addHeapObject(ret);
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
    __wbindgen_closure_wrapper657: function (arg0, arg1, arg2) {
      const ret = makeMutClosure(arg0, arg1, 216, __wbg_adapter_22);
      return addHeapObject(ret);
    },
    __wbindgen_closure_wrapper2045: function (arg0, arg1, arg2) {
      const ret = makeMutClosure(arg0, arg1, 303, __wbg_adapter_25);
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
 *   exports: { main: typeof main; IntoUnderlyingByteSource : typeof IntoUnderlyingByteSource ; IntoUnderlyingSink : typeof IntoUnderlyingSink ; IntoUnderlyingSource : typeof IntoUnderlyingSource ; PipeOptions : typeof PipeOptions ; QueuingStrategy : typeof QueuingStrategy ; ReadableStreamGetReaderOptions : typeof ReadableStreamGetReaderOptions  }
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
  return {
    main,
    IntoUnderlyingByteSource,
    IntoUnderlyingSink,
    IntoUnderlyingSource,
    PipeOptions,
    QueuingStrategy,
    ReadableStreamGetReaderOptions,
  };
}

/** Gets if the Wasm module has been instantiated. */
export function isInstantiated() {
  return instanceWithExports != null;
}

/**
 * @param {InstantiateOptions} opts
 */
async function instantiateModule(opts) {
  const wasmUrl = opts.url ?? new URL("server_bg.wasm", import.meta.url);
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
