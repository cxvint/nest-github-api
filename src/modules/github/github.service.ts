import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';


@Injectable()
export class GithubService {
  constructor(private httpService: HttpService) {}

    getAllAction(repoName: string, branchName: string, filter: string ): Observable<AxiosResponse<any[]>> {

    return this.httpService.get(`https://api.github.com/repos/${repoName}/${branchName}/commits`).pipe(
      map(response => {
        if (!filter) {
          return response.data;
        }
        
        return response.data.map((commit) => {
    
            if (filter === 'sha') {
              return {sha:commit.sha}
              }

            if (filter === 'message') {
              return {message:commit.commit.message}
            }
            return commit;
        });
      }), 
    );
    
  }

}

