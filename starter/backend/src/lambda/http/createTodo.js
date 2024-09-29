const { CreateTodo } = require('../../businessLogic/todos.mjs');
import { getUserId } from '../utils.mjs';

export async function handler(event) {
  const newTodo = JSON.parse(event.body);
  const userId = getUserId(event);
  try {
    const newItem = await CreateTodo(newTodo, userId);
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      statusCode: 201,
      body: JSON.stringify({
        item: newItem,
      }),
    };
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

handler.use(
  cors({
    credentials: true,
  })
);
