import {
  ZWEB_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@zweb-public/mixpanel-utils"
import { USER_ROLE } from "@zweb-public/user-data"
import { isBiggerThanTargetRole } from "@zweb-public/user-role-utils"
import { getAgentPublicLink } from "@zweb-public/utils"
import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, useMergeValue, useMessage } from "@zweb-design/react"
import { ReactComponent as DisableInviteIcon } from "../../../asset/DisableInviteLink.svg"
import { ReactComponent as InviteIcon } from "../../../asset/InviteLink.svg"
import { ShareBlockMobile } from "../../ShareBlock/mobile"
import { AgentToMarketplaceProps } from "../interface"
import { fetchRemoveToMarketplace, makeAgentContribute } from "../service"
import {
  inviteButtonStyle,
  inviteLinkContainer,
  inviteLinkDisableHeaderStyle,
  inviteLinkHeaderStyle,
  inviteOptionsStyle,
  shareBlockContainerStyle,
} from "./style"


export const AgentToMarketplaceMobile: FC<AgentToMarketplaceProps> = (
  props,
) => {
  const {
    title,
    onShare,
    defaultAgentContributed,
    onAgentContributed,
    userRoleForThisAgent,
    agentID,
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
  const message = useMessage()

  const { t } = useTranslation()

  const handleAgentContribute = useCallback(
    async (value: boolean) => {
      track(ZWEB_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "share_modal_contribute_switch",
        parameter2: !value,
        parameter5: agentID,
      })
      setAgentContributedLoading(true)
      setAgentContributed(value)
      try {
        if (value) {
          await makeAgentContribute(ownerTeamID, agentID)
        } else {
          await fetchRemoveToMarketplace(ownerTeamID, agentID)
        }
        onAgentContributed?.(value)
      } catch (e) {
        message.error({
          content: t("user_management.modal.message.make_public_failed"),
        })
        setAgentContributed(!value)
      } finally {
        setAgentContributedLoading(false)
      }
    },
    [
      agentID,
      message,
      onAgentContributed,
      ownerTeamID,
      setAgentContributed,
      t,
      track,
    ],
  )

  return (
    <div css={inviteLinkContainer}>
      {agentContributed ? (
        <>
          <div css={inviteLinkHeaderStyle}>
            <InviteIcon />
          </div>
          <div css={inviteOptionsStyle}>
            <Button
              _css={inviteButtonStyle}
              colorScheme="techPurple"
              fullWidth
              loading={agentContributedLoading}
              onClick={() => {
                onCopyAgentMarketLink?.(getAgentPublicLink(agentID))
              }}
            >
              {t("user_management.modal.link.copy")}
            </Button>
            {isBiggerThanTargetRole(
              USER_ROLE.VIEWER,
              userRoleForThisAgent,
              false,
            ) && (
              <Button
                _css={inviteButtonStyle}
                colorScheme="grayBlue"
                variant="text"
                fullWidth
                loading={agentContributedLoading}
                onClick={() => {
                  handleAgentContribute(false)
                }}
              >
                {t("user_management.modal.contribute.turn_off")}
              </Button>
            )}
          </div>
          <div css={shareBlockContainerStyle}>
            <ShareBlockMobile
              onShare={onShare}
              title={title}
              shareUrl={getAgentPublicLink(agentID)}
            />
          </div>
        </>
      ) : (
        <>
          <div css={inviteLinkDisableHeaderStyle}>
            <DisableInviteIcon />
          </div>
          {isBiggerThanTargetRole(
            USER_ROLE.VIEWER,
            userRoleForThisAgent,
            false,
          ) && (
            <Button
              _css={inviteButtonStyle}
              colorScheme="techPurple"
              fullWidth
              loading={agentContributedLoading}
              onClick={() => {
                handleAgentContribute(true)
              }}
            >
              {t("user_management.modal.contribute.label")}
            </Button>
          )}
        </>
      )}
    </div>
  )
}

AgentToMarketplaceMobile.displayName = "AgentToMarketplaceMobile"