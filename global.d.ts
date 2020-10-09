interface PreloadContext {
  fetch: (url: string, options?: any) => Promise<any>;
  error: (statusCode: number, message: Error | string) => void;
  redirect: (statusCode: number, location: string) => void;
}

interface Page {
  host: string;
  path: string;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
  error?: Error;
}

// Not sure why this is required, possibly bug in sapper typing
interface Preload {
  (this: PreloadContext, page: Page, session: any): object | Promise<object>;
}

namespace Express {
  export interface RequestContext {
    prisma: PrismaClient;
    redis: Redis.Redis;
  }
  export interface Request {
    context: RequestContext;
  }
}
