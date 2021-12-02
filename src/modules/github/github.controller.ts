import { Controller, Get, Param, Query } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('repository/:repoName/branch/:branchName/commits')
  async getAllAction(
      @Param('repoName') repoName: string,
      @Param('branchName') branchName : string,
      @Query('filter') filter: string
  )
      {
    return this.githubService.getAllAction(repoName, branchName, filter);
  }
}
