window.addEventListener("load", function () {
    enableGA();
    var instance = new window.cookieconsent.Popup({
        palette: {
            "popup": {
                "background": "#eaf7f7",
                "text": "#5c7291"
            },
            "button": {
                "background": "#56cbdb",
                "text": "#ffffff"
            }
        },
        type: "opt-out",
        revokable: true,
        preventOpen: false,
        content: {
            "allow": "Accept",
            "deny": "Decline",
            "href": "http://profitbrick.de/dataprivacy.html"
        },
        cookie: {
            "name": "profitbrickDeCookie",
            "path": "/",
            "domain": "profitbrick.com"
        },
        animateRevokable: false,
        onRevokeChoice: function () {
            instance.open();
        },
        onInitialise: function (status) {
            var type = this.options.type;
            var didConsent = this.hasConsented();
            if (didConsent) {
                enableGA()
            }
            if (type == 'opt-out' && !didConsent) {
                delete_cookie("_ga");
                delete_cookie("_gat");
                delete_cookie("_gid");
            }
        },
        onStatusChange: function (status, chosenBefore) {
            var type = this.options.type;
            var didConsent = this.hasConsented();
            if (didConsent) {
                enableGA()
            }
            if (type == 'opt-out' && !didConsent) {
                delete_cookie("_ga");
                delete_cookie("_gat");
                delete_cookie("_gid");
            }
        }
    });

    instance.toggleRevokeButton(true);
    if (!instance.hasAnswered()) {
        instance.open();
    } else if (instance.hasConsented() && instance.isOpen()) {
        instance.close();
    } else if (!instance.hasConsented() && !instance.isOpen()) {
        instance.open();
    }

    document.body.appendChild(instance.element);
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');



$(document).ready(function(){
    $(".test-image").fadeIn(4000);
});


var enableGA = function () {
    ga('create', 'UA-85057688-1', 'auto');
    ga('set', 'anonymizeIp', true);
    ga('send', 'pageview');
}

var delete_cookie = function (name) {
    var domain = domain || document.domain;
    var path = path || "/";
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=" + domain + "; path=" + path;
};

