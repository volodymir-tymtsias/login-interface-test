import { Detail } from '../types/ResponseUser';

export const getErrorMessage = (detail: Detail) => {
  if (typeof(detail) === 'string') return detail;

  if (typeof(detail) !== 'number') {
    return `Field: ${detail[0].field_name}, message: ${detail[0].error}`;
  }

  return 'Something wrong';
};