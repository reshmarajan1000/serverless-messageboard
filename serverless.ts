import type { AWS } from '@serverless/typescript';

import createUsers from '@functions/createUsers';
import listUsers from '@functions/listUsers';
import createBoard from '@functions/createBoard';
import listBoard from '@functions/listBoard';
import createMessages from '@functions/createMessages';
import listMessages from '@functions/listMessages';
import listUserBoards from '@functions/listUserBoards';

const serverlessConfiguration: AWS = {
  service: 'messagesboard',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    stage: '${opt:stage, self:provider.stage}',
    prefix: '${self:service}-${self:custom.stage}',
    user_table: '${self:service}-user-table-${opt:stage, self:provider.stage}',
    boards_table: '${self:service}-boards-table-${opt:stage, self:provider.stage}',
    message_table: '${self:service}-message-table-${opt:stage, self:provider.stage}',
    table_throughputs: {
      prod: 5,
      default: 1,
    },
    table_throughput: '${self:custom.TABLE_THROUGHPUTS.${self:custom.stage}, self:custom.table_throughputs.default}',
    dynamodb: {
      stages: ['dev'],
      start: {
          port: 8008,
          inMemory: true,
          heapInitial: '200m',
          heapMax: '1g',
          migrate: true,
          seed: true,
          convertEmptyValues: true,
          // Uncomment only if you already have a DynamoDB running locally
          // noStart: true
      }
    }
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      STAGE: '${self:custom.stage}',
      USER_TABLE: '${self:custom.user_table}',
      BOARDS_TABLE: '${self:custom.boards_table}',
      MESSAGE_TABLE: '${self:custom.message_table}',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
          Effect: 'Allow',
          Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem'
          ],
          Resource: [
              {"Fn::GetAtt": [ 'UserTable', 'Arn' ]},
              {"Fn::GetAtt": [ 'BoardsTable', 'Arn' ]},
              {"Fn::GetAtt": [ 'MessageTable', 'Arn' ]}
          ]
      }
  ]
  },
  // import the function via paths
  functions: { 
    createUsers, 
    listUsers,
    createBoard, 
    listBoard, 
    createMessages, 
    listMessages,
    listUserBoards
  },

  resources: {
    Resources: {
      UserTable: {
          Type: 'AWS::DynamoDB::Table',
          DeletionPolicy: 'Retain',
          Properties: {
              TableName: '${self:provider.environment.USER_TABLE}',
              AttributeDefinitions: [
                  { AttributeName: 'id', AttributeType: 'S' },
                  { AttributeName: 'email', AttributeType: 'S' },
              ],
              KeySchema: [
                  { AttributeName: 'id', KeyType: 'HASH' },
                  { AttributeName: 'email', KeyType: 'RANGE' },
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: '1',
                WriteCapacityUnits: '1'
              },
              

          }
      },
      BoardsTable: {
          Type: 'AWS::DynamoDB::Table',
          DeletionPolicy: 'Retain',
          Properties: {
              TableName: '${self:provider.environment.BOARDS_TABLE}',
              AttributeDefinitions: [
                { AttributeName: 'id', AttributeType: 'S' },
                { AttributeName: 'name', AttributeType: 'S' }
              ],
              KeySchema: [
                { AttributeName: 'id', KeyType: 'HASH' },
                { AttributeName: 'name', KeyType: 'RANGE' }
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: '1',
                WriteCapacityUnits: '1'
            }
          }
      },
      MessageTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
            TableName: '${self:provider.environment.MESSAGE_TABLE}',
            AttributeDefinitions: [
              { AttributeName: 'id', AttributeType: 'S' },
            ],
            KeySchema: [
              { AttributeName: 'id', KeyType: 'HASH' },
            ],
            ProvisionedThroughput: {
              ReadCapacityUnits: '1',
              WriteCapacityUnits: '1'
          }
        }
    }
    }
  },

}

module.exports = serverlessConfiguration;
