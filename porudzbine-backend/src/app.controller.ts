import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService, Post as PostModel } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello()  {
    return await this.appService.getUsers();
  }

  @Get('/posts')
  getPosts() {
    // return this.appService.getPosts();
  }

  @Post('/posts')
  async createPost(@Body() post: PostModel) {
    // await this.appService.kreirajPost(post);
    return "SUCCESS";
  }
}
