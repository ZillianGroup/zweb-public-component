import { css } from "@emotion/react"
import { globalColor, zwebPrefix } from "@zweb-design/react"
import mobileUserBg from "../../assets/mobile-user-bg.svg"

export const layoutStyle = css`
  background: url(${mobileUserBg}) ${globalColor(`--${zwebPrefix}-white-01`)}
    no-repeat;
  background-size: contain;
  padding: 244rem 32rem 100rem;
`

export const contentStyle = css`
  height: 1115rem;
  border-radius: 32rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  background: ${globalColor(`--${zwebPrefix}-white-01`)};
  padding: 64rem 40rem 40rem;
  font-size: 28rem;
`

export const policyStyle = css`
  margin-top: 80rem;
  font-size: 24rem;
  color: ${globalColor(`--${zwebPrefix}-grayBlue-03`)};
`
