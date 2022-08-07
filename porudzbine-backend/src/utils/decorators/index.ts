export * from './daj-korisnika.decorator';import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const DajKorisnika = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return data ? request.user[data] : request.user;
})