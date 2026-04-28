# kudosity-openclaw-sms

Cloud SMS channel plugin for [OpenClaw](https://openclaw.ai), powered by the [Kudosity v2 API](https://developers.kudosity.com). Send and receive SMS from your OpenClaw agent with a real Australian (or international) sender number, no app required on the recipient's phone.

## Install

```bash
openclaw plugins install kudosity-openclaw-sms
openclaw gateway restart
```

OpenClaw checks ClawHub first and falls back to npm automatically.

## Configure

You can configure the plugin two ways: through the interactive setup wizard or by editing your config file directly.

### Interactive (recommended)

```bash
openclaw setup
```

Pick **SMS Kudosity** from the channel list. The wizard asks for your API key (validated live against the Kudosity API) and your sender number, then writes the credentials into your config.

### Manual

```json5
{
  plugins: {
    entries: {
      "kudosity-sms": { enabled: true },
    },
  },
  channels: {
    "kudosity-sms": {
      apiKey: "your-kudosity-api-key", // pragma: allowlist secret
      sender: "+61400000000",
    },
  },
}
```

### Environment variables

`KUDOSITY_API_KEY` and `KUDOSITY_SENDER` are read at runtime as a fallback when the corresponding config keys are absent. **Both** variables must be set together.

> ⚠️ **Env-only deployments:** unlike the bundled OpenClaw channels, an external plugin cannot register its env-var prefix with core's `plugin-auto-enable`. If you want to ship credentials only via env, you still need `plugins.entries["kudosity-sms"].enabled: true` in your config so the plugin loader picks the channel up at startup. The runtime credential resolution itself works from env vars without any config-file presence.

## Capabilities

| Feature       | Supported                                      |
| ------------- | ---------------------------------------------- |
| Text messages | ✅                                             |
| Media / MMS   | ❌ (degrades to caption text)                   |
| Threads       | ❌                                             |
| Groups        | ❌                                             |
| Reactions     | ❌                                             |
| Streaming     | ❌ (block-streaming on — one SMS per final reply) |

The 1,600-character text chunk limit (10 concatenated SMS segments) is applied automatically; longer agent replies are split across multiple sends.

## Sending a message

```bash
openclaw send --channel kudosity-sms --to +61478038915 --text "hello from openclaw"
```

## Get an API key + sender number

1. Sign up at [kudosity.com/signup](https://kudosity.com/signup) (free trial available).
2. **Settings → API Keys → Create Key** for the API key.
3. **Numbers → Lease a virtual number** for the sender, or use a number you already own.

Full plugin guide: <https://developers.kudosity.com/docs/openclaw-plugin>
Kudosity API docs: <https://developers.kudosity.com>

## Webhook utilities

The plugin exports parsing helpers for inbound SMS webhooks (`parseWebhookPayload`, `toInboundMessage`, `handleWebhookRequest`) for use by integrators who want to wire inbound delivery themselves. Built-in gateway-route registration is **not** included in v1.0.0 — it is on the roadmap.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `openclaw plugins list` does not show `kudosity-sms` | Restart the gateway after install: `openclaw gateway restart` |
| Plugin shows but channel is missing in `openclaw setup` | Add `plugins.entries["kudosity-sms"].enabled: true` to your config |
| `Kudosity API error (401)` | API key is invalid or revoked. Generate a new one in the Kudosity dashboard |
| `Kudosity SMS: invalid phone number format` | Sender or recipient is not E.164. Use the leading `+` and digits only |

## Issues

Open an issue at <https://github.com/kudosity/openclaw-sms/issues>.

## License

MIT — see [LICENSE](LICENSE).
