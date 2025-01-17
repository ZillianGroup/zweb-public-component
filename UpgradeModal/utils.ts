import { ERROR_FLAG, isZWEBAPiError } from "@zweb-public/zweb-net"
import { createCollarModal, createTeamLimitModal } from "./hook"
import { CollarModalType, FREE_TEAM_LIMIT_TYPE } from "./interface"

export function getSuccessRedirectWithParams(
  params: Record<string, string>,
): string {
  const redirectPath = "/landing/subscribed"
  const paramString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&")

  return `${process.env.ZWEB_CLOUD_URL}${redirectPath}?${paramString}`
}

export const handleCollaPurchaseError = (
  e: unknown,
  modalType: CollarModalType,
) => {
  const collaModal = createCollarModal()
  if (
    isZWEBAPiError(e) &&
    (e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_INSUFFICIENT_COLLA ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_INSUFFICIENT_DRIVE_VOLUME ||
      e.data.errorFlag ===
        ERROR_FLAG.ERROR_FLAG_INSUFFICIENT_AI_TOKEN_GENERAL ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_AUTO_CHARGE_COLLA_FAILED ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_INSUFFICIENT_DRIVE_TRAFFIC ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_COLLA_PAYMENT_FAILURE ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_OUT_OF_USAGE_TRAFFIC ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_OUT_OF_USAGE_VOLUME)
  ) {
    collaModal?.({
      modalType,
    })
    return true
  }
  return false
}

export const handleFreeTeamLimitError = (
  e: unknown,
  modalType: FREE_TEAM_LIMIT_TYPE,
) => {
  const limitTeamModal = createTeamLimitModal()
  if (
    isZWEBAPiError(e) &&
    e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_OVER_MAX_FREE_TEAM_LIMIT
  ) {
    limitTeamModal?.({
      modalType,
    })
    return true
  }
  return false
}
