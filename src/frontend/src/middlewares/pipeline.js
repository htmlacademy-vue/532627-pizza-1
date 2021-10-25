export const pipeline = (context, middlewares, index) => {
  const nextMiddleware = middlewares[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = pipeline(context, middlewares, index + 1);
    nextMiddleware({ ...context, nextMiddleware: nextPipeline });
  };
};
