import { useMemo } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { BellIcon } from '@phosphor-icons/react';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { AppBarButton } from '@vibe/ui/components/AppBarButton';

export function AppBarNotificationBellContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, enabled } = useNotifications();

  const unseenCount = useMemo(() => data.filter((n) => !n.seen).length, [data]);

  if (!enabled) return null;

  return (
    <div className="relative">
      <AppBarButton
        icon={BellIcon}
        label="Notifications"
        isActive={location.pathname === '/notifications'}
        onClick={() => navigate({ to: '/notifications' })}
      />
      {unseenCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-brand text-[10px] font-medium text-white pointer-events-none">
          {unseenCount > 99 ? '99+' : unseenCount}
        </span>
      )}
    </div>
  );
}
