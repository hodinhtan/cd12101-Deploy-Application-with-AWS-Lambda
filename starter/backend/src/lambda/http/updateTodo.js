export async  function handler(event) {
  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)
  const userId = getUserId(event);
  try {
    await UpdateTodo(userId, todoId, updatedTodo);
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      statusCode: 204,
      body: JSON.stringify({ item: updatedTodo }),
    };
  } catch (error) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
}

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true,
  })
);