import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_2MeJXIzsv",
    ClientId: "1u8hofr011bfr7u1tp58boc3q9"
}

export default new CognitoUserPool(poolData);