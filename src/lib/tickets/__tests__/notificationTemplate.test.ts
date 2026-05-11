import test from "node:test";
import assert from "node:assert/strict";

import { buildTicketNotificationEmail } from "../notificationTemplate";

const sampleTicket = {
  ticketId: 20,
  name: "汤韩霖",
  email: "1373912749@qq.com",
  phone: "18859315563",
  intention: "ODM 定制服务",
  message: "test",
  ip: "120.229.53.182",
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/147.0.0.0",
  requestId: "b6527d86-4fec-4aa8-bf0c-badb0af6dcc0",
};

test("builds a branded Chinese ticket notification email", () => {
  const email = buildTicketNotificationEmail(sampleTicket);

  assert.equal(email.subject, "【官网工单】汤韩霖 - ODM 定制服务");
  assert.match(email.text, /官网收到新的客户咨询/);
  assert.match(email.text, /工单 ID：20/);
  assert.match(email.text, /电话：18859315563/);
  assert.match(email.html, /官网收到新的工单/);
  assert.match(email.html, /#ff6b35/);
  assert.match(email.html, /客户信息/);
  assert.match(email.html, /留言内容/);
  assert.match(email.html, /技术信息/);
});

test("escapes user supplied content in html email", () => {
  const email = buildTicketNotificationEmail({
    ...sampleTicket,
    name: "<script>alert(1)</script>",
    message: "需要 <b>报价</b> & 方案",
  });

  assert.doesNotMatch(email.html, /<script>/);
  assert.match(email.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(email.html, /需要 &lt;b&gt;报价&lt;\/b&gt; &amp; 方案/);
});
