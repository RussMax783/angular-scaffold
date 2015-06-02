(function() {
  angular.module( 'lk.authentication.token', [])


  .factory('AuthTokenFactory', AuthTokenFactory);



  AuthTokenFactory.$inject = ['$http', '$window'];

  /**
   * @namespace AuthTokenFactory
   * @desc Retrieves, Sets, and Destroys Auth Tokens in local storage
   */
  function AuthTokenFactory ($http, $window) {

    var store = $window.localStorage,
        key = 'auth-token';

    return {
      getToken: getToken,
      setToken: setToken
    };

    /**
     * @name getToken
     * @desc retrieves token from local storage
     * @returns {String} - JWT Token
     */
    function getToken() {
      return store.getItem(key);
    }

    /**
     * @name setToken
     * @desc stores token into local storage if provided, otherwise removes
     * @param {null} - will remove token if exists
     * @param {String} token - JWT token to store
     * @returns {}
     */
    function setToken(token) {
      if (token) {
        store.setItem(key, token);
        $http.defaults.headers.common.Authorization = 'JWT ' + token;
      } else {
        store.removeItem(key);
        delete $http.defaults.headers.common.Authorization;
      }
    }
  }
})();
