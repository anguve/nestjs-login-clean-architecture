export const SECURITY_INJECTION_DETECTOR = {
  SQL_INJECTION_PATTERNS: [
    /(\b(outfile|group_concat|information_schema|schema|database|table|column|ascii|benchmark|sleep|into)\b)/i,
    /(\b(select|update|insert|delete|drop|create|alter|union|exec|execute|grant|revoke|truncate|load_file)\b)/i,
    /(\b(or|and)\b.*?(=|like|>|<|<=|>=|between|in|is|not))/i,
    /(\bwhere\b.*?\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/i,
    /(\b(and|or)\b.*?\d\s*=\s*\d)/i,
    /\b(select|insert|delete|update|drop|create|alter|union)\s+.*?\s+from\b/i,
    /\b(select|update|delete)\s+.*?\s+where\b/i,
    /\b(load_file|outfile|dumpfile|into)\b/i,
    /(\bexec\b.*?\bxp_cmdshell\b)/i,
    /\bselect\s+.*\s+from\s+mysql\.user\b/i,
    /\bunion\b\s*select\b/i,
    /(\bbenchmark\s*\(|\bsleep\s*\()/i,
    /(\binto\s+outfile\b)/i
  ],
  XSS_PATTERNS: [
    /<script.*?>.*?<\/script>/i,
    /<\/?[^>]+(>|$)/i,
    /<img[^>]+onerror\s*=\s*['"][^'"]*['"]/i,
    /<iframe[^>]+src\s*=\s*['"][^'"]*['"]/i,
    /<a[^>]+href\s*=\s*['"][^'"]*javascript:/i,
    /<a[^>]+href\s*=\s*['"][^'"]*data:/i,
    /<input[^>]+onmouseover\s*=\s*['"][^'"]*['"]/i,
    /<img[^>]+src\s*=\s*['"][^'"]*data:/i,
    /<.*?(javascript|vbscript|data|eval|on\w+)\s*:/i,
    /eval\((.*?)\)/i,
    /document\.cookie/i,
    /alert\(/i,
    /console\.log\(/i,
    /window\.location/i,
    /document\.write/i,
    /onerror\s*=\s*['"][^'"]*['"]/i,
    /<.*?javascript:/i,
    /<.*?data:/i,
    /<style.*?>.*?(expression|url|import).*?<\/style>/i
  ],
  XXE_PATTERNS: [
    /<!ENTITY\s+[\w-]+\s+SYSTEM\s+"file:\/\//i,
    /<!ENTITY\s+[\w-]+\s+SYSTEM\s+"http:\/\//i,
    /<!DOCTYPE\s+[A-Z0-9]+[\s\S]+<!ENTITY\s+/i,
    /<\?xml\s+version\s*=\s*['"][^'"]*['"]\s+encoding\s*=\s*['"][^'"]*['"]/i,
    /<\?xml\s+[^>]+<!DOCTYPE\s+/i,
    /<\?xml\s+[^>]+<!ENTITY\s+/i,
    /file:\/\/[A-Z0-9/\\]+/i,
    /\/etc\/passwd/i,
    /C:\\Windows\\System32\\drivers\\etc\\hosts/i,
    /<\?xml\s+[^>]+\/\//i,
    /<!DOCTYPE\s+[A-Z0-9]+[\s\S]*file:\/\/[A-Z0-9/\\]+/i,
    /SYSTEM\s+['"]file:\/\/[^'"]+['"]/i,
    /<!ENTITY\s+[\w-]+\s+PUBLIC\s+".*?".*?SYSTEM\s+['"]http:\/\//i
  ],
  LDAP_INJECTION_PATTERNS: [
    /\(\w+=\w*\)/i,
    /\(\w+\)\(\w+\)/i,
    /\(\w+=\*?\)/i,
    /\(\w+=\)"/i,
    /\*/i,
    /(\bpassword\b\s*=\s*['"].*?['"])/i,
    /(ldap:\/\/|ldaps:\/\/)/i
  ],
  BLACK_RUTES: [
    /\.\./,
    /\/etc\//,
    /C:\\Windows\\System32\\/,
    /file:\/\/\//i,
    /\/usr\/local\//,
    /\/bin\//,
    /\/var\/log\//,
    /\/root\//,
    /\/home\/\w+\//,
    /\/opt\//,
    /C:\\Users\\\w+\\/i,
    /\/mnt\//,
    /\/dev\//,
    /\/sys\//,
    /\/proc\//,
    /[a-zA-Z]:\\/
  ],
  DOS_PATTERNS: {
    MAX_REQUEST_SIZE: 1048576,
    MAX_REQUESTS_PER_MINUTE: 100,
    MAX_CONNECTION_TIME: 10000
  }
};
