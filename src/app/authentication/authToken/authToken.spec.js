describe('Auth Token Module', function() {
  beforeEach(module('lk.authentication.token'));

  var $window,
      $http,
      AuthTokenFactory;
  
  var key = 'auth-token';

  beforeEach(inject(function(_$window_, _$http_, _AuthTokenFactory_){
    $window = _$window_;
    $http = _$http_;
    AuthTokenFactory = _AuthTokenFactory_;
  }));

  // because our test will be testing if we save a token, we want to make sure there
  // is no token already stored.  That way our test are more accurate.
  afterEach(function () {
    $window.localStorage.removeItem(key);
  });



  describe('AuthTokenFactory', function () {

    it('should store an authtoken in local storage when setToken function is called', function () {
      AuthTokenFactory.setToken('thisWouldBeOurAuthToken');
      expect($window.localStorage.getItem(key)).toEqual('thisWouldBeOurAuthToken');
    });

    it('should set JWT header authorization when setToken() is called', function () {
      $window.localStorage.setItem(key, 'thisWouldBeOurAuthToken');
      AuthTokenFactory.setToken('thisWouldBeOurAuthToken');
      expect($http.defaults.headers.common.Authorization).toEqual('JWT thisWouldBeOurAuthToken');
    });
  
    it('should remove token from local storage if setToken is called with no params', function () {
      $window.localStorage.setItem(key, 'thisWouldBeOurAuthToken');
      AuthTokenFactory.setToken();
      expect($window.localStorage.getItem(key)).toEqual(null);
    });

    it('should delete JWT header authorization when setToken is called with no params', function () {
      $http.defaults.headers.common.Authorization = 'JWT ' + 'thisWouldBeOurAuthToken';
      AuthTokenFactory.setToken();
      expect($http.defaults.headers.common.Authorization).toEqual(undefined);
    });

    it('should return the token in local storage when calling getTokenif one is present', function () {
      $window.localStorage.setItem(key, 'thisWouldBeOurAuthToken');
      expect(AuthTokenFactory.getToken()).toEqual('thisWouldBeOurAuthToken');
    });

    it('should return nothing if token is absent', function () {
      AuthTokenFactory.setToken();
      expect(AuthTokenFactory.getToken()).toEqual(null);
    });
  });
});

