import AWS from "aws-sdk";
import { createLogger } from "../utils/logger.mjs";
import pkg from 'aws-xray-sdk';
const { captureAWS } = pkg;

const XAWS = captureAWS(AWS);
const logger = createLogger("TodoAccess");
const url_expiration = process.env.SIGNED_URL_EXPIRATION;
const s3_bucket_name = process.env.ATTACHMENT_S3_BUCKET;
const docClient = createDynamoDBClient();
const todosTable = process.env.TODOS_TABLE;
const todosIndex = process.env.TODOS_CREATED_AT_INDEX;
const S3 = new XAWS.S3({ signatureVersion: "v4" });

export async function getAll(userId) {
  logger.info("Call function getAll");
  const result = await docClient
    .query({
      TableName: todosTable,
      IndexName: todosIndex,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    })
    .promise();
  return result.Items;
}

export async function create(item) {
  logger.info("Call function create");
  await docClient
    .put({
      TableName: todosTable,
      Item: item,
    })
    .promise();
  return item;
}

export async function update(userId, todoId, todoUpdate) {
  logger.info(`Updating todo item ${todoId} in ${todosTable}`);
  try {
    await docClient
      .update({
        TableName: todosTable,
        Key: {
          userId,
          todoId,
        },
        UpdateExpression:
          "set #name = :name, #dueDate = :dueDate, #done = :done",
        ExpressionAttributeNames: {
          "#name": "name",
          "#dueDate": "dueDate",
          "#done": "done",
        },
        ExpressionAttributeValues: {
          ":name": todoUpdate.name,
          ":dueDate": todoUpdate.dueDate,
          ":done": todoUpdate.done,
        },
        ReturnValues: "UPDATED_NEW",
      })
      .promise();
  } catch (error) {
    logger.error("Error =======> updating Todo.", {
      error: error,
      data: {
        todoId,
        userId,
        todoUpdate,
      },
    });
    throw Error(error);
  }
  return todoUpdate;
}

export async function deleteTodo(userId, todoId) {
  logger.info(`Deleting todo item ${todoId} from ${todosTable}`);
  try {
    await docClient
      .delete({
        TableName: todosTable,
        Key: {
          userId,
          todoId,
        },
      })
      .promise();
    return "success";
  } catch (e) {
    logger.info("Error ==>>", {
      error: e,
    });
    return "Error";
  }
}

export async function getUploadUrl(todoId, userId) {
  const uploadUrl = S3.getSignedUrl("putObject", {
    Bucket: s3_bucket_name,
    Key: todoId,
    Expires: Number(url_expiration),
  });
  await docClient
    .update({
      TableName: todosTable,
      Key: {
        userId,
        todoId,
      },
      UpdateExpression: "set attachmentUrl = :URL",
      ExpressionAttributeValues: {
        ":URL": uploadUrl.split("?")[0],
      },
      ReturnValues: "UPDATED_NEW",
    })
    .promise();
  return uploadUrl;
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log("Creating a local DynamoDB instance");
    return new XAWS.DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
    });
  }

  return new XAWS.DynamoDB.DocumentClient();
}
