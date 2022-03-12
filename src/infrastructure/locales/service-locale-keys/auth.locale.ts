export enum AuthLocaleEnum {
  INFO_SIGNIN = "info.auth.signin.successMsg",
  INFO_SIGNUP = "info.auth.signup.successMsg",
  INFO_SIGNOUT = "info.auth.signout.successMsg",
  INFO_RESET_PASS_LINK_SENT = "info.auth.sendResetPassLink.successMsg",
  INFO_PASSWORD_RESET = "info.auth.resetPassword.successMsg",
  INFO_CHANGE_PASSWORD = "info.auth.changePassword.successMsg",
  INFO_GET_USER_LIST = "info.auth.userList.successMsg",
  INFO_USER_SUSPENDED = "info.auth.userChangeSuspension.suspended",
  INFO_USER_UNSUSPENDED = "info.auth.userChangeSuspension.unsuspended",
  INFO_AVATAR_CHANGED = "info.auth.avatarChanged.successMsg",
  INFO_PROFILE_CHANGED = "info.auth.profileModified.successMsg",
  INFO_VIEW_PROFILE = "info.auth.profileViewed.successMsg",
  INFO_ADMIN_ClAIMS = "info.auth.admin.claims",
  INFO_ADMIN_USER_DETAILS = "info.auth.admin.userDetails",
  INFO_ADMIN_USER_DELETE = "info.auth.admin.userDeleted",
  INFO_ADMIN_USER_CLAIMS_MODIFIED = "info.auth.admin.userClaimsModified",
  INFO_VERIFICATION_CODE_SENT = "info.auth.verificationCodeSent.successMsg",
  INFO_VERIFICATION_CODE_CONFIRM = "info.auth.verificationCodeConfirm.successMsg",
  INFO_EMAIL_CONFIRMATION_LINK_SENT = "info.auth.sendConfirmationEmailLink.successMsg",
  INFO_EMAIL_CONFIRMED = "info.auth.emailConfirmed.successMsg",

  ERROR_BADREQ_PASS_MISMATCH = "errors.auth.authenticateService.passMatchErr",
  ERROR_INVALID_REFRESHTOKEN = "errors.auth.getRefreshTokenService.invalidRefreshToken",
  ERROR_USER_NOT_FOUND = "errors.auth.getUserByIdService.userNotFound",
  ERROR_EMAIL_IN_USE = "errors.auth.registerService.emailInUse",
  ERROR_RESET_LINK_EXP = "errors.auth.resetPasswordService.resetPassLinkExpiredErr",
  ERROR_CONFIRM_EMAIL_LINK_EXP = "errors.auth.confirmEmailService.confirmEmailLinkExpiredErr",
  ERROR_EMAIL_NOT_CONFIRMED = "errors.auth.confirmEmailService.emailNotConfirmed",
  ERROR_EMAIL_ALREADY_CONFIRMED = "errors.auth.confirmEmailService.emailAlreadyConfirmed",
  ERROR_USER_IS_SUSPENDED = "errors.auth.userIsSuspended",
  ERROR_MOBILE_ALREADY_VERIFIED = "errors.auth.mobileVerificationService.alreadyVerified",
  ERROR_VERIFICATION_CODE_EXPIRED = "errors.auth.mobileVerificationService.verificationCodeExpired",



  ERROR_SCHEMA_SIGNIN_EMAIL = "errors.auth.signinSchema.email",
  ERROR_SCHEMA_SIGNIN_PASSWORD = "errors.auth.signinSchema.password",

  ERROR_SCHEMA_SIGNUP_FIRSTNAME = "errors.auth.signupSchema.firstName",
  ERROR_SCHEMA_SIGNUP_LASTNAME = "errors.auth.signupSchema.lastName",
  ERROR_SCHEMA_SIGNUP_EMAIL = "errors.auth.signupSchema.email",
  ERROR_SCHEMA_SIGNUP_PASSWORD_MAX_LENGTH = "errors.auth.signupSchema.passwordLength",
  ERROR_SCHEMA_WEAK_PASSWORD = "errors.auth.signupSchema.passwordTooWeak",
  ERROR_SCHEMA_STRONG_PASSWORD = "errors.auth.signupSchema.passwordDifficulty",
  ERROR_SCHEMA_CHANGE_PASS_CURRENT_PASS = "errors.auth.changePasswordSchema.currentPassSupplyErr",
  ERROR_SCHEMA_CHANGE_PASS_NEW_PASS = "errors.auth.changePasswordSchema.newPassSupplyErr",
  ERROR_SCHEMA_EDIT_PROFILE_FIRSTNAME = "errors.auth.profileModificationSchema.firstName",
  ERROR_SCHEMA_EDIT_PROFILE_LASTNAME = "errors.auth.profileModificationSchema.lastName",

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