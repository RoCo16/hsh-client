export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-2",
      BUCKET: "email-sys-uploads"
    },
    apiGateway: {
      REGION: "us-east-2",
      MailerURL: "https://u5s6h2agtk.execute-api.us-east-2.amazonaws.com/prod", 
      EmailsURL: "https://dtj3oolc9a.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_b7GYypWgt",
      APP_CLIENT_ID: "3gtje7jdi2s850303flofoihie",
      IDENTITY_POOL_ID: "us-east-2:d7032214-e606-4f4a-af15-5fd71a58694f"
    }
  };
  