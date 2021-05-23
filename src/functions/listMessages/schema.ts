export default {
  type: "object",
  properties: {
    boardName: { type: 'string' }
  },
  required: ['boardName']
} as const;
