type TicketNotificationTemplateArgs = {
  ticketId: string | number;
  name: string;
  email?: string | null;
  phone: string;
  intention: string;
  message?: string | null;
  ip: string;
  userAgent: string | null;
  requestId: string;
};

function emptyFallback(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "未填写";
}

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function field(label: string, value: string) {
  return `
    <tr>
      <td style="width:96px;padding:10px 0;color:#6b7280;font-size:14px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;color:#111827;font-size:14px;font-weight:600;line-height:1.7;">${esc(value)}</td>
    </tr>
  `;
}

export function buildTicketNotificationEmail(args: TicketNotificationTemplateArgs) {
  const subject = `【官网工单】${args.name} - ${args.intention}`;
  const submittedAt = new Date().toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour12: false,
  });
  const email = emptyFallback(args.email);
  const message = emptyFallback(args.message);
  const userAgent = emptyFallback(args.userAgent);

  const text = [
    "官网收到新的客户咨询",
    "",
    "工单信息",
    `工单 ID：${args.ticketId}`,
    `请求 ID：${args.requestId}`,
    `提交时间：${submittedAt}`,
    "",
    "客户信息",
    `姓名：${args.name}`,
    `电话：${args.phone}`,
    `邮箱：${email}`,
    `合作意向：${args.intention}`,
    "",
    "留言内容",
    message,
    "",
    "技术信息",
    `IP：${args.ip}`,
    `User-Agent：${userAgent}`,
  ].join("\n");

  const html = `
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#f6f3f0;">
        <div style="max-width:680px;margin:0 auto;padding:28px 16px;font-family:Arial,'Microsoft YaHei',sans-serif;">
          <div style="overflow:hidden;border:1px solid #eadfd8;border-radius:12px;background:#ffffff;box-shadow:0 12px 32px rgba(17,24,39,0.08);">
            <div style="height:6px;background:#ff6b35;"></div>
            <div style="padding:28px 30px 22px;">
              <p style="margin:0 0 10px;color:#ff6b35;font-size:13px;font-weight:700;letter-spacing:0;">UniHome 官网工单</p>
              <h1 style="margin:0;color:#111827;font-size:24px;line-height:1.35;font-weight:800;">官网收到新的工单</h1>
              <p style="margin:12px 0 0;color:#6b7280;font-size:14px;line-height:1.7;">客户通过官网联系表单提交了新的咨询，请及时跟进。</p>
            </div>

            <div style="padding:0 30px 26px;">
              <h2 style="margin:0 0 10px;color:#111827;font-size:16px;font-weight:800;">客户信息</h2>
              <div style="border-radius:10px;background:#fff7f2;border:1px solid #ffd8c7;padding:18px 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
                  ${field("姓名", args.name)}
                  ${field("电话", args.phone)}
                  ${field("邮箱", email)}
                  ${field("合作意向", args.intention)}
                </table>
              </div>

              <div style="margin-top:22px;">
                <h2 style="margin:0 0 10px;color:#111827;font-size:16px;font-weight:800;">留言内容</h2>
                <div style="border-radius:10px;background:#f9fafb;border:1px solid #eef0f3;padding:16px;color:#111827;font-size:14px;line-height:1.8;white-space:pre-wrap;">${esc(message)}</div>
              </div>

              <div style="margin-top:22px;">
                <h2 style="margin:0 0 10px;color:#111827;font-size:16px;font-weight:800;">工单信息</h2>
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
                  ${field("工单 ID", String(args.ticketId))}
                  ${field("请求 ID", args.requestId)}
                  ${field("提交时间", submittedAt)}
                </table>
              </div>

              <div style="margin-top:18px;border-top:1px solid #eef0f3;padding-top:16px;">
                <p style="margin:0 0 6px;color:#9ca3af;font-size:12px;font-weight:700;">技术信息</p>
                <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.7;">
                  IP：${esc(args.ip)}<br/>
                  User-Agent：${esc(userAgent)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `.trim();

  return { subject, text, html };
}
