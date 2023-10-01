import mixpanel from "mixpanel-browser"
import {
  ZWEBProperties,
  ZWEB_MIXPANEL_EVENT_TYPE,
  ZWEB_PAGE_NAME,
} from "./interface"
import { getDeviceUUID } from "./utils"

export * from "./interface"
export * from "./mixpanelContext"
class ZWEBMixpanelTools {
  private static instance: ZWEBMixpanelTools | null = null
  private enable: boolean = false

  constructor() {
    this.enable =
      process.env.ZWEB_INSTANCE_ID === "CLOUD" &&
      !!process.env.ZWEB_MIXPANEL_API_KEY
    if (this.enable) {
      mixpanel.init(process.env.ZWEB_MIXPANEL_API_KEY as string, {
        debug: process.env.ZWEB_APP_ENV === "development",
        test: process.env.ZWEB_APP_ENV !== "production",
        ignore_dnt: process.env.ZWEB_APP_ENV === "development",
        loaded(mixpanelProto) {
          const originalTrack = mixpanelProto.track
          mixpanelProto.track = function (event, properties) {
            originalTrack.call(mixpanelProto, event, {
              ...properties,
              environment: process.env.ZWEB_APP_ENV,
              fe_version_code: process.env.ZWEB_APP_VERSION,
            })
          }
        },
      })
    }
  }

  public async setDeviceID() {
    if (this.enable) {
      const deviceID = await getDeviceUUID()
      mixpanel.register({
        ZWEB_device_ID: deviceID,
      })
    }
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ZWEBMixpanelTools()
    }

    return this.instance
  }

  public track(event: ZWEB_MIXPANEL_EVENT_TYPE, properties: ZWEBProperties) {
    if (this.enable) {
      mixpanel.track(event, {
        ...properties,
      })
    }
  }

  public setGroup(teamIdentifier: string | string[]) {
    if (this.enable) {
      mixpanel.set_group("team", teamIdentifier)
    }
  }

  public pageTimeEvent() {
    if (this.enable) {
      mixpanel.time_event("page_duration")
    }
  }

  public trackTimeEvent(pageName: ZWEB_PAGE_NAME, teamIdentifier: string) {
    if (this.enable) {
      mixpanel.track("page_duration", {
        page: pageName,
        team_id: teamIdentifier,
      })
    }
  }

  public getMixpanelInstance() {
    if (this.enable) {
      return mixpanel
    }
  }
}

export const ZWEBMixpanel = ZWEBMixpanelTools.getInstance()
