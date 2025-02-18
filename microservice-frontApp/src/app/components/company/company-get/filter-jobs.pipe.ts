import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterJobs',
})
export class FilterJobsPipe implements PipeTransform {
  transform(jobs: any[], filter: string, jobTypeFilter: string): any[] {
    return jobs.filter((job) => {
      const jobTitleAndLocation = job.jobTitle.toLowerCase() + job.location.toLowerCase();
      const filterLower = filter.toLowerCase();
      if (jobTitleAndLocation.includes(filterLower)) {
        if (jobTypeFilter) {
          return job.jobType === jobTypeFilter;
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
  }
}
