const authErrors: { [errorCode: string]: string } = {
  'auth/credential-already-in-use':
    'This credential is already associated with a different user account.',
  'auth/email-already-in-use':
    'The email address is already in use by another account.',
  'auth/internal-error': 'An internal error has occurred.',
  'auth/invalid-email': 'The email address is badly formatted.',
  'auth/wrong-password':
    'The password is invalid or the user does not have a password.',
  'auth/invalid-recipient-email':
    'The email corresponding to this action failed to send as the provided recipient email address is invalid.',
  'auth/app-deleted': 'This instance of FirebaseApp has been deleted.',
  'auth/account-exists-with-different-credential':
    'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
  'auth/network-request-failed':
    'A network error (such as timeout, interrupted connection or unreachable host) has occurred.',
  'auth/null-user':
    'A null user object was provided as the argument for an operation which requires a non-null user object.',
  'auth/popup-blocked':
    'Unable to establish a connection with the popup. It may have been blocked by the browser.',
  'auth/quota-exceeded':
    "The project's quota for this operation has been exceeded.",
  'auth/timeout': 'The operation has timed out.',
  'auth/too-many-requests':
    'We have blocked all requests from this device due to unusual activity. Try again later.',
  'auth/user-cancelled':
    'The user did not grant your application the permissions it requested.',
  'auth/user-not-found':
    'There is no user record corresponding to this identifier. The user may have been deleted.',
  'auth/user-disabled':
    'The user account has been disabled by an administrator.',
  'auth/user-mismatch':
    'The supplied credentials do not correspond to the previously signed in user.',
  'auth/weak-password': 'The password must be 6 characters long or more.',
};

export default authErrors;
