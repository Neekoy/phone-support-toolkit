var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var MemcachedStore = require('connect-memcached')(session);
var uuid = require('node-uuid');
var Schema = mongoose.Schema;
var async = require("async");
var request = require("request");
var moment = require("moment");
var exec = require('child_process').exec;

// Initialise the database connection
mongoose.connect('mongodb://localhost/toolkit');
global.db = mongoose.connection;

// Initialise the app routes
var routes = require('./routes/index');
var users = require('./routes/users');

// Adds the KB article database schema
var articles = require('./models/kb.js');
articleModel = db.model("Articles");

// Init App
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io').listen(serv);

// Declare the Express session
var sessionMiddleware = session({
    secret: 'the most secretive secret possible',
    saveUninitialized: true,
    resave: true,
    store: new MemcachedStore({
        hosts: ['127.0.0.1:11211'],
    })
});

// Express session middleware for Socket.io
io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

// Initialise the Express Session
app.use(sessionMiddleware);

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  if (res.locals.user) {
    for (var i in res.locals.user) {
      if (i === 'username') {
        req.session.username = res.locals.user[i];
      }
    }
  }
  next();
});

app.use('/', routes);
app.use('/users', users);

// Set Port
app.set('port', (3013));

// Start the Server
serv.listen(app.get('port'), function(){
  console.log('Server started on port '+app.get('port'));
});

ACTIVE_USERS = {};

io.sockets.on('connection', function(socket) {

    username = socket.request.session.username;
    sessionid = socket.request.sessionID;
    
    socket.on('initialise', function(domain) {
      
      console.log(domain);
      // DNS upon initialisation
      var cmd = 'dig ANY ' + domain;
      exec(cmd, function (error, stdout, stderr) {
        
        // Look away if you value your sanity. The node DNS module doesn't have 
        // dig ANY functionality, so I have to subprocess the dig command
        // and parse the output with regex >.>
        formatter = /(?:.*QUESTION SECTION)(.*\n|\r)+(?:.*AUTHORITY SECTION)/;
        formatted = formatter.exec(stdout);
        stdout = formatted[0];
        
        var results = {};
        var find = "";
        regexp = /(?:\s)(?:NS|A|TXT)\s+(.*)/;
        regexpReplace = /(?:\s)(NS|A|TXT)\s+.*/;
        
        regexpSort = /\t/; 
        
        results['A'] = [];
        results['TXT'] = [];
        results['NS'] = [];
        
        while (find = regexp.exec(stdout)) {
          split = find[0].split(regexpSort);
          results[split[1]].push(split[2]);
          stdout = stdout.replace(regexpReplace, '');
        } 
        console.log(results);
        
        socket.emit("initResp", results);
        
      });
      
      // MX blacklists upon initialisation
    
    });
    
    // ADMIN AREA FUNCTIONALITY
    socket.on('saveArticle', function(data) {
      if ( data.id === "new" ) {
        data.id = uuid.v4();
        data.approved = false;
      }
      var articleToSave = new articleModel ({
        id: data.id,
        name: data.name,
        keywords: data.keywords,
        approved: data.approved,
        author: username,
        content: data.content
      });
      
      articleToSave.save(function (err) {
        if (err) throw err;
        console.log("Data has been saved");
      })
    });
    
    socket.on("getAllArticles", function() {
      articleModel.find({}, function(err, data) {
        if (err) throw err;
        socket.emit("pushAllArticles", data);
      })
    }); 
    
    socket.on('disconnect', function() {
    delete ACTIVE_USERS[socket.id];
    });

});

var blacklistServers = [
    'b.barracudacentral.org',
    'spam.rbl.msrbl.net',
    'zen.spamhaus.org',
    'bl.deadbeef.com',
    'bl.emailbasura.org',
    'bl.spamcannibal.org',
    'bl.spamcop.net',
    'blackholes.five-ten-sg.com',
    'blacklist.woody.ch',
    'bogons.cymru.com',
    'cbl.abuseat.org',
    'cdl.anti-spam.org.cn',
    'combined.abuse.ch',
    'combined.rbl.msrbl.net',
    'db.wpbl.info',
    'dnsbl-1.uceprotect.net',
    'dnsbl-2.uceprotect.net',
    'dnsbl-3.uceprotect.net',
    'dnsbl.ahbl.org',
    'dnsbl.cyberlogic.net',
    'dnsbl.inps.de',
    'dnsbl.njabl.org',
    'dnsbl.sorbs.net',
    'drone.abuse.ch',
    'drone.abuse.ch',
    'duinv.aupads.org',
    'dul.dnsbl.sorbs.net',
    'dul.ru',
    'dyna.spamrats.com',
    'dynip.rothen.com',
    'http.dnsbl.sorbs.net',
    'images.rbl.msrbl.net',
    'ips.backscatterer.org',
    'ix.dnsbl.manitu.net',
    'korea.services.net',
    'misc.dnsbl.sorbs.net',
    'noptr.spamrats.com',
    'ohps.dnsbl.net.au',
    'omrs.dnsbl.net.au',
    'orvedb.aupads.org',
    'osps.dnsbl.net.au',
    'osrs.dnsbl.net.au',
    'owfs.dnsbl.net.au',
    'owps.dnsbl.net.au',
    'pbl.spamhaus.org',
    'phishing.rbl.msrbl.net',
    'probes.dnsbl.net.au',
    'proxy.bl.gweep.ca',
    'proxy.block.transip.nl',
    'psbl.surriel.com',
    'rbl.interserver.net',
    'rdts.dnsbl.net.au',
    'relays.bl.gweep.ca',
    'relays.bl.kundenserver.de',
    'relays.nether.net',
    'residential.block.transip.nl',
    'ricn.dnsbl.net.au',
    'rmst.dnsbl.net.au',
    'sbl.spamhaus.org',
    'short.rbl.jp',
    'smtp.dnsbl.sorbs.net',
    'socks.dnsbl.sorbs.net',
    'spam.abuse.ch',
    'spam.dnsbl.sorbs.net',
    'spam.spamrats.com',
    'spamlist.or.kr',
    'spamrbl.imp.ch',
    't3direct.dnsbl.net.au',
    'tor.ahbl.org',
    'tor.dnsbl.sectoor.de',
    'torserver.tor.dnsbl.sectoor.de',
    'ubl.lashback.com',
    'ubl.unsubscore.com',
    'virbl.bit.nl',
    'virus.rbl.jp',
    'virus.rbl.msrbl.net',
    'web.dnsbl.sorbs.net',
    'wormrbl.imp.ch',
    'xbl.spamhaus.org',
    'zombie.dnsbl.sorbs.net'
];

var ip = "91.208.99.2";
var ipCut = ip.split(".");
var ipReversed = ipCut[3] + "." + ipCut[2] + "." + ipCut[1] + "." + ipCut[0]
var checkIp = ipReversed + "." + "zen.spamhaus.org";
var cmd = 'dig ' + checkIp + " +short";
exec(cmd, function (error, stdout, stderr) {
  console.log(stdout); 
});

for ( var i in blacklistServers ) {
}