/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const {
  GetItemCommand,
  PutItemCommand,
  DynamoDBClient,
} = require('@aws-sdk/client-dynamodb');

const env = process.env.ENV;
const REGION = process.env.REGION;
const AppsyncID = process.env.API_INSTAGRAMCLONE_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppsyncID}-${env}`;

const dynamoClient = new DynamoDBClient({region: REGION});
const userExists = async id => {
  console.log(TableName);
  const params = new GetItemCommand({
    TableName,
    Key: id,
  });

  try {
    const response = await dynamoClient.send(params);
    console.log(response);
    return !!response?.Item;
  } catch (e) {
    return false;
  }
};

const saveUser = async user => {
  const date = new Date();
  const dateStr = date.toISOString();
  // const timestamp = date.getTime();
  const Item = {
    ...user,
    _typename: 'User',
    createdAt: dateStr,
    updatedAt: dateStr,
  };
  const params = new PutItemCommand({
    TableName,
    Item,
  });
  try {
    console.log(params);
    const response = await dynamoClient.send(params);
    console.log(response);
  } catch (e) {
    return false;
  }
};

exports.handler = async (event, context) => {
  console.log('Heyy, Lambda function is working and is updated');
  console.log(event);
  console.log(event.userName);
  console.log(event?.request);

  if (!event?.request?.userAttributes) {
    console.log('No user data available');
    return;
  }

  console.log(event?.request?.userAttributes);
  const username = event.userName;
  const {sub, name, email} = event.request.userAttributes; // {sub, email, name}

  const newUser = {
    id: sub,
    owner: sub,
    name,
    username,
    email,
    nofPosts: 0,
    nofFollowers: 0,
    nofFollowings: 0,
  };
  console.log(sub, name, username, email);
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
