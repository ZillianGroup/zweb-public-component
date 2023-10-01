import {
  ZWEB_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@zweb-public/mixpanel-utils"
import { TextLink } from "@zweb-public/text-link"
import { isCloudVersion } from "@zweb-public/utils"
import { FC, useContext } from "react"
import { Trans, useTranslation } from "react-i18next"
import { LayoutProps } from "../interface"
import { contentStyle, layoutStyle, policyStyle } from "./style"

export const MobileUserLayout: FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)

  const handleLinkOpenClick = (link: string) => {
    if (isCloudVersion) {
      track?.(ZWEB_MIXPANEL_EVENT_TYPE.CLICK, {
        element: /privacy/.test(link) ? "privacy" : "terms",
      })
      window.open("https://zilliangroup.com/docs" + link, "_blank")
    } else {
      window.open(link, "_blank")
    }
  }

  return (
    <div css={layoutStyle}>
      <div css={contentStyle}>{children}</div>
      <div css={policyStyle}>
        <Trans
          i18nKey="page.user.policy"
          t={t}
          components={[
            <TextLink
              key="text-link"
              onClick={() => {
                handleLinkOpenClick("/privacy-policy")
              }}
            />,
            <TextLink
              key="text-link"
              onClick={() => {
                handleLinkOpenClick("/terms-and-conditions")
              }}
            />,
          ]}
        />
      </div>
    </div>
  )
}

MobileUserLayout.displayName = "MobileUserLayout"
