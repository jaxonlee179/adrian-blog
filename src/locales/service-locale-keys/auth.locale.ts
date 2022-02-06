export enum AuthLocaleEnum {
  INFO_SIGNIN = "info.auth.signin.successMsg",
  INFO_SIGNUP = "info.auth.signup.successMsg",
  INFO_SIGNOUT = "info.auth.signout.successMsg",

  ERROR_BADREQ_PASS_MISMATCH = "errors.auth.authenticateService.passMatchErr",
  ERROR_INVALID_REFRESHTOKEN = "errors.auth.getRefreshTokenService.invalidRefreshToken",
  ERROR_USER_NOT_FOUND = "errors.auth.getUserByIdService.userNotFound",
  ERROR_EMAIL_IN_USE = "errors.auth.registerService.emailInUse",

  ERROR_SCHEMA_SIGNIN_EMAIL = "errors.auth.signinSchema.email",
  ERROR_SCHEMA_SIGNIN_PASSWORD = "errors.auth.signinSchema.password",

  ERROR_SCHEMA_SIGNUP_FIRSTNAME = "errors.auth.signupSchema.firstName",
  ERROR_SCHEMA_SIGNUP_LASTNAME = "errors.auth.signupSchema.lastName",
  ERROR_SCHEMA_SIGNUP_EMAIL = "errors.auth.signupSchema.email",
  ERROR_SCHEMA_SIGNUP_PASSWORD = "errors.auth.signupSchema.password",

  POLICY_CORE_ADMIN = "info.auth.claims.coreAdmin",
  POLICY_CORE_USER = "info.auth.claims.coreUser",
  POLICY_AUTH_CLAIMLIST = "info.auth.claims.claimList",
  POLICY_ACTIVITY_LIST = "info.auth.claims.activityList",
  POLICY_TAXONOMY_LIST = "info.auth.claims.taxonomyList",
  POLICY_TAXONOMY_DETAILS = "info.auth.claims.taxonomyDetails",
  POLICY_TAXONOMY_CREATE = "info.auth.claims.taxonomyCreate",
  POLICY_TAXONOMY_EDIT = "info.auth.claims.taxonomyEdit",
  POLICY_TAXONOMY_DELETE = "info.auth.claims.taxonomyDelete",
  POLICY_ATTACHMENT_CREATE = "info.auth.claims.attachmentCreate",
  POLICY_POST_LIST = "info.auth.claims.postList",
  POLICY_POST_DETAILS = "info.auth.claims.postDetails",
  POLICY_POST_CREATE = "info.auth.claims.postCreate",
  POLICY_POST_EDIT = "info.auth.claims.postEdit",
  POLICY_POST_DELETE = "info.auth.claims.postDelete",
  POLICY_POSTCOMMENT_APPROVE = "info.auth.claims.postCommentApprove",
  POLICY_POSTCOMMENT_LIST = "info.auth.claims.postCommentList",
  POLICY_POSTCOMMENT_DETAILS = "info.auth.claims.postCommentDetails",
  POLICY_POSTCOMMENT_CREATE = "info.auth.claims.postCommentCreate",
  POLICY_POSTCOMMENT_EDIT = "info.auth.claims.postCommentEdit",
  POLICY_POSTCOMMENT_DELETE = "info.auth.claims.postCommentDelete",
  POLICY_POSTCOMMENT_SETTINGS_LIST = "info.auth.claims.postCommentSettingsList",
  POLICY_POSTCOMMENT_SETTINGS_EDIT = "info.auth.claims.postCommentSettingsEdit"
}