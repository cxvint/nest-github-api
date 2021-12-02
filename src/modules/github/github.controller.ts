import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GithubService } from './github.service';

@ApiTags('/api/github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('repository/:repoName/branch/:branchName/commits')
  async getAllAction(
    @Param('repoName') repoName: string,
    @Param('branchName') branchName: string,
    @Query('filter') filter: string,
    @Query('per_page') perPage: number,
  ) {
    return this.githubService.getAllAction(
      repoName,
      branchName,
      filter,
      perPage,
    );
  }
}
