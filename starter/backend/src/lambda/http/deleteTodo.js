import { DeleteTodo } from '../../businessLogic/todos.mjs';
import { getUserId } from '../utils.mjs';
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';
import middy from '@middy/core';

export const handler = async (event) => {
  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event);
  // TODO: Remove a TODO item by id
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
    await DeleteTodo(todoId, userId);
    return {
      headers: {
        'Access-Control-Allow-Origin': '*', // Change this to your frontend's origin in production
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS', // Specify allowed methods
        'Access-Control-Allow-Headers': 'Content-Type', // Specify allowed headers
      },
      statusCode: 200,
      body: JSON.stringify({ "message": "Item deleted" })
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
};

