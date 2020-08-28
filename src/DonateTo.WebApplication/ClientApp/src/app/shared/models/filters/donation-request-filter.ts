import { BaseFilter } from './base-filter';

export class DonationRequestFilter extends BaseFilter {
  title: string;
  observation: string;
  createdDateBegin: Date;
  createdDateEnd: Date;
  finishDateBegin: Date;
  finishDateEnd: Date;
  organizationName: string;
}
