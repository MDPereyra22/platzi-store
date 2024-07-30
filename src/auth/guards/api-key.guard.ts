import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import config from 'src/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(config.KEY) private configService : ConfigType<typeof config>,
    private reflector: Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get('isPublic', context.getHandler())
    if(isPublic){
      return true
    }
    const request : Request = context.switchToHttp().getRequest()
    const authHeader = request.header('Auth')
    const isAuth = authHeader === this.configService.apiKey
    console.log(this.configService.apiKey)
    if(!isAuth){
      throw new UnauthorizedException('No está autorizado a realizar esta operación')
    }
    return true;
  }
}
