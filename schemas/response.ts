export const opts = {
  schema: {
    response: {
      "2xx": {
        type: "object",
        properties: {
          hello: {
            type: "string",
          },
        },
      },
    },
  },
};
