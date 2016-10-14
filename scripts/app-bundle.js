define('app',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var baseUrl = 'http://localhost:8080/bootwildfly';

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function App(http) {
      _classCallCheck(this, App);

      this.heading = "DACA - Dirlididi";
      http.configure(function (config) {
        config.withBaseUrl(baseUrl).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        });
      });

      this.http = http;
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Dirlididi';

      config.map([{ route: ['', 'daca'], name: 'daca',
        moduleId: './daca', nav: true, title: 'Daca' }, { route: 'problems', name: 'problems',
        moduleId: './problems', nav: true, title: 'Problems' }, { route: 'stats', name: 'stats',
        moduleId: './stats', nav: true, title: 'Stats' }]);

      this.router = router;
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('problems',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Problem = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var httpClient = new _aureliaFetchClient.HttpClient();

  var baseUrl = 'http://localhost:8080/bootwildfly';

  var Problem = exports.Problem = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Problem() {
      _classCallCheck(this, Problem);

      this.heading = "Problems";
    }

    Problem.prototype.getProblems = function getProblems() {
      var _this = this;

      httpClient.fetch(baseUrl + '/problem').then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        _this.size = data.length;
        _this.problems = data;
      });
    };

    return Problem;
  }()) || _class);
});
define('stats',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Stats = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var httpClient = new _aureliaFetchClient.HttpClient();

  var baseUrl = 'http://localhost:8080/bootwildfly';

  var Stats = exports.Stats = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Stats() {
      _classCallCheck(this, Stats);

      this.heading = "Stats";
    }

    Stats.prototype.getStats = function getStats() {
      var _this = this;

      httpClient.fetch(baseUrl + '/stats').then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        _this.problems = data.Problems;
        _this.users = data.Users;
        _this.submissions = data.Submissions;
      });
    };

    return Stats;
  }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('daca',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Daca = exports.Daca = function Daca() {
    _classCallCheck(this, Daca);

    this.heading = "Students";
    this.students = [];
    this.students.push({ name: "Joeumar Souza" });
    this.students.push({ name: "Pablo Herivelton" });
  };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${heading}</h1>\n\n  <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n    <a href.bind=\"row.href\">${row.title}</a>\n  </li>\n\n  <router-view></router-view>\n\n</template>\n"; });
define('text!problems.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${heading}</h1>\n\n  <p>Total: ${size}</p>\n  <li repeat.for=\"problem of problems\">\n    <ul>- ${problem.description}</ul>\n  </li>\n\n  <button click.delegate = \"getProblems()\">Get Problems</button>\n\n</template>\n"; });
define('text!stats.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${heading}</h1>\n\n  <li>\n    <ul>- ${problems} problems</ul>\n    <ul>- ${users} users</ul>\n    <ul>- ${submissions} submissions</ul>\n  </li>\n\n  <button click.delegate = \"getStats()\">Get Stats</button>\n\n</template>\n"; });
define('text!daca.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${heading}</h1>\n\n  <li repeat.for=\"student of students\">\n    <ul>${student.name}</ul>\n  </li>\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map