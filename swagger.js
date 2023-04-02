const StoreShema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    BASE_CODE: {
      type: 'string',
    },
    USD: {
      type: 'string',
    },

    EUR: {
      type: 'string',
    },
    GBP: {
      type: 'string',
    },
    CNY: {
      type: 'string',
    },
    created_at: {
      type: 'string',
    },
    updated_at: {
      type: 'string',
    },
  },
};

const NotFoundSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
  },
};
module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Currency Rates API',
    version: '1.0.0',
  },
  paths: {
    '/api/rates': {
      get: {
        summary: 'Fetch all persisted rate rates',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: StoreShema,
              },
            },
          },
          404: {
            description: 'Not Found',
            content: {
              'application/json': {
                schema: NotFoundSchema,
              },
            },
          },
        },
      },
    },
    '/api/rate': {
      post: {
        summary: 'Create a new record of currencies',
        requestBody: {
          content: {
            'application/json': {
              schema: StoreShema,
              // required: ['BASE_CODE', 'USD', 'EUR', 'GBP', 'CNY', 'created_at'],
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: StoreShema,
              },
            },
          },
          500: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/rate/now': {
      get: {
        summary: 'Fetch the latest rate rates',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: StoreShema,
              },
            },
          },
          404: {
            description: 'Not Found',
            content: {
              'application/json': {
                schema: NotFoundSchema,
              },
            },
          },
        },
      },
    },

    '/api/rate/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'The ID of the rate to update',
          schema: {
            type: 'integer',
          },
        },
      ],
      put: {
        summary: 'Update a rate record by ID',
        requestBody: {
          content: {
            'application/json': {
              schema: StoreShema,
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: StoreShema,
              },
            },
          },
          404: {
            description: 'Not Found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Rate record not found',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/rate/{uid}': {
      parameters: [
        {
          name: 'uid',
          in: 'path',
          required: true,
          description: 'The ID of the rate to delete',
          schema: {
            type: 'integer',
          },
        },
      ],
      delete: {
        summary: 'Delete a rate by ID',
        responses: {
          200: {
            description: 'Succesfully deleted a record ',
          },
          204: {
            description: 'No Content',
          },
          404: {
            description: 'Not Found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Rate record not found',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
