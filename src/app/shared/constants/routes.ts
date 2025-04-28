interface RoutesApp {
  auth: {
    startPage: string;
    registerIndividualPage: string;
    verifyAccountPage: string;
  };
  reservations: {
    startPage: string;
  };
}

/**
 * Application routes
 */
export const routes: RoutesApp = {
  auth: {
    startPage: '/auth',
    registerIndividualPage: '/auth/register-individual',
    verifyAccountPage: '/auth/verify-account',
  },
  reservations: {
    startPage: '/reservations',
  },
};
