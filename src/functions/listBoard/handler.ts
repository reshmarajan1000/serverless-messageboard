import 'source-map-support/register';
import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const listBoard: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const params = {
    TableName: process.env.BOARDS_TABLE,
  };
  const results = await dynamoDB.scan(params).promise();
  
  return formatJSONResponse({
    statusCode: 200,
    body: JSON.stringify(results),
  });
}
export const main =  middyfy(listBoard);
