
export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)
  // TODO: Remove a TODO item by id
  try{
    await deleteTodoItem(todoId, userId)
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      statusCode: 204,
      body: JSON.stringify({"message": "Item deleted"})
    }
  } catch (error) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      statusCode: 500,
      body: JSON.stringify({ Error: error.message }),
    };
  }
}

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true,
  })
);
