import { useTheme } from "@/components/utils/theme-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import type { Theme } from "@/types/settingsTypes"
 
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
 
  return (
    <Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
      <SelectTrigger className="max-w-[180px]">
          <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  )
}