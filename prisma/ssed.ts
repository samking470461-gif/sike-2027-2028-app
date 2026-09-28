/**
 * SIKE 2027–2028 — database seed (idempotent).
 * Place next to schema.prisma (e.g. backend/prisma/seed.ts) and run: npx prisma db seed
 * Prisma 6: add  "prisma": { "seed": "tsx prisma/seed.ts" }  to package.json.
 * Deps: @prisma/client, @node-rs/argon2. Dev deps: tsx.
 *
 * - Re-running never overwrites what the Owner edited (prices, settings, content): rows are only
 *   created when missing. Synced on every run: the permission catalog and OWNER's grants.
 * - No credentials in source. The Owner account is created only if SEED_OWNER_EMAIL and
 *   SEED_OWNER_PASSWORD are set; remove them from the environment after the first run.
 * - Subjects are intentionally NOT seeded: the list differs per curriculum/branch and is entered by the Owner.
 * - Not executed against a database yet (no network in the authoring sandbox): try a scratch DB first.
 */
import { Prisma, PrismaClient, type SubjectScope } from '@prisma/client';
import { hash } from '@node-rs/argon2'; // defaults: Argon2id, OWASP-recommended parameters

const prisma = new PrismaClient();
const SEASON = 2027;

// ───────────── RBAC ─────────────

type Perm = [key: string, group: string, label: string];

const PERMISSIONS: Perm[] = [
  ['dashboard.view', 'dashboard', 'عرض لوحة التحكم'],
  ['analytics.read', 'dashboard', 'عرض التقارير والإحصاءات'],
  ['presence.read', 'dashboard', 'عرض الطلاب المتصلين'],

  ['orders.read', 'orders', 'عرض الطلبات'],
  ['orders.update', 'orders', 'تعديل بيانات الطلب'],
  ['orders.update_status', 'orders', 'تغيير حالة الطلب'],
  ['orders.note', 'orders', 'ملاحظات داخلية على الطلب'],
  ['orders.delete', 'orders', 'حذف الطلبات'],

  ['students.read', 'students', 'عرض الطلاب'],
  ['students.update', 'students', 'تعديل بيانات الطالب'],
  ['students.toggle', 'students', 'تفعيل/تعطيل حساب طالب'],

  ['notifications.send', 'notifications', 'إرسال إشعارات'],

  ['payments.read', 'payments', 'عرض المدفوعات'],
  ['payments.verify', 'payments', 'التحقق من الدفع أو رفضه'],
  ['payments.refund', 'payments', 'تسجيل استرداد'],
  ['payments.methods', 'payments', 'إدارة طرق الدفع وعناوين المحافظ'],

  ['files.read', 'files', 'عرض ملفات الطلبات وإثباتات الدفع'],
  ['files.delete', 'files', 'حذف الملفات'],

  ['services.manage', 'catalog', 'إدارة الخدمات'],
  ['prices.manage', 'catalog', 'تعديل الأسعار'],
  ['catalog.manage', 'catalog', 'إدارة الشهادات والفروع والمناهج والمواد'],

  ['cms.manage', 'content', 'إدارة المحتوى والصفحات والأسئلة الشائعة'],
  ['media.manage', 'content', 'إدارة الوسائط والصور'],
  ['settings.manage', 'settings', 'إدارة الإعدادات ومعلومات التواصل والهوية'],

  ['users.read', 'users', 'عرض حسابات الفريق'],
  ['users.manage', 'users', 'إنشاء المشرفين وتفعيلهم/تعطيلهم'],
  ['roles.manage', 'users', 'إدارة الأدوار والصلاحيات'],
  ['audit.read', 'users', 'عرض سجل التدقيق'],

  // Student self-service. Ownership of the resource is still checked server-side on every request.
  ['self.orders.create', 'self', 'إنشاء طلب'],
  ['self.orders.read', 'self', 'عرض طلباتي'],
  ['self.files.upload', 'self', 'رفع مستنداتي وإثبات الدفع'],
  ['self.profile.update', 'self', 'تعديل ملفي الشخصي'],
  ['self.notifications.read', 'self', 'قراءة إشعاراتي'],
];

const STAFF = PERMISSIONS.map(([k]) => k).filter((k) => !k.startsWith('self.'));
const SELF = PERMISSIONS.map(([k]) => k).filter((k) => k.startsWith('self.'));

