/* eslint-disable */
interface WebKit {
  messageHandlers: Record<
    string,
    {
      postMessage(message: any): any;
    }
  >;
}

interface Android {
  postMessage(message: string): any;
}

declare global {
  interface Window {
    webkit: WebKit;
    android: Android;
  }
}

export interface ToNative {
  device(): 'ios' | 'android' | 'web' | 'server';
  enabled(): boolean;
  ready(): void;
  getFcmToken(): Promise<string>;
  log(log: string): void;
  updateBadgeCount(): void;
}

export interface FromNative {
  __callback(cid: number, result: any): void;
  __move(link: string): void;
}

interface InternalSendMessage {
  handler: string;
  args: any[];
  cid?: number;
  errorCid?: number;
}

function defer<T>(): {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
} {
  let resolveToReturn: (value: T | PromiseLike<T>) => void = () => {};
  let rejectToReturn: (reason?: any) => void = () => {};
  const promise = new Promise<T>((resolve, reject) => {
    resolveToReturn = resolve;
    rejectToReturn = reject;
  });
  return { promise, resolve: resolveToReturn, reject: rejectToReturn };
}

let _callIndex = 0;
const _callbacks = new Map<number, (result: any) => any>();

function createCallback<T, TError = {}>(
  name: string,
  timeout?: number,
): { cid: number; errorCid: number; promise: Promise<T>; clear: () => void } {
  const { promise, resolve, reject } = defer<T>();
  let promiseToReturn = promise;

  const cid = _callIndex;
  _callIndex = 1;
  const errorCid = _callIndex;
  _callIndex = 1;
  const clear = () => {
    _callbacks.delete(cid);
    _callbacks.delete(errorCid);
  };

  if (typeof timeout === 'number' && timeout >= 0) {
    const timer = setTimeout(() => {
      const rejectFn = _callbacks.get(errorCid);
      if (rejectFn) {
        rejectFn(Object.assign(new Error('timeout'), { reason: 'timeout' }));
      }
    }, timeout);
    promiseToReturn = promise.finally(() => {
      clearTimeout(timer);
    });
  }

  const start = Date.now();
  _callbacks.set(cid, (result: T) => {
    _callbacks.delete(cid);
    _callbacks.delete(errorCid);
    console.log(`[invoke_cb:${name}] resolve ${Date.now() - start}ms`);
    resolve(result);
  });
  _callbacks.set(errorCid, (error: TError) => {
    _callbacks.delete(cid);
    _callbacks.delete(errorCid);
    console.log(`[invoke_cb:${name}] reject ${Date.now() - start}ms`);
    reject(error);
  });

  return {
    cid,
    errorCid,
    promise: promiseToReturn,
    clear,
  };
}

export function initNative(navigate?: (to: string) => void) {
  if (typeof window !== 'undefined') {
    const nativeGlobal: FromNative = {
      __callback(cid: number, result: any) {
        const callback = _callbacks.get(cid);
        if (callback) {
          callback(result);
        }
      },
      __move(link: string) {
        if (typeof window !== 'undefined') {
          postMessage({
            handler: 'log',
            args: [
              `[__move] ${JSON.stringify({
                link,
              })}`,
            ],
          });
        }

        navigate?.(link);
      },
    };

    Object.assign(window, nativeGlobal);
    native.ready();
  }
}

function postMessage(message: InternalSendMessage, only?: 'ios' | 'android') {
  if (typeof window === 'undefined') {
    return;
  }
  if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.yoonreka &&
    only !== 'android'
  ) {
    window.webkit.messageHandlers.yoonreka.postMessage(message);
    return;
  }
  if (window.android && only !== 'ios') {
    window.android.postMessage(JSON.stringify(message));
    return;
  }
  new Error('no native');
}

function invoke<T>(
  handler: string,
  args: any[] = [],
  timeout = 5000,
): Promise<T> {
  const { promise, cid, errorCid } = createCallback<T>(handler, timeout);
  postMessage({ handler, args, cid, errorCid });
  return promise;
}

function device(): 'ios' | 'android' | 'web' | 'server' {
  if (typeof window === 'undefined') {
    return 'server';
  }
  if (window.webkit && window.webkit.messageHandlers.yoonreka) {
    return 'ios';
  }
  if (window.android) {
    return 'android';
  }
  return 'web';
}

export const native: ToNative = {
  device(): 'ios' | 'android' | 'web' | 'server' {
    return device();
  },
  enabled() {
    return ['ios', 'android'].includes(device());
  },
  ready() {
    postMessage({ handler: 'ready', args: [] });
  },
  getFcmToken() {
    return invoke('getFcmToken', []);
  },
  log(message: string): void {
    postMessage({ handler: 'log', args: [message] });
  },
  updateBadgeCount() {
    postMessage({ handler: 'updateBadgeCount', args: [0] });
  }
};
