# Changelog

All notable changes to `kudosity-openclaw-sms` will be documented in this file.

## [1.0.0] - 2026-04-23

### Added

- Initial release. Outbound SMS channel for OpenClaw via the [Kudosity v2 API](https://developers.kudosity.com).
- `sendText` and `sendMedia` outbound adapters (media degrades to caption-only text — SMS is text-only).
- Declarative `setupWizard` for `openclaw setup` integration with live API-key validation.
- Environment-variable fallback for `KUDOSITY_API_KEY` and `KUDOSITY_SENDER`.
- E.164 phone-number validation via `outbound.resolveTarget`.
- `outbound.textChunkLimit: 1600` (10 concatenated SMS segments).
- Webhook payload parsing utilities (`parseWebhookPayload`, `toInboundMessage`, `handleWebhookRequest`) — gateway route wiring is intentionally deferred to a future release.
- All Kudosity API calls routed through `fetchWithSsrFGuard` from `openclaw/plugin-sdk/ssrf-runtime`.
- 74 unit tests across `channel.test.ts`, `kudosity-api.test.ts`, `webhook.test.ts`.

### Notes

- This package was previously prepared as a bundled extension PR against `openclaw/openclaw` ([#55396](https://github.com/openclaw/openclaw/pull/55396)), then redirected to the community plugin path per the maintainer's guidance and OpenClaw `VISION.md` scope rules.