const ROLES: { key: string; name: string; grants: string[] }[] = [
  { key: 'OWNER', name: 'المالك', grants: STAFF },
  {
    key: 'SUPER_ADMIN',
    name: 'مشرف عام',
    // Wallet/payment-method edits stay Owner-only by default. Role hierarchy (nobody grants or edits
    // a role above their own) is enforced in the service layer, not here.
    grants: STAFF.filter((k) => !['roles.manage', 'orders.delete', 'files.delete', 'payments.methods'].includes(k)),
  },
  {
    key: 'ADMIN',
    name: 'مشرف',
    grants: [
      'dashboard.view', 'analytics.read', 'presence.read',
      'orders.read', 'orders.update', 'orders.update_status', 'orders.note',
      'students.read', 'students.update', 'notifications.send', 'files.read', 'services.manage',
    ],
  },
  {
    key: 'SUPPORT',
    name: 'دعم فني',
    grants: [
      'dashboard.view', 'presence.read', 'orders.read', 'orders.update_status', 'orders.note',
      'students.read', 'notifications.send', 'files.read',
    ],
  },
  {
    key: 'FINANCE',
    name: 'مالية',
    grants: [
      'dashboard.view', 'analytics.read', 'orders.read',
      'payments.read', 'payments.verify', 'payments.refund', 'files.read',
    ],
  },
  { key: 'STUDENT', name: 'طالب', grants: SELF },
];

async function seedRbac() {
  for (const [key, group, description] of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { key },
      create: { key, group, description },
      update: { group, description },
    });
  }
  const idOf = new Map((await prisma.permission.findMany()).map((p) => [p.key, p.id] as const));

  for (const r of ROLES) {
    const existing = await prisma.role.findUnique({ where: { key: r.key } });
    const role = existing ?? (await prisma.role.create({ data: { key: r.key, name: r.name, isSystem: true } }));
    // Default grants only on first creation (the Owner may edit them later); OWNER is re-synced every run.
    if (existing && r.key !== 'OWNER') continue;
    await prisma.rolePermission.createMany({
      data: r.grants.map((k) => {
        const permissionId = idOf.get(k);
        if (!permissionId) throw new Error(`Unknown permission "${k}" in role ${r.key}`);
        return { roleId: role.id, permissionId };
      }),
      skipDuplicates: true,
    });
  }
}

// ───────────── Catalog & initial prices (USDT) ─────────────

async function seedCatalog() {
  const bac = await prisma.certificate.upsert({
    where: { slug: 'baccalaureate' },
    update: {},
    create: { slug: 'baccalaureate', name: 'البكالوريا', hasBranches: true, sortOrder: 1 },
  });
  const ninth = await prisma.certificate.upsert({
    where: { slug: 'ninth' },
    update: {},
    create: { slug: 'ninth', name: 'التاسع', sortOrder: 2 },
  });

  const branches = [
    { slug: 'scientific', name: 'الفرع العلمي', sortOrder: 1 },
    { slug: 'literary', name: 'الفرع الأدبي', sortOrder: 2 },
  ];
  for (const b of branches) {
    await prisma.branch.upsert({
      where: { certificateId_slug: { certificateId: bac.id, slug: b.slug } },
      update: {},
      create: { certificateId: bac.id, ...b },
    });
  }

  const curricula = [
    { slug: 'idlib', name: 'منهاج إدلب', sortOrder: 1 },
    { slug: 'damascus', name: 'منهاج دمشق', sortOrder: 2 },
  ];
  for (const c of curricula) {
    await prisma.curriculum.upsert({ where: { slug: c.slug }, update: {}, create: c });
  }

  const general = await prisma.serviceCategory.upsert({
    where: { slug: 'general' },
    update: {},
    create: { slug: 'general', name: 'الخدمات', sortOrder: 1 },
  });
  const review = await prisma.serviceCategory.upsert({
    where: { slug: 'mark-review' },
    update: {},
    create: { slug: 'mark-review', name: 'مراجعة العلامات', sortOrder: 2 },
  });

  // Initial values only — the Owner edits them from the dashboard. price: null => QUOTED (set per order by staff).
  // branchId/curriculumId stay null: the same price applies to every branch and curriculum.
  type Svc = { id: string; categoryId: string; certificateId: string; scope: SubjectScope; name: string; price: number | null };
  const services: Svc[] = [
    { id: 'svc-bac-single', categoryId: general.id, certificateId: bac.id, scope: 'SINGLE', name: 'البكالوريا — مادة واحدة', price: 250 },
    { id: 'svc-bac-all', categoryId: general.id, certificateId: bac.id, scope: 'ALL', name: 'البكالوريا — جميع المواد', price: 1500 },
    { id: 'svc-ninth-single', categoryId: general.id, certificateId: ninth.id, scope: 'SINGLE', name: 'التاسع — مادة واحدة', price: 150 },
    { id: 'svc-ninth-all', categoryId: general.id, certificateId: ninth.id, scope: 'ALL', name: 'التاسع — جميع المواد', price: 800 },
    { id: 'svc-review-bac-single', categoryId: review.id, certificateId: bac.id, scope: 'SINGLE', name: 'مراجعة علامات البكالوريا — مادة واحدة', price: 300 },
    { id: 'svc-review-bac-multi', categoryId: review.id, certificateId: bac.id, scope: 'MULTIPLE', name: 'مراجعة علامات البكالوريا — 3 مواد', price: null },
    { id: 'svc-review-bac-all', categoryId: review.id, certificateId: bac.id, scope: 'ALL', name: 'مراجعة علامات البكالوريا — جميع المواد', price: 1700 },
    { id: 'svc-review-ninth-single', categoryId: review.id, certificateId: ninth.id, scope: 'SINGLE', name: 'مراجعة علامات التاسع — مادة واحدة', price: 250 },
    { id: 'svc-review-ninth-all', categoryId: review.id, certificateId: ninth.id, scope: 'ALL', name: 'مراجعة علامات التاسع — جميع المواد', price: 1200 },
  ];
  let sortOrder = 0;
  for (const s of services) {
    sortOrder += 1;
    await prisma.service.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        categoryId: s.categoryId,
        certificateId: s.certificateId,
        scope: s.scope,
        name: s.name,
        priceMode: s.price === null ? 'QUOTED' : 'FIXED',
        price: s.price,
        sortOrder,
      },
    });
  }

  // Inactive until the Owner enters the wallet/network in the dashboard. No wallet address is ever hard-coded.
  await prisma.paymentMethod.upsert({
    where: { code: 'usdt' },
    update: {},
    create: { code: 'usdt', name: 'USDT', isActive: false, sortOrder: 1 },
  });

  await prisma.orderSequence.upsert({
    where: { seasonYear: SEASON },
    update: {},
    create: { seasonYear: SEASON },
  });
}

