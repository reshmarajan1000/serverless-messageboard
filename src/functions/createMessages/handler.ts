import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import * as uuid from "uuid"; 
const dynamoDB = new AWS.DynamoDB.DocumentClient();

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const createMessages: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let messageId = uuid.v4();
  let userId = `${event.body.userId}`;
  let boardName = `${event.body.boardName}`;
  let message = `${event.body.message}`;
  let timestamp = new Date().getTime();
  const params = {
    TableName: process.env.MESSAGE_TABLE,
    Item:{
      id: messageId,
      userId: userId,
      boardName: boardName,
      message: message,
      createdAt : timestamp,
    },
  };
  await dynamoDB.put(params).promise();
  return formatJSONResponse({
    statusCode: 200,
    body: JSON.stringify(params.Item),
  });
}

export const main =  middyfy(createMessages); 
