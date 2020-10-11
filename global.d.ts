// Not sure why this is required, possibly bug in sapper typing
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

interface Preload {
  (this: PreloadContext, page: Page, session: any): object | Promise<object>;
}
