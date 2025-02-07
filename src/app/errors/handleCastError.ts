import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path || 'Unknown Path',
      message: err.message || 'Invalid ID Format',
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID Format',
    errorSources,
  };
};

export default handleCastError;
