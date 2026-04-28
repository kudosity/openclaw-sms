/**
 * Local barrel for the Kudosity SMS plugin's internal SDK imports.
 *
 * Single chokepoint through which production code reaches into
 * `openclaw/plugin-sdk/*`. All other files under `src/` import SDK
 * types/values from `./runtime-api.js` instead of importing the SDK
 * subpaths directly. This makes future SDK migrations a one-file change.
 */

export type {
  ChannelPlugin,
  OpenClawConfig,
  PluginRuntime,
} from "openclaw/plugin-sdk/core";

export type {
  ChannelCapabilities,
  ChannelConfigAdapter,
  ChannelMeta,
  ChannelOutboundAdapter,
} from "openclaw/plugin-sdk/channel-runtime";
