import 'source-map-support/register';

import * as AWS from 'aws-sdk';
import * as uuid from "uuid"; 
const dynamoDB = new AWS.DynamoDB.DocumentClient();

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const createUsers: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let userId = uuid.v4();
  let email = `${event.body.email}`;
  let name = `${event.body.name}`;
  let timestamp = new Date().getTime();
  const params = {
    TableName: process.env.USER_TABLE,
    Item:{
      id: userId,
      email : email,
      name : name,
      createdAt : timestamp,
    },
  };
  await dynamoDB.put(params).promise();
  return formatJSONResponse({
    statusCode: 200,
    userId: `${userId}`,
  });
}

export const main = middyfy(createUsers);
