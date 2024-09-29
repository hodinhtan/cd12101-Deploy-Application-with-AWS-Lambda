import { UpdateTodo } from '../../businessLogic/todos.mjs';
import { getUserId } from '../utils.mjs';

export const handler = async (event) => {
  const todoId = event.pathParameters.todoId;
  const updatedTodo = JSON.parse(event.body);
  const userId = getUserId(event);
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
  try {
    await UpdateTodo(userId, todoId, updatedTodo);
    return {
      headers: {
        'Access-Control-Allow-Origin': '*', // Change this to your frontend's origin in production
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS', // Specify allowed methods
        'Access-Control-Allow-Headers': 'Content-Type', // Specify allowed headers
      },
      statusCode: 204,
      body: JSON.stringify({ item: updatedTodo }),
    };
  } catch (error) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*', // Change this to your frontend's origin in production
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Specify allowed methods
        'Access-Control-Allow-Headers': 'Content-Type', // Specify allowed headers
    },
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}