// ───────────── Settings & CMS defaults ─────────────

// '' means "not set yet" (Owner fills contact details from the dashboard).
const SETTINGS: [key: string, value: Prisma.InputJsonValue, isPublic: boolean][] = [
  ['brand.name', 'SIKE', true],
  ['brand.season', '2027–2028', true],
  ['brand.tagline', 'منصة مساعدة للطلاب بشكل آمن ورسمي 100%', true],
  ['brand.colors', { background: '#07090E', primary: '#F8FAFC', secondary: '#64748B' }, true],
  ['contact.telegram', '', true],
  ['contact.whatsapp', '', true],
  ['contact.phone', '', true],
  ['contact.email', '', true],
  ['contact.social', {}, true],
  ['presence.ttl_seconds', 90, false],
  ['uploads.max_bytes', 10 * 1024 * 1024, false],
  ['uploads.allowed_mime', ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'], false],
];

const CONTENT: [key: string, value: string][] = [
  ['home.hero.title', 'SIKE 2027–2028'],
  ['home.hero.subtitle', 'منصة مساعدة للطلاب بشكل آمن ورسمي 100%'],
  ['home.hero.cta_start', 'ابدأ طلبك'],
  ['home.hero.cta_services', 'استكشف الخدمات'],
  ['home.hero.cta_track', 'تتبع طلبك'],
];

async function seedSettingsAndContent() {
  for (const [key, value, isPublic] of SETTINGS) {
    await prisma.setting.upsert({ where: { key }, update: {}, create: { key, value, isPublic } });
  }
  for (const [key, value] of CONTENT) {
    await prisma.contentBlock.upsert({
      where: { key_locale: { key, locale: 'ar' } },
      update: {},
      create: { key, locale: 'ar', value },
    });
  }
  // Mandatory disclaimers for the mark-review page. Privacy/Terms are written by the Owner via the CMS.
  await prisma.cmsPage.upsert({
    where: { slug_locale: { slug: 'mark-review', locale: 'ar' } },
    update: {},
    create: {
      slug: 'mark-review',
      locale: 'ar',
      title: 'مراجعة العلامات',
      body: [
        '- تقديم الطلب لا يعني قبول الطلب.',
        '- تخضع المعالجة للشروط والإجراءات المعتمدة.',
        '- لا يوجد أي ضمان لتغيير العلامة.',
        '- القرار النهائي يعود إلى الجهة الرسمية المختصة.',
      ].join('\n'),
    },
  });
}

// ───────────── Owner (from environment only) ─────────────

async function seedOwner() {
  const email = process.env.SEED_OWNER_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_OWNER_PASSWORD;
  if (!email || !password) {
    console.warn('• Owner not created: set SEED_OWNER_EMAIL and SEED_OWNER_PASSWORD, run again, then remove them.');
    return;
  }
  if (password.length < 12) throw new Error('SEED_OWNER_PASSWORD must be at least 12 characters.');
  if (await prisma.user.findUnique({ where: { email } })) {
    console.log('• Owner user already exists — left unchanged.');
    return;
  }

  const ownerRole = await prisma.role.findUniqueOrThrow({ where: { key: 'OWNER' } });
  const user = await prisma.user.create({
    data: {
      email,
      fullName: process.env.SEED_OWNER_NAME?.trim() || 'Owner',
      passwordHash: await hash(password),
      roles: { create: { roleId: ownerRole.id } },
    },
  });
  await prisma.auditLog.create({
    data: { action: 'owner.seed', entityType: 'User', entityId: user.id, after: { email } },
  });
  console.log(`• Owner created: ${email}`);
}

async function main() {
  await seedRbac();
  await seedCatalog();
  await seedSettingsAndContent();
  await seedOwner();
  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
