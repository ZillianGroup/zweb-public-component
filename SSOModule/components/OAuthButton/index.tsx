import {
  ZWEBMixpanel,
  ZWEB_MIXPANEL_EVENT_TYPE,
  ZWEB_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@zweb-public/mixpanel-utils"
import { FC, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Button } from "@zweb-design/react"
import { fetchOAuthURI } from "../../LoginPage/services"
import { OAUTH_REDIRECT_URL, openOAuthUrl } from "../../constants/users"
import { OAuthButtonProps } from "./interface"
import { oAuthButtonStyle } from "./style"

export const OAuthButton: FC<OAuthButtonProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()

  const onClickButton = async () => {
    ZWEBMixpanel.track(ZWEB_MIXPANEL_EVENT_TYPE.CLICK, {
      page: ZWEB_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
      element: `${props.type}_sign_in`,
    })

    const targetURL = new URL(OAUTH_REDIRECT_URL)
    targetURL.searchParams.set(
      "redirectURL",
      searchParams.get("redirectURL") ?? "",
    )

    try {
      setLoading(true)
      const response = await fetchOAuthURI(
        props.type,
        props.landing,
        targetURL.toString(),
      )
      openOAuthUrl(response.data.uri)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(true)
    }
  }

  return (
    <Button
      leftIcon={props.icon}
      css={props.isMobile ? oAuthButtonStyle : undefined}
      colorScheme="grayBlue"
      variant="outline"
      shape={props.isMobile ? "round" : "square"}
      size="large"
      fullWidth={props.isMobile ? false : true}
      onClick={onClickButton}
      loading={loading}
    >
      {props.children}
    </Button>
  )
}
