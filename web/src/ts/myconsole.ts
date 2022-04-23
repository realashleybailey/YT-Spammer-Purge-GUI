/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, differenceInMilliseconds } from "date-fns"

interface Options {
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

interface LogFunction {
  (message: string, title: string, options?: Options): void
}

// Messages array
const messages = []

// Default log styles
const logStyles = {
  default: "#868e96;",
  danger: "#dc3545;",
  info: "#0275D8;",
  success: "#25c88e;",
  warn: "#fd7e14;",
  seperator: "#adb5bd;"
}

const defaultOptions = {
  type: "default",
  isDetailed: false,
  hideLeader: false,
  hideTime: false,
  hideTitle: false,
  hideTiming: false,
  hideSeparator: false,
  hideMessage: false,
  separator: "•",
  leader: "►"
}

// Add a log to the messages array
const addLog = (message: { date: string; title: string; message: string; options: Options }) => messages.push(message as never)

const getConsoleDate = (isDetailed = false) => {
  const today = new Date()
  return isDetailed ? format(today, "MMMM Do yyyy @ HH:mm:ss") : format(today, "HH:mm:ss")
}

const getLastMessageMiliseconds = (title: string): number => {
  // Length of the messages array
  const messagesLength = messages.length

  // Initialize the lastMessageMilliseconds variable
  let lastMessageMiliseconds = 0

  // If the messages array is not empty
  if (messagesLength <= 0) {
    return 0
  }

  // Get the last message
  const lastMessage = messages[messagesLength - 1] as any

  // If the title is the same as the last message title
  if (lastMessage.title === title) {
    // Get the last message milliseconds
    lastMessageMiliseconds = Math.abs(differenceInMilliseconds(new Date(lastMessage.date), new Date()))

    // If the last message milliseconds is less than 2 second (2000 milliseconds) ago
    if (lastMessageMiliseconds < 2000) {
      // Set the last message date to string
      return lastMessageMiliseconds
    }
  }

  return 0
}

const getLastMessageMilisecondsRGB = (ms: number): string => {
  if (ms < 100) {
    // If ms is less than 100 then return success
    return logStyles.success
  } else if (ms < 500) {
    // If ms is less than 500 then return info
    return logStyles.default
  } else if (ms < 1000) {
    // If ms is less than 1000 then return warn
    return logStyles.warn
  } else if (ms < 2000) {
    // If ms is less than 2000 then return danger
    return logStyles.danger
  }

  return logStyles.default
}

const consoleMessage = (title: string, message: string, options: Options) => {
  // Get the console date and last message milliseconds
  const date = getConsoleDate(options.isDetailed)
  const lastMessageMiliseconds = getLastMessageMiliseconds(title)

  if (!options.type) {
    options.type = "default"
  }

  // Font Styles
  const fontWeight = "bold"
  const fontSize = 12
  const fontFamily = "sans-serif"

  // Get the log style if it exists else use the default style
  const defaultColor = logStyles.default
  const logColor = logStyles.hasOwnProperty(options.type) ? logStyles[options.type] : logStyles.default
  const scaleColor = getLastMessageMilisecondsRGB(lastMessageMiliseconds)
  const otherColor = logStyles.seperator

  // Color styles for each type
  const leaderColor = `color: ${defaultColor};`
  const dateColor = `color: ${defaultColor};`
  const titleColor = `color: ${logColor};`
  const timingColor = `color: ${scaleColor};`
  const separatorColor = `color: ${otherColor};`
  const messageColor = `color: ${defaultColor};`

  // Font Styles for each type
  const leaderFont = `font-weight: ${fontWeight}; font-size: ${fontSize - 4}px; font-family: ${fontFamily};`
  const dateFont = `font-weight: ${fontWeight}; font-size: ${fontSize}px; font-family: ${fontFamily};`
  const titleFont = `font-weight: ${fontWeight}; font-size: ${fontSize}px; font-family: ${fontFamily};`
  const timingFont = `font-weight: ${fontWeight}; font-size: ${fontSize}px; font-family: ${fontFamily};`
  const separatorFont = `font-weight: ${fontWeight}; font-size: ${fontSize}px; font-family: ${fontFamily};`
  const messageFont = `font-weight: ${fontWeight}; font-size: ${fontSize}px; font-family: ${fontFamily};`

  // Separater style and separator
  const leader = options.leader ? options.leader : defaultOptions.leader
  const milliseconds = lastMessageMiliseconds > 0 ? `${lastMessageMiliseconds}ms ` : ""
  const separator = options.separator ? options.separator : defaultOptions.separator

  // Global styles
  const globalStyle = "padding-top: 5px; padding-bottom: 5px"

  // Form style string
  const leaderStyle = `${leaderColor} ${leaderFont} ${globalStyle}`
  const dateStyle = `${dateColor} ${dateFont} ${globalStyle}`
  const titleStyle = `${titleColor} ${titleFont} ${globalStyle}`
  const timingStyle = `${timingColor} ${timingFont} ${globalStyle}`
  const separatorStyle = `${separatorColor} ${separatorFont} ${globalStyle}`
  const messageStyle = `${messageColor} ${messageFont} ${globalStyle}`

  const styles = [leaderStyle, dateStyle, separatorStyle, titleStyle, timingStyle, separatorStyle, messageStyle]
  let shift = 0

  let leaderString = `%c${leader}  `
  let dateString = `%c${date} %c- `
  let titleString = `%c${title} `
  let timingString = `%c${milliseconds}`
  let separatorString = `%c${separator} `
  let messageString = `%c${message}`

  if (options.hideLeader) {
    leaderString = ""
    styles.splice(0 - shift, 1)
    shift++
  }

  if (options.hideTime) {
    dateString = ""
    styles.splice(1 - shift, 2)
    shift++
  }

  if (options.hideTitle) {
    titleString = ""
    styles.splice(3 - shift, 1)
    shift += 1
  }

  if (options.hideTiming) {
    timingString = ""
    styles.splice(4 - shift, 1)
    shift++
  }

  if (options.hideSeparator) {
    separatorString = ""
    styles.splice(5 - shift, 1)
    shift++
  }

  if (options.hideMessage) {
    messageString = ""
    styles.splice(6 - shift, 1)
    shift++
  }

  // Log the message to the console
  // tslint:disable-next-line:max-line-length
  console.log(`${leaderString}${dateString}${titleString}${timingString}${separatorString}${messageString}`, ...styles)
}

const log: LogFunction = (title, message, options) => {
  if (localStorage.getItem("showConsole") === "true") {
    // Get the options else use the default options
    options = options || defaultOptions

    // Console the message
    consoleMessage(title, message, options)

    // Add the message to the messages array
    addLog({ date: new Date().toISOString(), title, message, options })
  }
}

interface MyConsole {
  log: LogFunction
  debug: LogFunction
  info: LogFunction
  warn: LogFunction
  error: LogFunction
  success: LogFunction
}

const myconsole: MyConsole = {
  log: (category: string, message: string, options: Options = {}) => {
    log(category, message, { type: "default", ...options })
  },
  debug: (category: string, message: string, options: Options = {}) => {
    log(category, message, { type: "default", ...options })
  },
  info: (category: string, message: string, options: Options = {}) => {
    log(category, message, { type: "info", ...options })
  },
  warn: (category: string, message: string, options: Options = {}) => {
    log(category, message, { type: "warn", ...options })
  },
  error: (category: string, message: string, options: Options = {}) => {
    log(category, message, { type: "danger", ...options })
  },
  success: (category: string, message: string, options: Options = {}) => {
    log(category, message, { type: "success", ...options })
  }
}

;(globalThis as any).myconsole = myconsole

export default myconsole
