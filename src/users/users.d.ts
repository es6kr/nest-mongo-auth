interface DeleteResult {
  /** Indicates whether this write result was acknowledged. If not, then all other members of this result will be undefined. */
  acknowledged: boolean;
  /** The number of documents that were deleted */
  deletedCount: number;
}

interface User {
  id?: string;
  username: string;
  email?: string;
}

declare module 'mongoose' {
  interface AuthenticateMethod<T> {
    (username: string, password: string): Promise<AuthResult<T>>;
    (
      username: string,
      password: string,
      cb: (err: any, user: T | boolean, error: any) => void,
    ): void;
  }

  interface AuthResult<T> extends AuthenticationResult {
    user: T;
    error: any;
  }
}
