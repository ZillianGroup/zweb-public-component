import { SerializedStyles, css } from "@emotion/react"
import { globalColor, zwebPrefix } from "@zweb-design/react"

export const textLinkStyle: SerializedStyles = css`
  color: ${globalColor(`--${zwebPrefix}-techPurple-01`)};
  cursor: pointer;
`
