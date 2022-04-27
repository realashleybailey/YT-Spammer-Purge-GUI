export interface Options {
  type?: string
  isDetailed?: boolean
  hideLeader?: boolean
  hideTime?: boolean
  hideTitle?: boolean
  hideTiming?: boolean
  hideSeparator?: boolean
  hideMessage?: boolean
  separator?: string
  leader?: string
}

export interface LogFunction {
  (message: string, title: string, options?: Options): void
}

export interface MyConsole {
  log: LogFunction
  debug: LogFunction
  info: LogFunction
  warn: LogFunction
  error: LogFunction
  success: LogFunction
}
