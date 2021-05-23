export default {
  type: "object",
  properties: {
    userId: { type: 'string' },
    boardName: { type: 'string' },
    message: { type: 'string' },
  },
  required: ['userId','boardName','message']
} as const;
