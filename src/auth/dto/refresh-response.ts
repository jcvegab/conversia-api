import { ObjectType, PickType } from '@nestjs/graphql';
import { LoginResponse } from './login-response';

@ObjectType()
export class RefreshResponse extends PickType(LoginResponse, ['accessToken']) {}
