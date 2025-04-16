---
title: 'MCP Integration Log: The Desktop Client Saga (Cursor & Claude)'
contentHint: 'Log detailing the often-frustrating journey of integrating a backend API with desktop MCP clients (Cursor, Claude), revealing the mandatory nature of the command/StdIO bridge pattern over the simpler URL-based approach.'
publishedTime: '2025-04-14'
reference: 'Technique Deep-Dive'
website: 'https://github.com/rizkisyaf/traderfit-bridge'
---

# MCP Integration Log: The Desktop Client Saga (Cursor & Claude)

**(Avatar: Developer neck-deep in MCP client configurations)**

## The Initial Dream: Simple URL-Based Integration

Alright, so the plan seemed simple enough. We have the TraderFitAI backend API, nicely defined with OpenAPI. The Model Context Protocol (MCP) looks like the perfect way to let AI assistants like Cursor and Claude Desktop tap into it. Reading the MCP spec, the obvious path seemed to be the standard network approach: define the server in the client config using `schema_url` to point to our OpenAPI definition, and handle authentication using `auth` with a bearer token (our platform API key). Clean, straightforward, no need for local shenanigans.

## Reality Check #1: Cursor Needs a Command

Enter Cursor. Fired it up, tried configuring it using just `schema_url` and `auth`... nothing. No tools appeared. Digging into Cursor's examples and the community chatter, it became pretty clear: Cursor, at least in its current state, heavily favors (or maybe only properly supports?) the `stdio` protocol. That means it wants to *run* something locally, a command it can pipe data to and from.

Okay, pivot. No big deal, right? We'll just whip up a small Python script (`bridge_server.py`) that loads the `mcp` library, listens on stdin/stdout, and forwards calls to our actual backend API. This led to the `traderfit-bridge` package idea.

Then came the configuration fun in `~/.cursor/mcp.json`. My first thought was just `"command": "python traderfit-mcp-bridge/bridge_server.py"`. Nope. How does it find the right Python? What about dependencies? Ah, virtual environments! Let's try activating it: `"command": "source /path/to/venv/bin/activate && python /path/to/bridge_server.py"`. Still no dice. It seems these commands run in a non-interactive, non-shell context where `source` doesn't work as expected. The breakthrough came when I realized I had to provide the *absolute path* to the Python executable *inside* the virtual environment directly in the `command` field, like `"command": "/path/to/your/venv/bin/python"`, and pass the script path as an argument in `"args"`. That felt brittle, but it worked.

Debugging this was a pain. `print()` statements in the script weren't showing up anywhere obvious in Cursor's logs. Had to redirect output to a log file (`bridge_server.log`). But sometimes the log file wouldn't even get *created*, which was baffling. That usually meant the process defined by `command` was failing to even start correctly (path errors? permissions?). Setting up that `traderfit-mcp-bridge-minimal-test` directory with a fresh venv was key to proving the script *itself* was fine when run manually, pointing the finger squarely back at the execution environment differences when launched via MCP.

Eventually, after wrestling with paths, venvs, and logging, the bridge approach using the absolute path to the venv Python worked reliably for Cursor.

## Reality Check #2: Claude Desktop Follows Suit (Unexpectedly)

With Cursor sorted, I turned to Claude Desktop. My assumption was, "Okay, *Claude* is probably more aligned with the standard spec, the URL-based method should work here." This would be great, users wouldn't *have* to install the Python bridge if they were only using Claude. I even updated the documentation to present both methods: URL-based for Claude, command-based for Cursor.

Configured Claude using just `schema_url` and `auth`... Error. Okay, maybe it just needs *some* command field, even if empty, to satisfy its parser? Added `"command": ""`. Relaunched Claude. New error: `spawn . EACCES`. Permission denied trying to execute... the current directory? That's weird. What if I give it a real, harmless command? `"command": "/usr/bin/true"`. Relaunched. Another error: `write EPIPE` (Broken pipe).

*That* was the lightbulb moment. Claude wasn't just parsing the `command` field, it was *executing* it (`/usr/bin/true`). It then tried to send the initial MCP handshake (`initialize` message) to that command over stdio. But `/usr/bin/true` does nothing and exits immediately, closing its end of the pipe. Claude tried writing to a closed pipe, hence `EPIPE`.

Damn. So much for the simple URL-based approach. Despite the MCP standard supporting it, Claude Desktop's *implementation* also mandates a running command it can talk to via StdIO, exactly like Cursor.

## The Unified Path Forward: Embrace the Bridge

The Claude testing killed the dream of a separate, simpler path. The only reliable way to get TraderFitAI tools working in *either* Cursor or Claude Desktop right now is via the command-based StdIO bridge.

So, the strategy had to be simplified:

1.  **One Method:** The `traderfit-bridge` Python package is the *only* documented method for desktop clients.
2.  **Refactor Docs:** Rip out all mentions of the non-functional URL-based method (Method A) from the integration guides and API key page instructions. Focus solely on the steps for installing the bridge package and using the `--print-mcp-config` helper.
3.  **Link Official Docs:** Instead of trying to list potentially incorrect config file paths for every client, link users directly to the official MCP Quickstart guide (`https://modelcontextprotocol.io/quickstart/user`) so they can find the canonical location for *their* client.

## Lingering Thoughts & Lessons Learned

*   **Spec vs. Implementation:** The MCP specification is helpful, but you *have* to test against the specific client implementations. They might have mandatory requirements or behaviors not immediately obvious from the spec (like Claude needing `command` even when using `schema_url`).
*   **StdIO is King (for Desktop):** For now, if you want to integrate with desktop AI assistants like Cursor and Claude, assume you need a command-based StdIO bridge. The pure network/URL approach seems unsupported or unreliable in practice *for these clients*. Cloud-based assistants might be different.
*   **The Bridge Pattern Works:** Having a dedicated local Python script manage the StdIO <-> Network API translation is a robust pattern for this scenario.
*   **Simplify User Guidance:** Don't offer configuration paths that don't actually work. It just causes confusion. Guide users directly to the single, tested, working method.
*   **Debugging MCP is Tricky:** The layer between the client (Cursor/Claude) launching the command and the command actually executing can obscure errors. Logging to files early and using minimal test environments helps isolate problems.
