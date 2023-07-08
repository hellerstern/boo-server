// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 443;

// ============================
//  Enviroment
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ============================
//  Authentication seed
// ============================
process.env.SEED = process.env.SEED || "dev-secret-seed";

// ============================
//  Data base
// ============================
process.env.DBHOST = process.env.DBHOST || "174.138.188.39";
process.env.DBUSER = process.env.DBUSER || "root";
process.env.DBPASSWORD = process.env.DBPASSWORD || "";
process.env.DBNAME = process.env.DBNAME || "image";