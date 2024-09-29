import {getAttachmentUrl} from "../fileStorage/attachmentUtils.mjs";
import { createLogger } from "../utils/logger.mjs";
import { v4 as uuidv4 } from "uuid";
import { create, getAll, update, deleteTodo, getUploadUrl } from "../dataLayer/todosAccess.mjs";

const logger = createLogger("TodosAccess");


export async function CreateTodo(
  newItem,
  userId
) {
  logger.info("Call function create todos");
  const todoId = uuidv4();
  const createdAt = new Date().toISOString();
  const s3AttachUrl = getAttachmentUrl(userId);
  const _newItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    attachmentUrl: s3AttachUrl,
    ...newItem,
  };
  return await create(_newItem);
}

export async function getTodosForUser(userId) {
  logger.info("Call function getall todos");
  return await getAll(userId);
}

export async function UpdateTodo(
  userId,
  todoId,
  updatedTodo
) {
  logger.info("Call function update todos");
  return await update(userId, todoId, updatedTodo);
}

export async function DeleteTodo(
  userId,
  todoId
) {
  logger.info("Call function delete todos");
  return await deleteTodo(userId, todoId);
}

export async function createAttachmentPresignedUrl(
  userId,
  todoId
) {
  logger.info("Call function createAttachmentPresignedUrl todos by" + userId);
  const uploadUrl = getUploadUrl(todoId, userId);
  return uploadUrl;
}
