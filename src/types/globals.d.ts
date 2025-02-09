export {}

// Create a type for the roles
export type Roles = 'admin' | 'coach' | 'client'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}