import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/loginUser.dto';

@Controller('login')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post() 
    async login(@Body() loginUserDto: LoginUserDto){
        return await this.authService.validateUserByPassword(loginUserDto);
    }
}
