interface NotificationBadgeProps {
  visible?: boolean;
}

function NotificationBadge({ visible = true }: NotificationBadgeProps) {
  if (!visible) {
    return <></>;
  }

  return (
    <span className="h-[10px] w-[10px] bg-red-500 absolute right-0 top-0 rounded-full" />
  );
}

export { NotificationBadge };
