
//========== Not Network ===========//
const envLog = process.env.log;
//==================================//

// const envLog = JSON.parse(process.env.log);
let conf = {};
conf.projectName = 'BC-Gateway';  //project name
 
// Enable appLog
conf.log = {}
conf.log.time = envLog.applog.rotation_time; // Minute
conf.log.path = envLog.applog.path; // path file
conf.log.level = envLog.applog.level ;// debug,info,warn,error
conf.log.console = envLog.applog.console;
conf.log.file = envLog.applog.file;
conf.log.format = envLog.applog.format;

// Enable summaryLog
//conf.summary = {}
//conf.summary.time = envLog.summary.rotation_time;
//conf.summary.path = envLog.summary.path;
//conf.summary.console = envLog.summary.console;
//conf.summary.file = envLog.summary.file;

// Enable detail
conf.detail = {}
conf.detail.time = envLog.detail.rotation_time;
conf.detail.path = envLog.detail.path;
conf.detail.console = envLog.detail.console;
conf.detail.file = envLog.detail.file;
conf.detail.format = envLog.detail.format;

// Enable stat
//conf.stat = {}
//conf.stat.time = envLog.stat.rotation_time;
//conf.stat.path = envLog.stat.path; // optional, folder path DB
//conf.stat.mode = envLog.stat.mode; // 0 == file, 1== :memory:
//conf.stat.pathDB = undefined; // optional, folder path DB
//conf.stat.statInterval = envLog.stat.statInterval;
//conf.stat.console = envLog.stat.console;
//conf.stat.file = envLog.stat.file;

// conf.stat.flush  = envLog.stat.flush;
// conf.stat.process = envLog.stat.process;


module.exports = conf
