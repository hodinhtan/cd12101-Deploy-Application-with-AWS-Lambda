import { getUserId } from '../utils.mjs';
import { getTodosForUser } from '../../businessLogic/todos.mjs';


export const handler = async (event) => {
  // TODO: Get all TODO items for a current user
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
    const userId = getUserId(event);
    const todos = await getTodosForUser(userId);
    return {
      statusCode: 200,
      body: JSON.stringify({ items: todos }),
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow any origin or specify your frontend URL
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS', // Allowed methods
        'Access-Control-Allow-Headers': 'Content-Type', // Allowed headers
    },
    };
  } catch (error) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*', // Change this to your frontend's origin in production
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS', // Specify allowed methods
        'Access-Control-Allow-Headers': 'Content-Type', // Specify allowed headers
      },
      statusCode: 500,
      body: JSON.stringify({ error: error.message }), // Ensure error message is properly serialized
    };
  }
}
