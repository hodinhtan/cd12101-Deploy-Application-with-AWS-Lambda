const { createAttachmentPresignedUrl } = require("../../businessLogic/todos.mjs");

export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event);
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  
  const url = await createAttachmentPresignedUrl(userId, todoId);
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    statusCode: 201,
    body: JSON.stringify({ uploadUrl: url }),
  };
}

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true,
  })
);

