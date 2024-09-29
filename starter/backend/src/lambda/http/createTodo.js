import { CreateTodo } from '../../businessLogic/todos.mjs';
import { getUserId } from '../utils.mjs';

export const handler = async (event) => {
  const newTodo = JSON.parse(event.body);
  const userId = getUserId(event);
  try {
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
      const newItem = await CreateTodo(newTodo, userId);
      return {
        statusCode: 201,
        body: JSON.stringify({
          item: newItem,
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Change this to your frontend's origin in production
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS', // Specify allowed methods
          'Access-Control-Allow-Headers': 'Content-Type', // Specify allowed headers
      },
      };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ Error: error.message }),
    };
  }
};