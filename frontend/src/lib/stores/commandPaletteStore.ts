import type { Command } from "@/lib/types/commandPaletteTypes";
import { Store, useStore } from "@tanstack/react-store";

type CommandPaletteStore = {
  commands: Record<string, Command[]>;
};

const commandPaletteStore = new Store<CommandPaletteStore>({
  commands: {
    default: []
  },
});

export function addCommandsRecord(newCommands: Record<string, Command[]>) {
  commandPaletteStore.setState(({ commands }) => {
    const result: Record<string, Command[]> = {};
    for (const [menu, cmds] of Object.entries(newCommands)) {
      result[menu] = [...(commands[menu] ?? []), ...cmds];
    }

    return {
      commands: result
    };
  });
}

export function removeCommandsRecord(commandsToRemove: Record<string, Command[]>) {
  commandPaletteStore.setState(({ commands }) => {
    const result: Record<string, Command[]> = {};
    for (const [menu, cmds] of Object.entries(commands)) {
      const commandIds = commandsToRemove[menu].map(command => command.title);
      result[menu] = cmds.filter((command) => !commandIds.includes(command.title));
    }

    return {
      commands: result
    };
  });
}

export function addCommands(newCommands: Command[], menu = "default") {
  commandPaletteStore.setState(({ commands }) => {
    commands[menu] = [...commands[menu], ...newCommands];
    return {
      commands
    };
  });
}

export function removeCommands(commandsToRemove: Command[], menu = "default") {
  const commandIds = commandsToRemove.map(command => command.title);
  commandPaletteStore.setState(({ commands }) => {
    commands[menu] = commands[menu].filter((command) => !commandIds.includes(command.title))
    return {
      commands
    };
  });
}

export function useCommands() {
  return useStore(commandPaletteStore, (state) => state.commands);
}
