const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.utzzf0c.mongodb.net",
  (err, records) => {
    if (err) {
      console.error("DNS Error:", err);
      return;
    }

    console.log(records);
  }
);