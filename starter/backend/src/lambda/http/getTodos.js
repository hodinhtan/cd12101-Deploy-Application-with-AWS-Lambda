const {getUserId } = require('../utils.mjs');
const { getTodosForUser } = require('../../businessLogic/todos.mjs');

export async function handler(event) {
  // TODO: Get all TODO items for a current user
  try {
    const userId = getUserId(event);
    const todos = await getTodosForUser(userId);
    return {
      statusCode: 200,
      body: JSON.stringify({ items: todos }),
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

handler.use(
cors({
  credentials: true,
})
);
