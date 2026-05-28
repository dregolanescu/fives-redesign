import type { CollectionConfig } from 'payload'

const resetEmailHTML = ({ token, user }: { token?: string; user?: any }) => {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://fives-preview.advanguard.ro'
  const resetURL = `${serverURL}/admin/reset/${token}`
  const userName = user?.name || user?.email || 'utilizator'

  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Resetare parolă — FIVE'S Admin</title>
</head>
<body style="margin:0;padding:0;background-color:#242422;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#242422;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="${serverURL}/logo_website_fives_white.svg" alt="FIVE'S" width="160" style="display:block;" />
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#2E2E2B;border-radius:8px;border-top:3px solid #d4a843;padding:40px 36px;">

              <!-- Heading -->
              <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:#F2F0EA;letter-spacing:-0.01em;">
                Resetare parolă
              </h1>
              <p style="margin:0 0 24px;font-size:14px;color:#85827A;line-height:1.5;">
                Admin Panel
              </p>

              <!-- Body -->
              <p style="margin:0 0 16px;font-size:15px;color:#B8B5AD;line-height:1.6;">
                Salut, <strong style="color:#F2F0EA;">${userName}</strong>.
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#B8B5AD;line-height:1.6;">
                Am primit o cerere de resetare a parolei pentru contul tău. Apasă butonul de mai jos pentru a-ți seta o parolă nouă:
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td align="center" style="background-color:#d4a843;border-radius:6px;">
                    <a href="${resetURL}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#1c1917;text-decoration:none;letter-spacing:0.01em;">
                      Resetează parola
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback link -->
              <p style="margin:0 0 24px;font-size:13px;color:#85827A;line-height:1.5;">
                Dacă butonul nu funcționează, copiază și lipește acest link în browser:
              </p>
              <p style="margin:0 0 24px;font-size:12px;color:#d4a843;line-height:1.4;word-break:break-all;">
                ${resetURL}
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #474741;margin:24px 0;" />

              <!-- Disclaimer -->
              <p style="margin:0;font-size:13px;color:#85827A;line-height:1.5;">
                Dacă nu ai solicitat resetarea parolei, poți ignora acest email. Parola ta va rămâne neschimbată.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:12px;color:#85827A;letter-spacing:0.05em;">
                FIVE'S RESTAURANT &amp; LOUNGE BAR
              </p>
              <p style="margin:4px 0 0;font-size:11px;color:#57564f;">
                Acest email a fost trimis automat. Nu răspunde la acest mesaj.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'name' },
  auth: {
    forgotPassword: {
      generateEmailHTML: (args: any) => resetEmailHTML({ token: args?.token, user: args?.user }),
      generateEmailSubject: (_args: any) => "Resetare parolă — FIVE'S Admin",
    },
  },
  fields: [
    { name: 'name', type: 'text', label: 'Nume' },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
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
