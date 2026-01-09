import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface HistoryEntry {
  path: string;
  title: string;
  timestamp: number;
}

const STORAGE_KEY = 'bookstore_navigation_history';
const MAX_HISTORY = 20;

export const useNavigationHistory = () => {
  const location = useLocation();
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    const title = document.title || location.pathname;
    const newEntry: HistoryEntry = {
      path: location.pathname,
      title,
      timestamp: Date.now(),
    };

    setHistory(prev => {
      const filtered = prev.filter(entry => entry.path !== location.pathname);
      const updated = [newEntry, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [location.pathname]);

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  const getRecentPages = (limit: number = 5) => {
    return history.slice(0, limit);
  };

  return { history, clearHistory, getRecentPages };
};
