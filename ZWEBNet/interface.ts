import { ERROR_FLAG } from "./errorFlag"

export interface RequestHandlerOptions {
  teamIdentifier?: string
  teamID?: string
}

export interface ZWEBApiError {
  errorCode: string | number
  errorFlag: ERROR_FLAG
  errorMessage: string
}
