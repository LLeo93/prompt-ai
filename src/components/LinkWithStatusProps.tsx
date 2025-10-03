import React, { useEffect, useState } from 'react';
import Tooltip from './Tooltip';

interface LinkWithStatusProps {
  label: string;
  url: string;
  icon?: React.ReactNode;
}

const LinkWithStatus: React.FC<LinkWithStatusProps> = ({
  label,
  url,
  icon,
}) => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let didCancel = false;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    fetch(url, { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        if (!didCancel) setIsOnline(res.ok);
      })
      .catch(() => {
        if (!didCancel) setIsOnline(false);
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      didCancel = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [url]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    alert('Link copiato negli appunti!');
  };

  return (
    <Tooltip text={`Vai a ${label}`} position="top" variant="glow" delay={300}>
      <div className="flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 flex-1"
        >
          {label}
        </a>
        <span className="ml-2 text-sm">
          {isOnline === null ? (
            <span className="text-gray-400 animate-pulse">…</span>
          ) : isOnline ? (
            <span className="text-green-400 font-semibold">Online</span>
          ) : (
            <span className="text-red-400 font-semibold">Offline</span>
          )}
        </span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-cyan-400 text-sm"
        >
          📋
        </button>
      </div>
    </Tooltip>
  );
};

export default LinkWithStatus;
