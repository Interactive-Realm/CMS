import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useEffect, useState } from "react"
import { Button } from "../ui/button";
import { Key } from "../ui/key";
import { useCommands } from "@/stores/commandPaletteStore";
import { useNavigate } from "@tanstack/react-router";
import { DialogTitle } from "@radix-ui/react-dialog";

export function CommandPalette() {
  const navigate = useNavigate();
  const commands = useCommands();
  const [open, setOpen] = useState(false);
  const [commandMenu, setCommandMenu] = useState("default");
 
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, []);

  useEffect(() => {
    console.log({
      commandMenu,
      commands
    });
  }, [commandMenu, commands])

  const wrapSetOpen = (value: boolean) => {
    setOpen(value);

    if (!value) {
      setCommandMenu("default");
    }
  }
 
  return (
    <>
      <Button variant="search" size="sm" onClick={() => wrapSetOpen(true)} className="md:gap-16 lg:gap-20 w-full">
        Search...
        <Key>
          <span className="text-xs">⌘</span>
          K
        </Key>
      </Button>
      <CommandDialog open={open} onOpenChange={wrapSetOpen}>
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {commands[commandMenu]?.map((command) => (
              <CommandItem key={command.title} onSelect={() => {
                if (command.type === "goto") {
                  navigate({
                    to: command.to
                  })
                  wrapSetOpen(false);
                } else if (command.type === "callback") {
                  command.callback();
                  wrapSetOpen(false);
                } else if (command.type === "submenu") {
                  console.log(`Change submenu ${command.submenu}`)
                  setCommandMenu(command.submenu);
                }
              }}>
                {command.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}