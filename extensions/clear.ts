import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("clear", {
    description: "Clear all session context (start a new session)",
    handler: async (_args, ctx) => {
      await ctx.newSession({
        withSession: (freshCtx) => {
          freshCtx.ui.notify("Session context cleared.", "info");
        },
      });
    },
  });
}
