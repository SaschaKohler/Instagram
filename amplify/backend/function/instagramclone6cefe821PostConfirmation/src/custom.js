/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require('@aws-sdk/lib-dynamodb');

const env = process.env.ENV;
const REGION = process.env.REGION;
const AppsyncID = process.env.API_INSTAGRAMCLONE_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppsyncID}-${env}`;
const client = new DynamoDBClient({region: REGION});
const docClient = DynamoDBDocumentClient.from(client);

const userExists = async id => {
  const params = new GetCommand({
    TableName,
    Key: id,
  });

  try {
    const response = await docClient.send(params);
    return !!response?.Item;
  } catch (e) {
    return false;
  }
};

const saveUser = async user => {
  const date = new Date();
  const dateStr = date.toISOString();
  const Item = {
    ...user,
    _typename: 'User',
    createdAt: dateStr,
    updatedAt: dateStr,
  };
  const params = new PutCommand({
    TableName,
    Item,
  });
  try {
    const response = await docClient.send(params);
  } catch (e) {
    return false;
  }
};

exports.handler = async (event, context) => {
  if (!event?.request?.userAttributes) {
    return;
  }

  const {sub, name, email} = event.request.userAttributes; // {sub, email, name}

  const newUser = {
    id: sub,
    name,
    username: email,
    email,
    nofPosts: 0,
    nofFollowers: 0,
    nofFollowings: 0,
  };
  //
  // check if the user already exists
  if (!(await userExists(newUser.id))) {
    // if not, save the user to database.
    await saveUser(newUser);
    console.log(`User ${newUser.id} has been saved to the database`);
  } else {
    console.log(`User ${newUser.id} already exists`);
  }

  return event;
};
