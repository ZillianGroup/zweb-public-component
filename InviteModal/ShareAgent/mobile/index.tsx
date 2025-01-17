import {
  ZWEB_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@zweb-public/mixpanel-utils"
import { USER_ROLE } from "@zweb-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
  isBiggerThanTargetRole,
} from "@zweb-public/user-role-utils"
import { FC, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { CloseIcon, Divider, Drawer, TriggerProvider } from "@zweb-design/react"
import { AgentToMarketplaceMobile } from "../../component/AgentToMarketplace/mobile"
import { InviteByEmailMobile } from "../../component/InviteByEmail/mobile"
import { InviteLinkMobile } from "../../component/InviteLink/mobile"
import { ShareAgentProps, ShareAgentTab } from "../interface"
import {
  closeIconContainerStyle,
  contentContainerStyle,
  dividerStyle,
  inviteContainerStyle,
  inviteHeaderContainerStyle,
  inviteModalStyle,
  spaceLineStyle,
  tabTitleStyle,
  tabsContainerStyle,
} from "./style"


export const ShareAgentMobile: FC<ShareAgentProps> = (props) => {
  const { onClose } = props

  let defTab = ShareAgentTab.TO_MARKETPLACE

  if (
    props.canInvite &&
    props.canUseBillingFeature &&
    USER_ROLE.VIEWER === props.currentUserRole
  ) {
    defTab = ShareAgentTab.SHARE_WITH_TEAM
  } else if (
    isBiggerThanTargetRole(USER_ROLE.VIEWER, props.currentUserRole) ||
    props.defaultAgentContributed
  ) {
    defTab = ShareAgentTab.TO_MARKETPLACE
  }

  const [activeTab, setActiveTab] = useState<string>(props.defaultTab ?? defTab)

  useEffect(() => {
    if (props.defaultTab === undefined) {
      return
    } else {
      setActiveTab(props.defaultTab)
    }
  }, [props.defaultTab])

  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)

  const handleTabChange = (activeKey: string) => {
    track(ZWEB_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "share_modal_tab",
      parameter2: activeKey,
      parameter5: props.agentID,
    })
    setActiveTab(activeKey)
  }

  return (
    <TriggerProvider renderInBody zIndex={1005}>
      <Drawer
        css={inviteModalStyle}
        w="100%"
        placement="bottom"
        maskClosable={false}
        closable={false}
        footer={false}
        onCancel={onClose}
        visible={true}
      >
        <div css={inviteContainerStyle}>
          <div css={inviteHeaderContainerStyle}>
            <div
              css={closeIconContainerStyle}
              onClick={() => {
                props.onClose?.()
              }}
            >
              <CloseIcon size="12" />
            </div>
            <div css={tabsContainerStyle}>
              {props.canInvite && props.canUseBillingFeature && (
                <div
                  css={tabTitleStyle(
                    activeTab === ShareAgentTab.SHARE_WITH_TEAM,
                  )}
                  onClick={() => handleTabChange(ShareAgentTab.SHARE_WITH_TEAM)}
                >
                  {t("user_management.modal.tab.with_team")}
                </div>
              )}
              {(canManage(
                props.userRoleForThisAgent,
                ATTRIBUTE_GROUP.AI_AGENT,
                props.teamPlan,
                ACTION_MANAGE.CREATE_AI_AGENT,
              ) ||
                props.defaultAgentContributed) && (
                <>
                  <div css={spaceLineStyle} />
                  <div
                    css={tabTitleStyle(
                      activeTab === ShareAgentTab.TO_MARKETPLACE,
                    )}
                    onClick={() =>
                      handleTabChange(ShareAgentTab.TO_MARKETPLACE)
                    }
                  >
                    {t("user_management.modal.title.contribute")}
                  </div>
                </>
              )}
            </div>
          </div>
          <div css={contentContainerStyle}>
            {activeTab === ShareAgentTab.TO_MARKETPLACE &&
              props.agentID !== "" &&
              props.agentID !== undefined && (
                <AgentToMarketplaceMobile
                  title={props.title}
                  defaultAgentContributed={props.defaultAgentContributed}
                  onAgentContributed={props.onAgentContributed}
                  agentID={props.agentID}
                  onCopyAgentMarketLink={props.onCopyAgentMarketLink}
                  userRoleForThisAgent={props.userRoleForThisAgent}
                  ownerTeamID={props.ownerTeamID}
                  onShare={props.onShare}
                />
              )}
            {activeTab === ShareAgentTab.SHARE_WITH_TEAM && (
              <div>
                <InviteLinkMobile
                  excludeUserRole={[]}
                  redirectURL={props.redirectURL}
                  defaultBalance={props.defaultBalance}
                  defaultInviteUserRole={props.defaultInviteUserRole}
                  defaultAllowInviteLink={props.defaultAllowInviteLink}
                  teamID={props.teamID}
                  currentUserRole={props.currentUserRole}
                  onInviteLinkStateChange={props.onInviteLinkStateChange}
                  onCopyInviteLink={props.onCopyInviteLink}
                />
                <Divider css={dividerStyle} />
                <InviteByEmailMobile
                  excludeUserRole={[]}
                  onBalanceChange={props.onBalanceChange}
                  defaultInviteUserRole={props.defaultInviteUserRole}
                  teamID={props.teamID}
                  currentUserRole={props.currentUserRole}
                  defaultBalance={props.defaultBalance}
                  redirectURL={props.redirectURL}
                  itemID={props.agentID}
                />
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </TriggerProvider>
  )
}
ShareAgentMobile.displayName = "ShareAgentMobile"