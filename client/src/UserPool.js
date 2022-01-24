import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_32FYuhCSp",
    ClientId: "6p5ii1qvo1p042qd93cciqm531"
}

export default new CognitoUserPool(poolData);