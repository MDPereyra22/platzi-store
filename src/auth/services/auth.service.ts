import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService : UsersService,
    private jwtService: JwtService
  ){}

  async validateUser(email: string, password: string){
    const user : User = await this.userService.findByEmail(email)
    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch){
      return user
    }
    return null
  }


  async generateJWT(user: User){
    const payload : PayloadToken = { role: user.role, sub: user.id}
    return{
     acces_token: this.jwtService.sign(payload),
     user
    }
 }
}
