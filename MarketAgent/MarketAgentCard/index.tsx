import { Avatar } from "@zweb-public/avatar"
import { formatNumForAgent } from "@zweb-public/utils"
import { FC } from "react"
import { ForkIcon, PlayOutlineIcon, StarOutlineIcon } from "@zweb-design/react"
import { getLLM } from "../modelList"
import { MarketAgentCardProps } from "./interface"
import {
  actionContainerStyle,
  actionCountStyle,
  agentIconStyle,
  cardStyle,
  descriptionStyle,
  footerStyle,
  headerStyle,
  modelContainerStyle,
  modelLogoStyle,
  modelNameStyle,
  nameStyle,
  teamAvatarStyle,
  teamInfoStyle,
  teamNameStyle,
  titleInfoStyle,
} from "./style"

export const MarketAgentCard: FC<MarketAgentCardProps> = (props) => {
  const { marketAIAgent, ...rest } = props

  return (
    <div css={cardStyle} {...rest}>
      <div css={headerStyle}>
        <img
          css={agentIconStyle}
          src={marketAIAgent.aiAgent.icon}
          alt={marketAIAgent.aiAgent.name}
        />
        <div css={titleInfoStyle}>
          <span css={nameStyle}>{marketAIAgent.aiAgent.name}</span>
          <div css={modelContainerStyle}>
            <div css={modelLogoStyle}>
              {getLLM(marketAIAgent.aiAgent.model)?.logo}
            </div>
            <div css={modelNameStyle}>
              {getLLM(marketAIAgent.aiAgent.model)?.name}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div css={descriptionStyle}>{marketAIAgent.aiAgent.description}</div>
      </div>

      <div css={footerStyle}>
        <div css={teamInfoStyle}>
          <Avatar
            css={teamAvatarStyle}
            avatarUrl={marketAIAgent.marketplace.contributorTeam.icon}
            name={marketAIAgent.marketplace.contributorTeam.name}
            id={marketAIAgent.marketplace.contributorTeam.teamID}
          />
          <span css={teamNameStyle}>
            {marketAIAgent.marketplace.contributorTeam.name}
          </span>
        </div>
        <div css={actionContainerStyle}>
          <div css={actionCountStyle}>
            <ForkIcon size="16px" />
            {formatNumForAgent(marketAIAgent.marketplace.numForks)}
          </div>
          <div css={actionCountStyle}>
            <StarOutlineIcon size="16px" />
            {formatNumForAgent(marketAIAgent.marketplace.numStars)}
          </div>
          <div css={actionCountStyle}>
            <PlayOutlineIcon size="16px" />
            {formatNumForAgent(marketAIAgent.marketplace.numRuns)}
          </div>
        </div>
      </div>
    </div>
  )
}

MarketAgentCard.displayName = "MarketAgentCard"