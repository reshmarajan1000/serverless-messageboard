# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

### Alternate
- Run `npm install -g serverless`
- Run `serverless deploy` to deploy this stack to AWS

## Test your service

### Locally
createUsers
- serverless invoke local --function createUsers --path src/functions/createUsers/mock.json
- `npx sls invoke local -f createUsers --path src/functions/createUsers/mock.json` if you're using NPM
- `yarn sls invoke local -f createUsers --path src/functions/createUsers/mock.json` if you're using Yarn

listUsers
- serverless invoke local --function listUsers --path src/functions/listUsers/mock.json
- `npx sls invoke local -f listUsers --path src/functions/listUsers/mock.json` if you're using NPM
- `yarn sls invoke local -f listUsers --path src/functions/listUsers/mock.json` if you're using Yarn

createBoard
- serverless invoke local --function createBoard --path src/functions/createBoard/mock.json
- `npx sls invoke local -f createBoard --path src/functions/createBoard/mock.json` if you're using NPM
- `yarn sls invoke local -f createBoard --path src/functions/createBoard/mock.json` if you're using Yarn

listBoard
- serverless invoke local --function listBoard --path src/functions/listBoard/mock.json
- `npx sls invoke local -f listBoard --path src/functions/listBoard/mock.json` if you're using NPM
- `yarn sls invoke local -f listBoard --path src/functions/listBoard/mock.json` if you're using Yarn

createMessages
- serverless invoke local --function createMessages --path src/functions/createMessages/mock.json
- `npx sls invoke local -f createMessages --path src/functions/createMessages/mock.json` if you're using NPM
- `yarn sls invoke local -f createMessages --path src/functions/createMessages/mock.json` if you're using Yarn

listMessages
- serverless invoke local --function listMessages --path src/functions/listMessages/mock.json
- `npx sls invoke local -f listMessages --path src/functions/listMessages/mock.json` if you're using NPM
- `yarn sls invoke local -f listMessages --path src/functions/listMessages/mock.json` if you're using Yarn

listUserBoard
- serverless invoke local --function listUserBoard --path src/functions/listUserBoard/mock.json
- `npx sls invoke local -f listUserBoard --path src/functions/listUserBoard/mock.json` if you're using NPM
- `yarn sls invoke local -f listUserBoard --path src/functions/listUserBoard/mock.json` if you're using Yarn



### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.
- Example for createUsers
```
curl --location --request POST 'https://************/dev/createUsers' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Frederic",
    "email": "Frederic@fred.com",
}'
```

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── hello
│   │   │   ├── handler.ts      # `Hello` lambda source code
│   │   │   ├── index.ts        # `Hello` lambda Serverless configuration
│   │   │   ├── mock.json       # `Hello` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `Hello` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`

### Next Release

- Validation
- Code Refactoring
- TDD
- Error Handling
- Handling Large Volume of Data
- Code Optimisation

