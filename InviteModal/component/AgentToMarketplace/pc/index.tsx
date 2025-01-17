import {
  ZWEB_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@zweb-public/mixpanel-utils"
import { USER_ROLE } from "@zweb-public/user-data"
import { isBiggerThanTargetRole } from "@zweb-public/user-role-utils"
import { getAgentPublicLink } from "@zweb-public/utils"
import { FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  Input,
  Skeleton,
  Switch,
  getColor,
  useMergeValue,
  useMessage,
} from "@zweb-design/react"
import { ShareBlockPC } from "../../ShareBlock/pc"
import { AgentToMarketplaceProps } from "../interface"
import { fetchRemoveToMarketplace, makeAgentContribute } from "../service"
import {
  blockContainerStyle,
  blockLabelStyle,
  contributingDocStyle,
  linkCopyContainer,
  publicContainerStyle,
} from "./style"


export const AgentToMarketplacePC: FC<AgentToMarketplaceProps> = (props) => {
  const {
    title,
    defaultAgentContributed,
    onAgentContributed,
    userRoleForThisAgent,
    agentID,
    onShare,
    onCopyAgentMarketLink,
    ownerTeamID,
  } = props

  const [agentContributed, setAgentContributed] = useMergeValue(
    defaultAgentContributed,
    {
      defaultValue: defaultAgentContributed,
    },
  )

  const [agentContributedLoading, setAgentContributedLoading] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const { t } = useTranslation()

  const message = useMessage()

  return (
    <div css={publicContainerStyle}>
      {(isBiggerThanTargetRole(USER_ROLE.VIEWER, userRoleForThisAgent, false) ||
        agentContributed) && (
        <div css={blockContainerStyle}>
          <div css={blockLabelStyle}>
            {t("user_management.modal.contribute.label")}
          </div>
          <div
            style={{
              flexGrow: 1,
            }}
          />
          {isBiggerThanTargetRole(
            USER_ROLE.VIEWER,
            userRoleForThisAgent,
            false,
          ) && (
            <Switch
              checked={agentContributed}
              colorScheme={getColor("grayBlue", "02")}
              onChange={async (value) => {
                track(ZWEB_MIXPANEL_EVENT_TYPE.CLICK, {
                  element: "share_modal_contribute_switch",
                  parameter2: !value,
                  parameter5: agentID,
                })
                setAgentContributed(value)
                try {
                  setAgentContributedLoading(true)
                  if (value) {
                    await makeAgentContribute(ownerTeamID, agentID)
                  } else {
                    await fetchRemoveToMarketplace(ownerTeamID, agentID)
                  }
                  onAgentContributed?.(value)
                } catch (e) {
                  message.error({
                    content: t(
                      "user_management.modal.message.make_public_failed",
                    ),
                  })
                  setAgentContributed(!value)
                } finally {
                  setAgentContributedLoading(false)
                }
              }}
            />
          )}
        </div>
      )}
      {agentContributed ? (
        <div css={linkCopyContainer}>
          <Input
            flexShrink="1"
            flexGrow="1"
            w="unset"
            readOnly
            colorScheme="techPurple"
            value={
              agentContributedLoading ? (
                <Skeleton
                  text={{ rows: 1 }}
                  opac={0.5}
                  animation
                  flexGrow="1"
                />
              ) : (
                getAgentPublicLink(agentID)
              )
            }
          />
          <Button
            ml="8px"
            w="80px"
            colorScheme={getColor("grayBlue", "02")}
            loading={agentContributedLoading}
            onClick={() => {
              onCopyAgentMarketLink?.(getAgentPublicLink(agentID))
            }}
          >
            {!agentContributedLoading
              ? t("user_management.modal.link.copy")
              : undefined}
          </Button>
        </div>
      ) : (
        <div css={contributingDocStyle}>
          {t("user_management.modal.contribute.desc")}
        </div>
      )}
      {agentContributed && (
        <ShareBlockPC
          onShare={onShare}
          title={title}
          shareUrl={getAgentPublicLink(agentID)}
        />
      )}
    </div>
  )
}

AgentToMarketplacePC.displayName = "AgentToMarketplacePC"