import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GithubService {
  async getAllAction(
    repoName: string,
    branchName: string,
    filter: string,
    perPage = 25,
  ): Promise<{ data: any[]; count: number }> {
    const { data } = await axios.get(
      `https://api.github.com/repos/${repoName}/${branchName}/commits`,
      { params: { per_page: perPage } },
    );
    if (!filter) {
      return { data, count: data.length };
    }

    const filterData = data.map((commit) => {
      if (filter === 'sha') {
        return { sha: commit.sha };
      }

      if (filter === 'message') {
        return { message: commit.commit.message };
      }
      return commit;
    });
    const count = filterData.length;

    return { count: count, data: filterData };
  }
}
