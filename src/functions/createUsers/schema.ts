export default {
  type: "object",
  properties: {
    email: { type: 'string' },
    name: { type: 'string' },
  },
  required: ['email', 'name']
} as const;