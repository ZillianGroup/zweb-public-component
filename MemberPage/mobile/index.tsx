import { InviteMemberMobile } from "@illa-public/invite-modal"
import { useUpgradeDrawer, useUpgradeModal } from "@illa-public/upgrade-modal"
import { UsageCard } from "@illa-public/usage-card"
import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
  USER_ROLE,
  getCurrentTeamInfo,
  getCurrentUser,
  teamActions,
} from "@illa-public/user-data"
import { canManageInvite, canManagePayment } from "@illa-public/user-role-utils"
import { isCloudVersion, useCopyToClipboard } from "@illa-public/utils"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@illa-design/react"
import { MobileMemberList } from "./List"
import {
  inviteBtnStyle,
  mobileMemberContainerStyle,
  mobileTitleStyle,
  usageCardContainerStyle,
} from "./style"


export const MobileMemberPage: FC = () => {
  const { t } = useTranslation()
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!
  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const dispatch = useDispatch()
  const teamInfo = useSelector(getCurrentTeamInfo)!
  const currentUserInfo = useSelector(getCurrentUser)!
  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER
  const copyToClipboard = useCopyToClipboard()
  const upgradeModal = useUpgradeModal()
  const upgradeDrawer = useUpgradeDrawer()

  const enableInvite = canManageInvite(
    currentUserRole,
    teamInfo?.permission?.allowEditorManageTeamMember,
    teamInfo?.permission?.allowViewerManageTeamMember,
  )

  const hasPaymentManagementPermission = canManagePayment(
    currentTeamInfo.myRole,
    currentTeamInfo.totalTeamLicense.teamLicenseAllPaid,
  )

  const handleClickInviteButton = useCallback(() => {
    if (!isCloudVersion || teamInfo?.totalTeamLicense?.teamLicenseAllPaid) {
      setInviteModalVisible(true)
    } else if (teamInfo?.totalTeamLicense.balance < 0) {
      upgradeModal({
        modalType: "add-license",
      })
    } else {
      upgradeModal({
        modalType: "upgrade",
      })
    }
  }, [
    teamInfo?.totalTeamLicense.balance,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
    upgradeModal,
  ])
  const currentTeamLicense = currentTeamInfo.currentTeamLicense
  const openDrawer = () => {
    upgradeDrawer({
      defaultConfig: {
        type: "license",
        subscribeInfo: {
          quantity: currentTeamLicense.cancelAtPeriodEnd
            ? 1
            : currentTeamLicense.volume,
          cycle: currentTeamLicense.cycle || SUBSCRIPTION_CYCLE.MONTHLY,
          plan: SUBSCRIBE_PLAN.TEAM_LICENSE_PREMIUM,
          currentPlan: currentTeamLicense.plan,
          cancelAtPeriodEnd: currentTeamLicense?.cancelAtPeriodEnd,
        },
        // onSubscribeCallback: onSubscribe,
      },
    })
  }

  return (
    <div css={mobileMemberContainerStyle}>
      <h1 css={mobileTitleStyle}>{t("user_management.page.member")}</h1>
      {hasPaymentManagementPermission ? (
        <div css={usageCardContainerStyle}>
          <UsageCard
            type="License"
            current={
              currentTeamInfo.totalTeamLicense.volume -
              currentTeamInfo.totalTeamLicense.balance
            }
            total={currentTeamInfo.totalTeamLicense.volume}
            buttonColorScheme="grayBlue"
            buttonVariant="outline"
            actionDes={
              currentTeamInfo.currentTeamLicense?.cycle ===
              SUBSCRIPTION_CYCLE.YEARLY
                ? t(`billing.license_price_new.yearly`, { price: "$200" })
                : t(`billing.license_price_new.monthly`, { price: "$20" })
            }
            isMobile
            onClick={openDrawer}
          />
        </div>
      ) : null}
      <MobileMemberList />
      <Button
        _css={inviteBtnStyle}
        disabled={!enableInvite}
        fullWidth
        colorScheme="techPurple"
        onClick={handleClickInviteButton}
      >
        {t("homepage.workspace.invite")}
      </Button>
      {inviteModalVisible && (
        <InviteMemberMobile
          redirectURL={`${import.meta.env.ILLA_CLOUD_URL}/workspace/${
            teamInfo?.identifier
          }`}
          onClose={() => setInviteModalVisible(false)}
          canInvite={enableInvite}
          currentUserRole={currentUserRole}
          defaultAllowInviteLink={teamInfo.permission.inviteLinkEnabled}
          defaultInviteUserRole={USER_ROLE.VIEWER}
          defaultBalance={teamInfo.currentTeamLicense.balance}
          onCopyInviteLink={(inviteLink) => {
            copyToClipboard(
              t("user_management.modal.custom_copy_text", {
                inviteLink: inviteLink,
                teamName: teamInfo.name,
                userName: currentUserInfo.nickname,
              }),
            )
          }}
          onInviteLinkStateChange={(isInviteLink) => {
            dispatch(
              teamActions.updateTeamMemberPermissionReducer({
                teamID: teamInfo.id,
                newPermission: {
                  ...teamInfo.permission,
                  inviteLinkEnabled: isInviteLink,
                },
              }),
            )
          }}
          teamID={teamInfo.id}
          onBalanceChange={(balance) => {
            dispatch(
              teamActions.updateTeamMemberSubscribeReducer({
                teamID: teamInfo.id,
                subscribeInfo: {
                  ...teamInfo.currentTeamLicense,
                  balance: balance,
                },
              }),
            )
          }}
        />
      )}
    </div>
  )
}

MobileMemberPage.displayName = "MemberListMobile"

export default MobileMemberPage