import { USER_ROLE } from "@zweb-public/user-data"
import {
  ACTION_ACCESS,
  ACTION_DELETE,
  ACTION_MANAGE,
  ACTION_SPECIAL,
  ATTRIBUTE_CATEGORY,
  ATTRIBUTE_GROUP,
  AttributeConfigListShape,
} from "./interface"

export const FreePlanAttributeConfigList: AttributeConfigListShape = {
  [ATTRIBUTE_CATEGORY.ACCESS]: {
    [USER_ROLE.GUEST]: {}, // free plan anonymous user can not access public app & action
    [USER_ROLE.OWNER]: {
      [ATTRIBUTE_GROUP.TEAM]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.USER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.INVITE]: {
        [ACTION_ACCESS.VIEW]: true,
        [ACTION_ACCESS.INVITE_BY_LINK]: true,
        [ACTION_ACCESS.INVITE_BY_EMAIL]: true,
        [ACTION_ACCESS.INVITE_ADMIN]: true,
        [ACTION_ACCESS.INVITE_EDITOR]: true,
        [ACTION_ACCESS.INVITE_VIEWER]: true,
      },
      [ATTRIBUTE_GROUP.DOMAIN]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.BILLING]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.BUILDER_DASHBOARD]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.APP]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.COMPONENTS]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.RESOURCE]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.ACTION]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.TRANSFORMER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.JOB]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.CAPACITIES]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.DRIVE]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.AI_AGENT]: { [ACTION_ACCESS.VIEW]: true },
    },
    [USER_ROLE.ADMIN]: {
      [ATTRIBUTE_GROUP.TEAM]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.USER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.INVITE]: { [ACTION_ACCESS.VIEW]: true },
    },
    [USER_ROLE.EDITOR]: {
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.USER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.INVITE]: { [ACTION_ACCESS.VIEW]: true },
    },
    [USER_ROLE.VIEWER]: {
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.USER]: { [ACTION_ACCESS.VIEW]: true },
      [ATTRIBUTE_GROUP.INVITE]: { [ACTION_ACCESS.VIEW]: true },
    },
  },
  [ATTRIBUTE_CATEGORY.DELETE]: {
    [USER_ROLE.GUEST]: {},
    [USER_ROLE.OWNER]: {
      [ATTRIBUTE_GROUP.TEAM]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.USER]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.INVITE]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.DOMAIN]: {
        [ACTION_DELETE.DELETE]: true,
        [ACTION_DELETE.TEAM_DOMAIN]: true,
        [ACTION_DELETE.APP_DOMAIN]: true,
      },
      [ATTRIBUTE_GROUP.BILLING]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.BUILDER_DASHBOARD]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.APP]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.COMPONENTS]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.RESOURCE]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.ACTION]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.TRANSFORMER]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.JOB]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.DRIVE]: { [ACTION_DELETE.DELETE]: true },
      [ATTRIBUTE_GROUP.AI_AGENT]: { [ACTION_DELETE.DELETE]: true },
    },
    [USER_ROLE.ADMIN]: {},
    [USER_ROLE.EDITOR]: {},
    [USER_ROLE.VIEWER]: {},
  },
  [ATTRIBUTE_CATEGORY.MANAGE]: {
    [USER_ROLE.GUEST]: {},
    [USER_ROLE.OWNER]: {
      [ATTRIBUTE_GROUP.TEAM]: {
        [ACTION_MANAGE.TEAM_NAME]: true,
        [ACTION_MANAGE.TEAM_ICON]: true,
        [ACTION_MANAGE.TEAM_CONFIG]: true,
        [ACTION_MANAGE.UPDATE_TEAM_DOMAIN]: true,
      },
      [ATTRIBUTE_GROUP.TEAM_MEMBER]: {
        [ACTION_MANAGE.REMOVE_MEMBER]: true,
        [ACTION_MANAGE.ROLE]: true,
        [ACTION_MANAGE.ROLE_FROM_OWNER]: true,
        [ACTION_MANAGE.ROLE_FROM_ADMIN]: true,
        [ACTION_MANAGE.ROLE_FROM_EDITOR]: true,
        [ACTION_MANAGE.ROLE_FROM_VIEWER]: true,
        [ACTION_MANAGE.ROLE_TO_OWNER]: true,
        [ACTION_MANAGE.ROLE_TO_ADMIN]: true,
        [ACTION_MANAGE.ROLE_TO_EDITOR]: true,
        [ACTION_MANAGE.ROLE_TO_VIEWER]: true,
      },
      [ATTRIBUTE_GROUP.USER]: {
        [ACTION_MANAGE.RENAME_USER]: true,
        [ACTION_MANAGE.UPDATE_USER_AVATAR]: true,
      },
      [ATTRIBUTE_GROUP.INVITE]: {
        [ACTION_MANAGE.CONFIG_INVITE]: true,
        [ACTION_MANAGE.INVITE_LINK]: true,
      },
      [ATTRIBUTE_GROUP.DOMAIN]: {
        [ACTION_MANAGE.TEAM_DOMAIN]: true,
        [ACTION_MANAGE.APP_DOMAIN]: true,
      },
      [ATTRIBUTE_GROUP.BILLING]: {
        [ACTION_MANAGE.PAYMENT]: true,
        [ACTION_MANAGE.PAYMENT_INFO]: true,
        [ACTION_MANAGE.MANAGE_COLLAR]: true,
      },
      [ATTRIBUTE_GROUP.BUILDER_DASHBOARD]: {
        [ACTION_MANAGE.DASHBOARD_BROADCAST]: true,
      },
      [ATTRIBUTE_GROUP.APP]: {
        [ACTION_MANAGE.CREATE_APP]: true,
        [ACTION_MANAGE.EDIT_APP]: true,
        [ACTION_MANAGE.FORK_APP]: true,
      },
      [ATTRIBUTE_GROUP.COMPONENTS]: {},
      [ATTRIBUTE_GROUP.RESOURCE]: {
        [ACTION_MANAGE.CREATE_RESOURCE]: true,
        [ACTION_MANAGE.EDIT_RESOURCE]: true,
      },
      [ATTRIBUTE_GROUP.ACTION]: {
        [ACTION_MANAGE.CREATE_ACTION]: true,
        [ACTION_MANAGE.EDIT_ACTION]: true,
        [ACTION_MANAGE.PREVIEW_ACTION]: true,
        [ACTION_MANAGE.RUN_ACTION]: true,
      },
      [ATTRIBUTE_GROUP.TRANSFORMER]: {},
      [ATTRIBUTE_GROUP.JOB]: {},
      [ATTRIBUTE_GROUP.DRIVE]: {
        [ACTION_MANAGE.CREATE_FILE]: true,
        [ACTION_MANAGE.EDIT_FILE]: true,
        [ACTION_MANAGE.CREATE_SHARELINK]: true,
      },
      [ATTRIBUTE_GROUP.MARKETPLACE]: {
        [ACTION_MANAGE.CONTRIBUTE_MARKETPLACE]: true,
        [ACTION_MANAGE.UNLIST_MARKETPLACE]: true,
      },
      [ATTRIBUTE_GROUP.AI_AGENT]: {
        [ACTION_MANAGE.CREATE_AI_AGENT]: true,
        [ACTION_MANAGE.EDIT_AI_AGENT]: true,
        [ACTION_MANAGE.FORK_AI_AGENT]: true,
        [ACTION_MANAGE.RUN_AI_AGENT]: true,
      },
    },
    [USER_ROLE.ADMIN]: {
      [ATTRIBUTE_GROUP.ACTION]: {
        [ACTION_MANAGE.PREVIEW_ACTION]: true,
        [ACTION_MANAGE.RUN_ACTION]: true,
      },
    },
    [USER_ROLE.EDITOR]: {
      [ATTRIBUTE_GROUP.ACTION]: {
        [ACTION_MANAGE.PREVIEW_ACTION]: true,
        [ACTION_MANAGE.RUN_ACTION]: true,
      },
    },
  },
  [ATTRIBUTE_CATEGORY.SPECIAL]: {
    [USER_ROLE.GUEST]: {},
    [USER_ROLE.OWNER]: {
      [ATTRIBUTE_GROUP.TEAM]: {
        [ACTION_SPECIAL.EDITOR_AND_VIEWER_CAN_INVITE_BY_LINK_SW]: true,
      },
      [ATTRIBUTE_GROUP.INVITE]: { [ACTION_SPECIAL.INVITE_LINK_RENEW]: true },
      [ATTRIBUTE_GROUP.APP]: { [ACTION_SPECIAL.RELEASE_APP]: true },
    },
    [USER_ROLE.ADMIN]: {},
    [USER_ROLE.EDITOR]: {},
    [USER_ROLE.VIEWER]: {},
  },
}
