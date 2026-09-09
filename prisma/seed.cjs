const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');

  const roles = [
    {
      id: 1,
      name: 'Super Admin',
      description: 'System Administrator with full access',
      permissions: JSON.stringify({
        dashboard: { view: true },
        customers: { view: true, create: true, edit: true, delete: true },
        engineers: { view: true, create: true, edit: true, delete: true },
        service_calls: { view: true, create: true, edit: true, delete: true },
        users: { view: true, create: true, edit: true, delete: true },
        reports: { view: true },
        settings: { view: true, edit: true }
      })
    },
    {
      id: 2,
      name: 'Admin',
      description: 'Administrator with almost full access',
      permissions: JSON.stringify({
        dashboard: { view: true },
        customers: { view: true, create: true, edit: true, delete: false },
        engineers: { view: true, create: true, edit: true, delete: false },
        service_calls: { view: true, create: true, edit: true, delete: true },
        users: { view: true, create: true, edit: true, delete: false },
        reports: { view: true },
        settings: { view: true, edit: false }
      })
    },
    {
      id: 3,
      name: 'Receptionist',
      description: 'Front desk access',
      permissions: JSON.stringify({
        dashboard: { view: true },
        customers: { view: true, create: true, edit: true, delete: false },
        engineers: { view: true, create: false, edit: false, delete: false },
        service_calls: { view: true, create: true, edit: true, delete: false },
        users: { view: false },
        reports: { view: false },
        settings: { view: false }
      })
    },
    {
      id: 4,
      name: 'Service Manager',
      description: 'Manager of service department',
      permissions: JSON.stringify({
        dashboard: { view: true },
        customers: { view: true, create: true, edit: true, delete: false },
        engineers: { view: true, create: false, edit: false, delete: false },
        service_calls: { view: true, create: true, edit: true, delete: false },
        users: { view: false },
        reports: { view: true },
        settings: { view: false }
      })
    },
    {
      id: 5,
      name: 'Engineer',
      description: 'Field service engineer',
      permissions: JSON.stringify({
        dashboard: { view: true },
        customers: { view: true, create: false, edit: false, delete: false },
        engineers: { view: false },
        service_calls: { view: true, create: false, edit: true, delete: false },
        users: { view: false },
        reports: { view: false },
        settings: { view: false }
      })
    }
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: role,
      create: role,
    });
    console.log(`Upserted role: ${role.name}`);
  }

  const adminPassword = bcrypt.hashSync('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      password_hash: adminPassword,
      must_change_password: true
    },
    create: {
      username: 'admin',
      password_hash: adminPassword,
      full_name: 'System Administrator',
      email: 'admin@prasadsoftware.com',
      role_id: 1,
      must_change_password: true
    }
  });
  console.log(`Upserted admin user: ${adminUser.username}`);

  const defaultSettings = [
    { key: 'company_name', value: 'Prasadsoftware and Technical Solutions' },
    { key: 'company_address', value: 'Headquarters' },
    { key: 'company_phone', value: '1234567890' },
    { key: 'company_email', value: 'contact@prasadsoftware.com' },
    { key: 'company_gst', value: 'GSTIN1234567' },
    { key: 'theme', value: 'light' },
    { key: 'backup_location', value: 'd:/backups/' }
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
    console.log(`Upserted setting: ${setting.key}`);
  }

  console.log('Seed process completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
