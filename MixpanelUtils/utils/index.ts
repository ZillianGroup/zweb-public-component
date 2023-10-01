import { load } from "@fingerprintjs/fingerprintjs"
import ZWEBStorage from "@zweb-public/zweb-storage"

const generateUUID = async () => {
  const fp = await load()
  const result = await fp.get()
  return result.visitorId
}

export const ZWEBPublicStorage = new ZWEBStorage("zweb-public", -1)

export const getDeviceUUID = async () => {
  if (!ZWEBPublicStorage.getLocalStorage("deviceID")) {
    const deviceID = await generateUUID()
    ZWEBPublicStorage.setLocalStorage("deviceID", deviceID)
  }
  return ZWEBPublicStorage.getLocalStorage("deviceID") as string
}

export const getBrowserLanguage = () => {
  return navigator.language || ""
}

export const getZWebLanguage = () => {
  return localStorage.getItem("i18nextLng") || ""
}
