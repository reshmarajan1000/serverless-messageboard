import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import * as uuid from "uuid"; 
const dynamoDB = new AWS.DynamoDB.DocumentClient();

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const createBoard: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let boardId = uuid.v4();
  let boardName = `${event.body.name}`;
  let userId = `${event.body.userId}`;
  const timestamp = new Date().getTime();
  const params = {
    TableName: process.env.BOARDS_TABLE,
    Item:{
      id: boardId,
      name : boardName,
      userId : userId,
      createdAt : timestamp,
    },
  };
  await dynamoDB.put(params).promise();
  return formatJSONResponse({
    statusCode: 200,
    body: JSON.stringify(params.Item),
  });
}

export const main =  middyfy(createBoard); 
