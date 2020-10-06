(function(window) {
    var mk = window.mk = window.mk || {},
        urlParams = getUrlParams(),
        loading = true,
        onLoads = [],
        dependencies = [
            'device',
            'configs'
        ],
        isPhoneGap = window.isPhoneGap = (window.mk.origConfig && window.mk.origConfig.isHybrid) || urlParams.phoneGap;

    mk.load = {
        cordova: function() {
            (function(window, document) {
                if (isPhoneGap) {
                    var platform  = urlParams.platform;

                    if((window.mk.origConfig && window.mk.origConfig.isHybrid)){
                        document.writeln("<script type='text/javascript' src='cordova.js'></script>");
                    }else{
                        document.writeln("<script src='cordova-" + platform + ".js'></scr" + "ipt>");
                    }

                    document.writeln("<script type='text/javascript' src='cordova.js'></script>");
                    document.addEventListener("deviceready", function() {
                        console.log('in phonegap .. deviceready');
                        dependencyLoaded('device');
                    });
                } else {
                    dependencyLoaded('device');
                }
            })(window, document);
        },

        viewport: function() {
            // Setting the height to device-height on ios < 7 includes the status bar so should be blank
            // Not setting the height to device-height on ios == 7.0 causes the the keyboard to change the page height
            // Setting the device-height on >= 7.0 seems to set it to 1024 (the width instead of height)
            // so we ignore the 7.0 bug and don't set th device-height

            // on iOS, initial-scale=1.0 will set width to device-width in portrait, and device-height on land-scape
            // todo need to test this on android

            document.write('<meta name="viewport" content="initial-scale=1.0, user-scalable=no">');
        },

        configs: function(options) {
            options = options || {};
            options.env = options.env || urlParams.env || 'beta';
            options.app = options.app || urlParams.app || 'dev';

            var base = 'mengagedist/dist/configs/'
                    + (options.hasAppId !== false ? options.env + '/' : '') + 'config.'
                    + (options.env == 'production' ? '' : (options.env + '.'))
                    + (options.hasAppId !== false ? (options.app + '.') : '')
                    + 'json',
                configFiles = [base];

            loadConfigs(configFiles, function(config) {
                config.env = config.env || options.env;
                config.isPhoneGap = config.isPhoneGap || options.isPhoneGap || isPhoneGap;
                config.isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;
                mk.config = config;

                config.app = config.app || {};
                config.app.id = urlParams['app-id'] || config.app.id;
                config.app.version = urlParams['app-version'] || config.app.version;
                config.app.build = urlParams['app-build'] || config.app.build;
                config.app.buildWithEnv = config.app.build;
                if (config.env != 'production') config.app.buildWithEnv += '-' + config.env;

                // load config overrides from urlParams
                for (var key in urlParams) {
                    if (urlParams.hasOwnProperty(key) && key.match(/^config\../)) {
                        var parts = key.split("."),
                            top = config,
                            last =  parts[parts.length - 1];
                        for (var i = 1; i < parts.length - 1; ++i) {
                            if (!top[parts[i]]) top[parts[i]] = {};
                            top = top[parts[i]];
                        }
                        try {
                            top[last] = JSON.parse(urlParams[key]);
                        } catch (e) {
                            top[last] = urlParams[key];
                        }

                    }
                }

                dependencyLoaded('configs');
            }, {}, {}, options);
        },

        app: function(appName) {
            onLoad(function() {
                var device = window.device,
                    $body = angular.element(window.document.body);

                if (device) {
                    if (angular.isString(device.platform)) $body.addClass('device-'  + device.platform.toLowerCase());
                    if (angular.isString(device.version)) {
                        var match = device.version.match(/^([^\.]+).?([^\.]+)?/);
                        if (match) {
                            $body.addClass('device-version-' + match[1]);
                            if (match[2]) $body.addClass('device-minor-version-' + match[2]);
                        }
                    }
                }

                angular.bootstrap(document.getElementsByTagName('body'), [appName]);
            })
        },

        googleAnalytics: function() {
            onLoad(function() {
                var account = mk.config.googleAnalytics && mk.config.googleAnalytics.account;
                if (account) {
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                    ga('create', account, {
                        'cookieDomain': 'none'
                    });
                }
            });
        },

        clevertapInitialize: function () {
            onLoad(function () {
                if (!_.isUndefined(mk.config.analytics) && !_.isUndefined(mk.config.analytics.clevertap.id) && !_.isNull(mk.config.analytics.clevertap.id)) {
                    window.clevertap = {event: [], profile: [], account: []};
                    clevertap.account.push({"id": mk.config.analytics.clevertap.id});
                    (function () {
                        var wzrk = document.createElement('script');
                        wzrk.type = 'text/javascript';
                        wzrk.async = true;
                        wzrk.src = ('https:' == document.location.protocol ? 'https://d2r1yp2w7bby2u.cloudfront.net' : 'http://static.clevertap.com') + '/js/a.js?v=0';
                        var s = document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(wzrk, s);
                    })();
                }
            });
        },

        modernizr: function() {
            /* Modernizr 2.7.1 (Custom Build) | MIT & BSD
             * Build: http://modernizr.com/download/#-cssclasses-prefixes-css_filters-cssclassprefix:mod!
             */
            (function() {
                ;window.Modernizr=function(a,b,c){function v(a){j.cssText=a}function w(a,b){return v(m.join(a+";")+(b||""))}function x(a,b){return typeof a===b}function y(a,b){return!!~(""+a).indexOf(b)}function z(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:x(f,"function")?f.bind(d||b):f}return!1}var d="2.7.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t={}.hasOwnProperty,u;!x(t,"undefined")&&!x(t.call,"undefined")?u=function(a,b){return t.call(a,b)}:u=function(a,b){return b in a&&x(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e});for(var A in n)u(n,A)&&(s=A.toLowerCase(),e[s]=n[A](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)u(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" mod-"+(b?"":"no-")+a),e[a]=b}return e},v(""),i=k=null,e._version=d,e._prefixes=m,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" mod-js mod-"+q.join(" mod-"):""),e}(this,this.document),Modernizr.addTest("cssfilters",function(){var a=document.createElement("div");return a.style.cssText=Modernizr._prefixes.join("filter:blur(2px); "),!!a.style.length&&(document.documentMode===undefined||document.documentMode>9)});
            }).call(window);
        },

        // originally from the CDN: http://maps.googleapis.com/maps/api/js?sensor=false
        // google maps api loads multiple JS files, and we need the whole lib to be ready
        // before we can use the angular-google-maps component
        // todo: find a way to asynchronously load the CDN file with webpack, and wait for the lib to be fully loaded?
        // see https://github.com/webpack/webpack/issues/150
        // see http://blog.millermedeiros.com/requirejs-2-0-delayed-module-evaluation-and-google-maps/
        googleMaps: function() {
            window.google = window.google || {};
            google.maps = google.maps || {};
            (function() {
                function getScript(src) {
                    // Adding async due to https://developers.google.com/web/updates/2016/08/removing-document-write
                    document.write('<' + 'script src="' + src + '"' +
                        ' type="text/javascript" async><' + '/script>');
                }
                var modules = google.maps.modules = {};
                google.maps.__gjsload__ = function(name, text) {
                    modules[name] = text;
                };
                google.maps.Load = function(apiLoad) {
                    delete google.maps.Load;
                    apiLoad([0.009999999776482582,[[["http://mt0.googleapis.com/vt?lyrs=m@273000000\u0026src=api\u0026hl=en\u0026","http://mt1.googleapis.com/vt?lyrs=m@273000000\u0026src=api\u0026hl=en\u0026"],null,null,null,null,"m@273000000",["https://mts0.google.com/vt?lyrs=m@273000000\u0026src=api\u0026hl=en\u0026","https://mts1.google.com/vt?lyrs=m@273000000\u0026src=api\u0026hl=en\u0026"]],[["http://khm0.googleapis.com/kh?v=157\u0026hl=en\u0026","http://khm1.googleapis.com/kh?v=157\u0026hl=en\u0026"],null,null,null,1,"157",["https://khms0.google.com/kh?v=157\u0026hl=en\u0026","https://khms1.google.com/kh?v=157\u0026hl=en\u0026"]],[["http://mt0.googleapis.com/vt?lyrs=h@273000000\u0026src=api\u0026hl=en\u0026","http://mt1.googleapis.com/vt?lyrs=h@273000000\u0026src=api\u0026hl=en\u0026"],null,null,null,null,"h@273000000",["https://mts0.google.com/vt?lyrs=h@273000000\u0026src=api\u0026hl=en\u0026","https://mts1.google.com/vt?lyrs=h@273000000\u0026src=api\u0026hl=en\u0026"]],[["http://mt0.googleapis.com/vt?lyrs=t@132,r@273000000\u0026src=api\u0026hl=en\u0026","http://mt1.googleapis.com/vt?lyrs=t@132,r@273000000\u0026src=api\u0026hl=en\u0026"],null,null,null,null,"t@132,r@273000000",["https://mts0.google.com/vt?lyrs=t@132,r@273000000\u0026src=api\u0026hl=en\u0026","https://mts1.google.com/vt?lyrs=t@132,r@273000000\u0026src=api\u0026hl=en\u0026"]],null,null,[["http://cbk0.googleapis.com/cbk?","http://cbk1.googleapis.com/cbk?"]],[["http://khm0.googleapis.com/kh?v=84\u0026hl=en\u0026","http://khm1.googleapis.com/kh?v=84\u0026hl=en\u0026"],null,null,null,null,"84",["https://khms0.google.com/kh?v=84\u0026hl=en\u0026","https://khms1.google.com/kh?v=84\u0026hl=en\u0026"]],[["http://mt0.googleapis.com/mapslt?hl=en\u0026","http://mt1.googleapis.com/mapslt?hl=en\u0026"]],[["http://mt0.googleapis.com/mapslt/ft?hl=en\u0026","http://mt1.googleapis.com/mapslt/ft?hl=en\u0026"]],[["http://mt0.googleapis.com/vt?hl=en\u0026","http://mt1.googleapis.com/vt?hl=en\u0026"]],[["http://mt0.googleapis.com/mapslt/loom?hl=en\u0026","http://mt1.googleapis.com/mapslt/loom?hl=en\u0026"]],[["https://mts0.googleapis.com/mapslt?hl=en\u0026","https://mts1.googleapis.com/mapslt?hl=en\u0026"]],[["https://mts0.googleapis.com/mapslt/ft?hl=en\u0026","https://mts1.googleapis.com/mapslt/ft?hl=en\u0026"]],[["https://mts0.googleapis.com/mapslt/loom?hl=en\u0026","https://mts1.googleapis.com/mapslt/loom?hl=en\u0026"]]],["en","US",null,0,null,null,"http://maps.gstatic.com/mapfiles/","http://csi.gstatic.com","https://maps.googleapis.com","http://maps.googleapis.com",null,"https://maps.google.com"],["http://maps.gstatic.com/maps-api-v3/api/js/18/0","3.18.0"],[2216698136],1,null,null,null,null,null,"",null,null,0,"http://khm.googleapis.com/mz?v=157\u0026",null,"https://earthbuilder.googleapis.com","https://earthbuilder.googleapis.com",null,"http://mt.googleapis.com/vt/icon",[["http://mt0.googleapis.com/vt","http://mt1.googleapis.com/vt"],["https://mts0.googleapis.com/vt","https://mts1.googleapis.com/vt"],[null,[[0,"m",273000000]],[null,"en","US",null,18,null,null,null,null,null,null,[[47],[37,[["smartmaps"]]]]],0],[null,[[0,"m",273000000]],[null,"en","US",null,18,null,null,null,null,null,null,[[47],[37,[["smartmaps"]]]]],3],[null,[[0,"m",273000000]],[null,"en","US",null,18,null,null,null,null,null,null,[[50],[37,[["smartmaps"]]]]],0],[null,[[0,"m",273000000]],[null,"en","US",null,18,null,null,null,null,null,null,[[50],[37,[["smartmaps"]]]]],3],[null,[[4,"t",132],[0,"r",132000000]],[null,"en","US",null,18,null,null,null,null,null,null,[[63],[37,[["smartmaps"]]]]],0],[null,[[4,"t",132],[0,"r",132000000]],[null,"en","US",null,18,null,null,null,null,null,null,[[63],[37,[["smartmaps"]]]]],3],[null,null,[null,"en","US",null,18],0],[null,null,[null,"en","US",null,18],3],[null,null,[null,"en","US",null,18],6],[null,null,[null,"en","US",null,18],0],["https://mts0.google.com/vt","https://mts1.google.com/vt"],"/maps/vt",273000000,132],2,500,["http://geo0.ggpht.com/cbk","http://www.gstatic.com/landmark/tour","http://www.gstatic.com/landmark/config","/maps/preview/reveal?authuser=0","/maps/preview/log204","/gen204?tbm=map","http://static.panoramio.com.storage.googleapis.com/photos/"],["https://www.google.com/maps/api/js/master?pb=!1m2!1u18!2s0!2sen!3sUS","https://www.google.com/maps/api/js/widget?pb=!1m2!1u18!2s0"],0], loadScriptTime);
                };
                var loadScriptTime = (new Date).getTime();
                getScript("http://maps.gstatic.com/maps-api-v3/api/js/18/0/main.js");
            })();
        },

        googlePlaces: function() {
            onLoad( function() {
                window.google = window.google || {};
                var aPIKey = mk.config.googleMaps.key;
                $.getScript('https://maps.googleapis.com/maps/api/js?libraries=places&key=' + aPIKey + '&v=3.29');
            });
        },

        googleFonts: function() {
            onLoad( function() {
                var families = [];
                for (var i = 0; i < mk.config.fonts.google.length; ++i) {
                    families[i] = mk.config.fonts.google[i].family;
                }
                WebFontConfig = {
                    google: { families: families}
                };
                (function() {
                    var wf = document.createElement('script');
                    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                    wf.type = 'text/javascript';
                    wf.async = 'true';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(wf, s);
                })();
            })
        },
        fbAsyncInit: function () {
            onLoad(function () {
                var appId = mk.config.socialApps.facebook.appId;
                FB.init({
                    appId      : appId,
                    status     : false,
                    cookie     : true,
                    xfbml      : true,
                    oauth      : true,
                    version    : 'v3.3'
                });
            });
        }
    };

    function dependencyLoaded(name) {
        for (var i = 0; i < dependencies.length; ++i) {
            if (dependencies[i] == name) {
                dependencies.splice(i, 1);
                if (!dependencies.length) {
                    loading = false;
                    for (var j = 0; j < onLoads.length; ++j) onLoads[j]();
                }
                break;
            }
        }
    }

    function onLoad(fn) {
        if (loading) onLoads.push(fn);
        else fn();
    }

    function loadConfigs(configFiles, callback, config, seen, options) {
        seen  = seen || {};
        config = config || {};
        options = options || {};

        for (var i = 0; configFiles && i < configFiles.length; ++i) {
            if (seen[configFiles[i]]) {
                configFiles.splice(i--, 1);
            }
            seen[configFiles[i]] = true;
        }

        if (!configFiles || !configFiles.length) {
            return callback(config);
        }
        var loaded = [], count = 0;
        each(configFiles, function(configFile, i) {
            var url = options.cdnPath ? options.cdnPath + configFile : configFile;
            getJson(url, function(json) {
                loaded[i] = json;
                if (++count == configFiles.length) {
                    var mergedChildren = merge({}, loaded),
                        merged = merge(config, [mergedChildren]);

                    updateAssetPaths(merged);
                    loadConfigs(mergedChildren.importConfigs, callback, merged, {}, options);
                }
            });
        });
    }

    function updateAssetPaths(config) {
        //Remove paths for duplicate local paths keeping only the first specified one
        if(config.assets && config.assets.paths){
            var mergedResult = [],
                seenKeys = {},
                index = 0,
                length = config.assets.paths.length;
            while(index < length) {
                var path = config.assets.paths[index++];
                if(!seenKeys[path.localPath]) {
                    mergedResult.push(path);
                    seenKeys[path.localPath] = path;
                }
            }
            config.assets.paths = mergedResult;
        }
        var paths = config.assets && config.assets.paths;
        if (paths) {
            document.cookie = "mk-app-host-asset-paths=" + JSON.stringify(paths);
        }
    }

    function merge(merged, configs) {
        each(configs, function(config) {
            each(config, function(val, key) {
                if (isArray(merged[key])) {
                    merged[key] = merged[key].concat(val);
                } else if (isObject(merged[key])) {
                    merged[key] = merge(merged[key], [val]);
                } else {
                    merged[key] = merged[key] != null ? merged[key] : val;
                }
            })
        });
        return merged;
    }

    function each(val, fn) {
        if (isArray(val)) {
            for (var i = 0; i < val.length; ++i) {
                fn(val[i], i);
            }
        } else {
            for (var key in val) {
                if (val.hasOwnProperty(key)) {
                    fn(val[key], key);
                }
            }
        }
    }

    function getJson(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open( 'GET', url );
        xhr.addEventListener('load', function() {
            if (xhr.readyState != 4)  return;
            callback(JSON.parse(xhr.responseText));
        });
        xhr.send(null);
    }

    function getUrlParams() {
        var urlParams = {},
            params = window.location.search.match(/[?&][^=&]+(=[^&]*)?/g);
        for (var i = 0; params && i < params.length; ++i) {
            var split = params[i].split('=');
            urlParams[split[0].substr(1)] = split[1] || true;
        }
        return urlParams;
    }

    function isArray(value) {
        return value && typeof value == 'object' && typeof value.length == 'number';
    }

    function isObject(value) {
        return value && typeof value == 'object';
    }
})(window);
