import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../models/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { ServerMessages } from '../../utils/serverMessages.util';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user-list')
  @UseGuards(AuthGuard())
  public async getUsers(): Promise<ServerMessages> {
    return this.userService.getAllUsers();
  }

  @Post('register')
  /* @UseGuards(AuthGuard()) */
  public async registerUser(@Body() body): Promise<ServerMessages> {
    return this.userService.registerUser(body);
  }

  /* @Post('testuserband')
  testUserWithBand( @Body() body : any){
    return this.userService.testUserWithBand(body.bandId);
  } */
  // This route will require successfully passing our default auth strategy (JWT) in order
  // to access the route
  /* @Get('testheader')
  @UseGuards(AuthGuard())
  testAuthRoute( @Request() req ){
    let user = req.user;

    return ServerMessages.messageResponse(false , "Acceso a ruta protegida correctamente", { user : user }); 
  } */
}
