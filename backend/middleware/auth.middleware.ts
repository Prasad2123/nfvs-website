import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface SessionData {
    userId: number;
    userRole: string;
    userName: string;
    userFullName: string;
    permissions: any;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
        username: string;
        fullName: string;
      };
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Please login.' });
  }

  req.user = {
    id: req.session.userId,
    role: req.session.userRole || '',
    username: req.session.userName || '',
    fullName: req.session.userFullName || ''
  };

  next();
};

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (!roles.includes(req.session.userRole as string)) {
      return res.status(403).json({ success: false, message: 'Forbidden. Insufficient permissions.' });
    }

    next();
  };
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.userId) {
    req.user = {
      id: req.session.userId,
      role: req.session.userRole || '',
      username: req.session.userName || '',
      fullName: req.session.userFullName || ''
    };
  }
  next();
};
