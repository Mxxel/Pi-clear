# Pi-clear

A [Pi](https://pi.dev) extension that adds a `/clear` command to start a fresh session.

Stock Pi has no `/clear` command. If you built your own custom Pi, this one command covers that gap: it opens a new session (like `/new`) and pops a notification when the context has been cleared.

## Install

Install from this repository as a [Pi package](https://pi.dev):

```bash
pi install git:github.com/Mxxel/Pi-clear
```

or with the plain URL form:

```bash
pi install https://github.com/Mxxel/Pi-clear.git
```

Try it for a single invocation without adding it to your settings:

```bash
pi -e git:github.com/Mxxel/Pi-clear
```

After installing, run `/clear` from the input prompt.

## How it works

The extension registers the `clear` command with `pi.registerCommand()`:

```typescript
handler: async (_args, ctx) => {
  const { cancelled } = await ctx.newSession();
  if (!cancelled) ctx.ui.notify("Session context cleared.", "info");
}
```

`/clear` starts a new session, discarding the current context. If you back out of the confirmation, the current session stays untouched.

## Development

The repo is a standard Pi package:

```
Pi-clear/
├── extensions/clear.ts   # the extension (single file)
├── package.json          # package manifest
└── README.md
```

Iterate on the extension and load it directly:

```bash
pi --extension ./extensions/clear.ts
```

Changes take effect on the next invocation, no build step needed (Pi loads TypeScript via `jiti`).

To test the exact install flow locally before publishing:

```bash
pi install ./Pi-clear          # local path also works as a source
pi uninstall ./Pi-clear        # to undo
```

## Updating

Reinstall to refresh a package installed from git:

```bash
pi update --extensions     # refresh all installed packages
pi update git:github.com/Mxxel/Pi-clear
```

## Requirements

- Pi (any build that supports extension packages and `ctx.newSession()`)
- No npm dependencies — the only import is the host-provided
  `@earendil-works/pi-coding-agent` type package.

## License

[MIT](LICENSE)
