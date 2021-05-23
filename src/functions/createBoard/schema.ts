export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    userId: { type: 'string' }
  },
  required: ['name','userId']
} as const;
