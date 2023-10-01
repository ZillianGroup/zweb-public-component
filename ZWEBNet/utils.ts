import { AxiosResponse } from "axios"
import { ZWEBApiError } from "./interface"

export const isZWEBAPiError = (
  error: unknown,
): error is AxiosResponse<ZWEBApiError> => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "errorCode" in error.data &&
    "errorMessage" in error.data &&
    typeof error.data.errorMessage === "string"
  )
}
