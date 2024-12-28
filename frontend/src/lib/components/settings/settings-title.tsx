import { Separator } from "../ui/separator";

interface SettingsTitleProps {
  title: string;
  description: string;
}

export function SettingsTitle({ title, description }: SettingsTitleProps) {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator className="my-4" />
    </>
  );
}
