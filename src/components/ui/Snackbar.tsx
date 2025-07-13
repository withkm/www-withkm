'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Snackbar: React.FC<SnackbarProps> = ({
                                                    message,
                                                    type,
                                                    isVisible,
                                                    onClose,
                                                    duration = 5000
                                                  }) => {
  const [progress, setProgress] = useState(100);

  // Use useCallback to memoize the onClose function
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      setProgress(100);

      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (duration / 100));
          if (newProgress <= 0) {
            clearInterval(interval);
            // Use setTimeout to avoid calling setState during render
            setTimeout(() => {
              handleClose();
            }, 0);
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isVisible, duration, handleClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-[9999] min-w-[300px]"
        >
          <div className={`
            p-4 rounded-lg shadow-lg border backdrop-blur-sm
            ${type === 'success'
            ? 'bg-green-500/10 border-green-500/30 text-green-300'
            : 'bg-red-500/10 border-red-500/30 text-red-300'
          }
          `}>
            <div className="flex items-center justify-between">
              <span className="font-medium">{message}</span>
              <button
                onClick={handleClose}
                className="ml-4 text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  type === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};