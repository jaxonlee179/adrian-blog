import { body } from "express-validator";
import { validationMsgSerializer } from "../../../../../../errors/request-validation-error";
import { CommentLocaleEnum } from "../../../../../../locales/service-locale-keys/post-comment.locale";

export const postCommentEditSchema = [
  body( 'title' )
    .not()
    .isEmpty()
    .withMessage(
      validationMsgSerializer(
        "Comment title is required",
        CommentLocaleEnum.ERROR_SCHEMA_EDIT_TITLE_EMPTY
      )
    )
    .isLength( { max: 60 } )
    .withMessage(
      validationMsgSerializer(
        "Comment title's length must be less than 60 characters",
        CommentLocaleEnum.ERROR_SCHEMA_EDIT_TITLE_LENGTH
      )
    ),
  body( 'content' )
    .not()
    .isEmpty()
    .withMessage(
      validationMsgSerializer(
        "Comment content cannot be empty",
        CommentLocaleEnum.ERROR_SCHEMA_EDIT_CONTENT_EMPTY
      )
    )
    .isLength( { max: 250 } )
    .withMessage(
      validationMsgSerializer(
        "Comment content's length must be less than 250 characters",
        CommentLocaleEnum.ERROR_SCHEMA_EDIT_CONTENT_LENGTH
      )
    )
];