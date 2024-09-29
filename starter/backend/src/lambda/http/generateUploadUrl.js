import { createAttachmentPresignedUrl } from "../../businessLogic/todos.mjs";
import { getUserId } from "../utils.mjs";


export const handler = async (event) => {
  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event);
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  if (event.httpMethod === 'OPTIONS') {
    return {
        statusCode: 204,
        headers: {
            'Access-Control-Allow-Origin': '*', // Allow any origin or specify your frontend URL
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS', // Allowed methods
            'Access-Control-Allow-Headers': 'Content-Type', // Allowed headers
        },
    };
  }
  const url = await createAttachmentPresignedUrl(userId, todoId);
  return {
    headers: {
      'Access-Control-Allow-Origin': '*', // Change this to your frontend's origin in production
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS', // Specify allowed methods
      'Access-Control-Allow-Headers': 'Content-Type', // Specify allowed headers
  },
    statusCode: 201,
    body: JSON.stringify({ uploadUrl: url }),
  };
};