import { FC, ReactNode, createContext, useCallback, useMemo } from "react"
import {
  ZWEBProperties,
  ZWEB_MIXPANEL_EVENT_TYPE,
  ZWEB_PAGE_NAME,
} from "./interface"

interface IInject {
  track: (
    event: ZWEB_MIXPANEL_EVENT_TYPE,
    properties: Omit<ZWEBProperties, "page">,
    extendProperty?: "userRole" | "team_id" | "both",
  ) => void
  pageName: ZWEB_PAGE_NAME
}

export const MixpanelTrackContext = createContext<IInject>({} as IInject)

interface MixpanelTrackProviderProps {
  basicTrack: (
    event: ZWEB_MIXPANEL_EVENT_TYPE,
    pageName: ZWEB_PAGE_NAME,
    properties: Omit<ZWEBProperties, "page">,
    extendProperty?: "userRole" | "team_id" | "both",
  ) => void
  pageName: ZWEB_PAGE_NAME
  children: ReactNode
}

export const MixpanelTrackProvider: FC<MixpanelTrackProviderProps> = (
  props,
) => {
  const { children, basicTrack, pageName } = props

  const track = useCallback(
    (
      event: ZWEB_MIXPANEL_EVENT_TYPE,
      properties: Omit<ZWEBProperties, "page">,
      extendProperty?: "userRole" | "team_id" | "both",
    ) => {
      basicTrack(event, pageName, properties, extendProperty)
    },
    [basicTrack, pageName],
  )

  const injectValue = useMemo(() => {
    return {
      track,
      pageName,
    }
  }, [pageName, track])

  return (
    <MixpanelTrackContext.Provider value={injectValue}>
      {children}
    </MixpanelTrackContext.Provider>
  )
}

MixpanelTrackProvider.displayName = "MixpanelTrackProvider"
