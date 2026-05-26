import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'name' },
  auth: true,
  fields: [
    { name: 'name', type: 'text', label: 'Nume', required: true },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          req.payload.logger.info(
            `[FIVE'S] Utilizator nou creat: ${doc.name} (${doc.email}) — rol: ${doc.role}`
          )
        }
      },
    ],
  },
}
