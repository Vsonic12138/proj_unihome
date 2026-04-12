import type { CollectionConfig } from 'payload'

export const Tickets: CollectionConfig = {
  slug: 'tickets',
  labels: {
    singular: {
      zh: '服务单',
      en: 'Service Ticket',
      ja: 'サービスチケット',
    },
    plural: {
      zh: '服务单',
      en: 'Service Tickets',
      ja: 'サービスチケット',
    },
  },
  admin: {
        group: {
      zh: "运营与服务",
      en: "Operations & Services",
      ja: "運営とサービス",
    },
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'intention', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // Allow anyone to submit
    read: ({ req: { user } }) => Boolean(user), // Admins only
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'email',
      type: 'email',
      required: false,
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'intention',
      type: 'text',
      required: true,
      label: 'Cooperation Intention',
    },
    {
      name: 'message',
      type: 'textarea',
      required: false,
      label: 'Message',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      label: 'Status',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Resolved', value: 'resolved' },
      ],
    },
  ],
}
