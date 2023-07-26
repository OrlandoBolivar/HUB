// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      // Check if the token's expiration timestamp is less than the current time in seconds
      if (decoded.exp < Date.now() / 1000) {
        return true; // Token has expired
      } else {
        return false; // Token is still valid
      }
    } catch (err) {
      return false; // If there's an error decoding the token, consider it as expired
    }
  }
  

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  logout() {
    localStorage.removeItem('id_token');
  }
}

const AuthServiceFunction = new AuthService();

export default AuthServiceFunction;