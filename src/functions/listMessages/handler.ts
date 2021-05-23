import 'source-map-support/register';
import * as AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const listMessages: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const params = {
    TableName: process.env.MESSAGE_TABLE,
    FilterExpression:
    "contains(boardName, :boardName)",
    ExpressionAttributeValues: {
      ":boardName": `${event.body.boardName}`,
     },
  };
  const results = await dynamoDB.scan(params).promise();
  return formatJSONResponse({
    statusCode: 200,
    body: JSON.stringify(results.Items),
  })
}
export const main = middyfy(listMessages);
