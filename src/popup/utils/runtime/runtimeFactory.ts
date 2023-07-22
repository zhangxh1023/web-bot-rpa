import { ChromeRuntime } from './chrome';
import type { RuntimeInterface } from './runtimeInterface';

export class RuntimeFactory {
  public static getRuntime(): RuntimeInterface {
    // todo: firefox, edge ...
    return ChromeRuntime.getInstance();
  }
}
